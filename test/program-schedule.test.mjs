import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

function loadProgramData() {
  const source = readFileSync(new URL("../app/lib/data.ts", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;

  const cjsModule = { exports: {} };
  const run = new Function("exports", "module", compiled);
  run(cjsModule.exports, cjsModule);
  return cjsModule.exports;
}

const { coaches, promo, programs } = loadProgramData();

function programById(id) {
  const program = programs.find((item) => item.id === id);
  assert.ok(program, `Expected program ${id} to exist`);
  return program;
}

test("fall training schedule uses the current Monday-Thursday City Arena offer", () => {
  const miniSoccer = programById("mini-soccer");
  assert.deepEqual(miniSoccer.schedule, [
    {
      day: "Wednesday",
      time: "10:30-11:15 AM",
      location: "Riverside Sports Complex, Pembroke",
    },
  ]);

  const speedAgility = programById("speed-agility");
  assert.deepEqual(speedAgility.schedule, [
    {
      day: "Monday-Thursday",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      time: "4:00-5:00 PM",
      location: "City Arena Field 4, Pembroke",
    },
  ]);

  const performance = programById("performance");
  assert.equal(performance.name, "Youth Sports Performance");
  assert.equal(performance.color, "#f97316");
  assert.deepEqual(performance.schedule, [
    {
      day: "Monday-Thursday",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      time: "5:00-7:00 PM",
      location: "City Arena Field 4, Pembroke",
    },
  ]);
});

test("removed public schedule slots and programs are not exposed", () => {
  const allScheduleText = programs
    .flatMap((program) => program.schedule)
    .map((entry) => `${entry.day} ${entry.time} ${entry.location}`)
    .join("\n");
  const allProgramText = programs.map((program) => `${program.id} ${program.name}`).join("\n");

  assert.doesNotMatch(allScheduleText, /Friday|Saturday|Sunday|Starland|7:00-9:00|5:00-8:00|6:00-7:00 PM|7:00-8:00 PM/);
  assert.doesNotMatch(allProgramText, /High School|College/i);
});

test("expired summer promo is not active", () => {
  assert.equal(promo.active, false);
  assert.equal(promo.title, "Bring a friend free this week");
  assert.equal(promo.ctaLabel, "Book Summer Training");
  assert.equal(promo.ctaTarget, "programs");
  assert.equal(promo.endsAt, "2026-07-05T23:59:59-04:00");
});

test("public coach data only exposes Francis as the current coach contact", () => {
  assert.deepEqual(
    coaches.map((coach) => coach.name),
    ["Francis Mulkern"],
  );
  assert.equal(coaches[0].photo, "https://static.wixstatic.com/media/07f490_16536d81421644d68f2fe04e46891490~mv2.jpg");
  assert.deepEqual(
    coaches[0].photos.map((photo) => photo.src),
    [
      "https://static.wixstatic.com/media/07f490_16536d81421644d68f2fe04e46891490~mv2.jpg",
      "/coach/francis-team-impact.jpg",
      "/coach/francis-action-1.jpg",
    ],
  );
});

test("coach section copy is singular and current", () => {
  const componentSource = readFileSync(new URL("../app/components/AthleteLab.tsx", import.meta.url), "utf8");

  assert.match(componentSource, /<SectionLabel>The Coach<\/SectionLabel>/);
  assert.match(componentSource, /Led by Francis Mulkern/);
  assert.match(componentSource, /Former Merrimack player and Boston Bolts coach/);
  assert.doesNotMatch(componentSource, /Coached by someone who knows the game/);
  assert.doesNotMatch(componentSource, /<SectionLabel>Our Coaches<\/SectionLabel>/);
});
