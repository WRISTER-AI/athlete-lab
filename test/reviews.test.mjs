import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
function load(path, overrides = {}) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const cjsModule = { exports: {} };
  new Function("exports", "module", "require", compiled)(cjsModule.exports, cjsModule, (id) => id in overrides ? overrides[id] : require(id));
  return cjsModule.exports;
}
const data = load("../app/lib/testimonials.ts");
const submission = { displayName: "Parent T.", program: "Mini Soccer", quote: "This is a clearly marked test review only.", permissionToPublish: true };

test("visitors cannot set approval or inject private fields", () => {
  assert.deepEqual(data.validateReview({ ...submission, approved: true, id: "forged", email: "private@example.invalid" }), submission);
  assert.equal(data.validateReview({ ...submission, permissionToPublish: false }), null);
  assert.equal(data.validateReview({ ...submission, program: "Invalid" }), null);
  assert.equal(data.validateReview({ ...submission, quote: "x".repeat(2001) }), null);
});

test("public feed excludes unapproved records and private metadata", () => {
  for (const approved of [false, undefined, "true", 1]) assert.equal(data.publicTestimonial({ id: "test", data: { ...submission, approved } }), null);
  assert.equal(data.publicTestimonial({ id: "test", data: { ...submission, approved: true, permissionToPublish: false } }), null);
  const result = data.publicTestimonial({ id: "test", data: { ...submission, approved: true, email: "private@example.invalid", notes: "Private notes" } });
  assert.deepEqual(Object.keys(result).sort(), ["id", "displayName", "quote", "program", "approvedForPublication"].sort());
});

test("signed form tokens reject tampering and expiry; storage forces pending", async () => {
  const oldKey = process.env.WIX_REVIEWS_API_KEY;
  const oldFetch = globalThis.fetch;
  process.env.WIX_REVIEWS_API_KEY = "test-only-not-a-credential";
  try {
    const store = load("../app/lib/review-store.ts", { "server-only": {}, "./testimonials": data });
    const timestamp = 1800000000000;
    const token = store.reviewToken(timestamp);
    assert.equal(store.validReviewToken(token, timestamp + 3000), true);
    assert.equal(store.validReviewToken(token, timestamp + 500), false);
    assert.equal(store.validReviewToken(token, timestamp + 86400001), false);
    assert.equal(store.validReviewToken(token.slice(0, -1) + (token.endsWith("0") ? "1" : "0"), timestamp + 3000), false);
    const writes = [];
    globalThis.fetch = async (url, init) => {
      const body = JSON.parse(init.body); writes.push(body);
      assert.equal(init.headers["wix-site-id"], "9cc93184-95fb-492d-9187-1d4ce30db037");
      return Response.json({ dataItem: { id: body.dataItem.id } });
    };
    await store.saveReview({ ...submission, approved: true }, "192.0.2.1");
    await store.saveReview(submission, "192.0.2.1");
    assert.equal(writes[0].dataItem.data.approved, false);
    assert.equal(writes[0].dataItem.id, writes[1].dataItem.id);
    assert.equal(JSON.stringify(writes).includes("192.0.2.1"), false);
  } finally {
    globalThis.fetch = oldFetch;
    if (oldKey === undefined) delete process.env.WIX_REVIEWS_API_KEY; else process.env.WIX_REVIEWS_API_KEY = oldKey;
  }
});

test("submission route refuses cross-site, oversized and forged requests without storing", async () => {
  let saves = 0;
  class StoreError extends Error {}
  const route = load("../app/api/reviews/route.ts", {
    "../../lib/testimonials": data,
    "../../lib/review-store": { reviewsConfigured: () => true, validReviewToken: () => false, saveReview: () => { saves++; }, ReviewStoreError: StoreError },
  });
  const request = (body, origin = "https://www.theathletelab.net") => new Request("https://www.theathletelab.net/api/reviews", { method: "POST", headers: { Origin: origin, "Content-Type": "application/json" }, body });
  assert.equal((await route.POST(request(JSON.stringify(submission), "https://other.invalid"))).status, 403);
  assert.equal((await route.POST(request("x".repeat(12001)))).status, 413);
  assert.equal((await route.POST(request(JSON.stringify({ ...submission, token: "forged" })))).status, 400);
  assert.equal(saves, 0);
});
