# The Athlete Lab maintenance

## Coach class photographs (published, 2026-10-09)

Replaced the cliff portrait and two old soccer photographs in the coach section with three existing class photos from this site's Wix media library. Original files are copied into `public/coach/`: `francis-class-instruction.png` (Wix `speed 2.png`, media ID `5abe16_d680d666893c4c699744163186e23a4c~mv2.png`), `francis-class-speed-drills.jpg` (`speed pic_edited_edited.jpg`, `22615e_ad24193aa85d4bce94259a20b812361a~mv2.jpg`), and `francis-class-strength.png` (`speed 5.png`, `5abe16_b6d1667bde504514986119da84b5e9b0~mv2.png`). No generated imagery or edits to the originals. The source Wix library and older local photos are retained.

`app/lib/data.ts` selects the images and descriptive alt text. `Coaches` in `app/components/AthleteLab.tsx` uses a wide main photo with two supporting photos, stacked on phones. Fixed aspect ratios preserve layout while native lazy loading defers downloads. The existing direct-image rendering pattern is retained; the preview browser blocked the optional Next.js image-optimization endpoint. Coach biography, programs, schedules, prices, bookings and reviews are unchanged.

TypeScript, targeted ESLint, all nine existing tests and the Vercel production-mode build passed. All three photographs loaded on the desktop and 390px phone preview without horizontal overflow. READY preview: https://athlete-ev5cbooi5-the-athlete-lab.vercel.app/#coaches (`dpl_HMrQ9Per4HBRKwtWu7cQXMhwwUsL`). Desktop and phone screenshots are saved outside Git in `../outputs/Coach-Class-Photos-Desktop-2026-10-09.png` and `Coach-Class-Photos-Mobile-2026-10-09.png`.

The owner approved publishing. Source commit `4ac4788` was saved and verified on GitHub master. Promotion built READY production deployment `dpl_12icBTaBH2Ave5MGZWEY6FzDRu8a`, https://athlete-2tuljamqi-the-athlete-lab.vercel.app, assigned to both existing public domains. The live coach section displays all three new images, and the cliff portrait is absent. All homepage images loaded; homepage, apex domain, schedule, review form and bookings homepage returned HTTP 200. Live screenshot: `../outputs/Coach-Class-Photos-Live-2026-10-09.png`. Rollback target: `dpl_3WJEZrNh8G6fQnTwnYSZwdNg4XFG`, https://athlete-ldy90puuh-the-athlete-lab.vercel.app. No Wix, domain or booking settings were changed.

## New-review notifications in Wix (2026-10-09)

Wix automation **Website reviews — notify Francis** (`a1e69c8d-87fa-4c14-81c1-4f3a4fab6102`) is ACTIVE. Its Wix CMS **Item added** trigger is limited to **Website Reviews — approval inbox** (`WebsiteReviews`). It sends a **Custom notification** push to the **Owner** collaborator role only, using Wix mobile apps and the dashboard site feed. It does not notify customers or other collaborator roles, and does not approve or publish reviews.

Alert title: **New website review**. Message: "A new review is waiting. Open Wix CMS > Website Reviews — approval inbox to read it and choose whether to publish it." Phone delivery requires the owner's Wix app and device notification permissions to allow notifications; physical phone receipt has not been verified.

Verified with a submission through the live `/write-review` form. The form confirmed receipt, and Wix run `dee8bd1a-2566-44d7-a5d4-8870186ac5fa` ended successfully with both the item-added trigger and push-notification action checked. The new-review alert was also visibly received in the owner's Wix notification bell feed. A third private test entry, **SETUP TEST — notification**, remains unapproved; the public review feed remains empty. This Wix-only setup required no website source change or deployment. Manage or disable it through Wix Automations. Proof: `../outputs/Wix-Review-Notification-Run-2026-10-09.png`.

## Website review form and Wix approval inbox (2026-10-09)

This workflow supersedes the historical Yahoo/mailto review instructions below. Visitors use `/write-review`, linked from the homepage Testimonials section. They enter their own display name, program and review, and confirm publication permission. No email application or visitor account is required. Keep the public section minimal; do not add wording about vetting or the private approval process.

Francis manages submissions in [Wix CMS: Website Reviews — approval inbox](https://manage.wix.com/dashboard/9cc93184-95fb-492d-9187-1d4ce30db037/wix-cms/data/WebsiteReviews). Open an item, read the review and permission, check **Approved for website**, then **Save** to publish it. Uncheck that field and save to remove it. Changes appear on the next homepage load; no Git commit or deployment is needed. Leave unwanted reviews unchecked. Do not approve the clearly marked SETUP TEST entries. Do not invent reviews or approve real customer submissions on the owner's behalf.

The private collection ID is `WebsiteReviews` on the existing Wix site `9cc93184-95fb-492d-9187-1d4ce30db037`. Read, insert, update and remove permissions are ADMIN only. The website server inserts reviews with `approved: false` regardless of submitted fields. Its public endpoint returns only approved, consented reviews with an allowlist of public fields. Names, programs and quotes are validated; private records and credentials never go into Git or browser bundles.

The owner explicitly authorized a dedicated Wix key named **Athlete Lab website reviews**, scoped to this site and Wix Data (plus Wix's required basic site-list permission). It is stored as the secret `WIX_REVIEWS_API_KEY` in the existing Vercel project's Production and Preview environments. The temporary transfer file and clipboard contents were cleared. Never print the key or add it to a `NEXT_PUBLIC_` variable. The key has no bookings, payments or contacts permissions. Local previews without the key show a disabled form; use the protected Vercel preview for connected tests.

Relevant files: `app/write-review/page.tsx`, `ReviewForm.tsx`, `ReviewForm.module.css`; `app/api/reviews/route.ts`; `app/lib/review-store.ts` and `testimonials.ts`; `app/components/Testimonials.tsx`. The endpoint uses same-origin validation, bounded request bodies, a signed expiring form token, a honeypot and an atomic per-IP/per-hour insertion limit. Only a keyed hash is stored, not the raw IP. Rotating IPs can bypass a network limit; this is basic abuse protection, not a CAPTCHA. Static approved-testimonial fallback remains empty.

Verification: all nine tests, TypeScript, targeted ESLint and the production-mode Vercel preview build passed. Connected preview `dpl_2XqNQjz797dA3FZs5mB9kGM3KQRu` successfully saved a website submission. The pending sample was absent from the homepage, appeared after checking approval in Wix, and disappeared after unchecking approval. Two clearly marked setup entries remain private; neither is a customer review. Wix rejected a repeated insert ID with HTTP 409, confirming the atomic duplicate protection. Desktop and phone form layouts were inspected. The local Windows SWC build limitation recorded below remains; Vercel's production-mode build succeeded.

Source commit `ed95b9c` was pushed to GitHub master and the remote HEAD was verified. Vercel promotion created READY production deployment `dpl_3WJEZrNh8G6fQnTwnYSZwdNg4XFG`, https://athlete-ldy90puuh-the-athlete-lab.vercel.app, with both existing public domains attached. The live form and JSON review feed returned HTTP 200; the feed correctly returned no unapproved reviews. The live submission test reached Wix and correctly hit the hourly duplicate limit from the test network. New-item insertion, approval and removal were verified on the connected preview before promotion. Homepage, root domain, schedule and bookings returned 200; all eight homepage images loaded. Screenshots are in `../outputs/Review-Form-Live-Desktop-2026-10-09.png`, `Review-Form-Live-Mobile-2026-10-09.png`, and `Wix-Website-Reviews-Inbox-2026-10-09.png`.

Rollback target: `dpl_5di1aSdfr2Keh9jCDZ9BtC1PQG1S` (https://athlete-aoys2aknh-the-athlete-lab.vercel.app). Promote this existing deployment if a rollback is requested, wait for READY and verify the public domain. Preserve the CMS collection and submissions.

## Spaces by Wix updates (2026-10-09)

Published the owner's **Bring a friend to class for free** promotion for **October 12–18, 2026**, covering Mini Soccer, Intro to Speed & Agility and Youth Sports Performance, on the existing Spaces app Home screen. The banner opens Services. Publication was verified by reloading the app editor. A **Write a review** link to `https://www.theathletelab.net/write-review` was added directly below the promotion; Publish was clicked after the form became live. Final persistence verification for that link is pending because Wix's app editor is loading blank after refresh. Do not recreate or duplicate the link before inspecting the existing saved content. No push notification or email was sent. Unlike the website banner, the Spaces banner has no automatic expiry configured; remove it after October 18. The actual phone app has not been inspected in this workspace.

## Bring a friend promotion published (2026-10-09)

At the owner's request, the Riverside relocation banner was replaced on both the homepage and `/schedule` with "Bring a friend to class for free" for October 12-18, 2026. It applies to Mini Soccer, Intro to Speed & Agility, and Youth Sports Performance. `app/components/LocationNotice.tsx` remains the shared banner component; the existing filename is retained. It hides after midnight starting October 19 in America/New_York using the existing client-clock/one-minute refresh behavior.

Source commit `54136f5` was saved to GitHub master and verified. Preview `dpl_CG4KMeotAnFKTkVvoiV8ueTVKo23` passed a Vercel build, TypeScript, targeted ESLint, diff check, and all five existing tests. Desktop and phone previews were inspected on both pages. Promotion created READY production deployment `dpl_5di1aSdfr2Keh9jCDZ9BtC1PQG1S`, https://athlete-aoys2aknh-the-athlete-lab.vercel.app, serving the existing public domains. Previous production for rollback is `dpl_GNK1JhK1RZseTocFfKPwh4u3zxxS`, https://athlete-nk1a1mtsd-the-athlete-lab.vercel.app.

The live homepage and schedule show the new offer and no longer show the temporary relocation notice. The footer's normal Riverside location reference is intentionally retained. This change advertises the offer; no Wix coupon, booking configuration, pricing, schedule, DNS, or billing settings were changed. Verification records and screenshots are saved outside Git in outputs/Bring-Friend-Live-Verification-2026-10-09.json, outputs/Bring-Friend-Live-Desktop-2026-10-09.png, and outputs/Bring-Friend-Live-Mobile-2026-10-09.png.

## GitHub connection and future sync (2026-10-09)

The owner authorized the official GitHub CLI connection as `theathletelab`. GitHub's authenticated repository API confirms that this account has **push** access to https://github.com/WRISTER-AI/athlete-lab, whose default branch is `master`. It does not have repository admin access. The URL https://github.com/theathletelab/athlete-lab returns 404 for this signed-in account. Keep the verified existing remote; do not infer a completed GitHub ownership transfer or change the remote to an unverified address. The Vercel project remains athlete-lab in the-athlete-lab.

The workspace has GitHub CLI 2.102.0 under `../work/github-cli/2.102.0/bin/gh.exe`, downloaded from the official GitHub CLI release and checked against its SHA-256 digest. Authentication uses `GH_CONFIG_DIR` pointing to `../work/github-auth`, outside this repository. Windows Credential Manager remains inaccessible here, so GitHub CLI used its file-storage fallback. Never print, commit, upload, or copy that authentication directory into deployment artifacts.

For future approved website changes: edit the existing project files, run relevant checks, preview visual changes, and commit the intended files. Then run `./scripts/Sync-GitHub.ps1` from PowerShell. Use `-DryRun` to test access without updating GitHub. The script verifies the remote and write permission, refuses uncommitted or diverging work, never force-pushes, and confirms that remote `master` equals local HEAD. It reads authentication through GitHub CLI and supplies it only in the process environment; it does not embed credentials in the script, Git remote, or command arguments. Custom `-GitHubCli` and `-AuthDirectory` paths support another workspace.

Sync is a deliberate maintenance step, not a background watcher. Continue to publish through the existing Vercel project when the owner asks, then verify the public website. This setup does not create a replacement repository or Vercel project, change deployment settings, or authorize outgoing messages. Keep private customer records and email exports in the workspace outputs folder, outside this public repository.

An additional offline code/history backup was verified at `../outputs/Athlete-Lab-Source-2026-10-09.bundle`. It is a Git bundle rather than a replacement website source file. Historical entries below that describe GitHub as disconnected record the earlier state.

Sync verified: the initial successful push saved all eight previously unpushed website/documentation commits plus sync tooling as `015588b`; the next successful push saved the banner replacement as `54136f5`. The documented command was tested with both `-DryRun` and a real push, and GitHub master matched local HEAD after each real push. No website rebuild is needed for documentation-only commits.

## Reviews and testimonials published (2026-10-09)

Published after the owner's explicit "yes publish it" approval. Vercel promoted the approved preview `dpl_JCc7NpqWbxEvCyQLjKpcn7ky7zMJ` by creating production deployment `dpl_GNK1JhK1RZseTocFfKPwh4u3zxxS`, now READY at https://athlete-nk1a1mtsd-the-athlete-lab.vercel.app and serving https://www.theathletelab.net/#reviews. Both theathletelab.net and www.theathletelab.net are confirmed aliases on the existing athlete-lab project. The approved version includes the copy cleanup described below. Source is saved in local commit `43f0cb1`.

Rollback: previous production is `dpl_WvyADXWYa2dz6zpkQV5MfKi3fPXt`, https://athlete-9222p29z9-the-athlete-lab.vercel.app. Promote that deployment through the existing project if rollback is requested. Vercel may create a new production deployment when promoting; wait for READY and verify the public domain.

Public verification: homepage, root-domain redirect, schedule, and bookings homepage returned HTTP 200; Reviews navigation and the Write a review mailto destination were verified on the live site. The section shows only its heading and link until genuine quotes are approved. All eight homepage images loaded. Live screenshots are in outputs/Website-Reviews-Live-Desktop-2026-10-09.png and outputs/Website-Reviews-Live-Mobile-2026-10-09.png. No email, booking, or payment was submitted.

GitHub sync was retried before publishing. Fetch succeeded and remote master is `dcb8d84`, an ancestor of local master. Push failed because Windows could not run Git Credential Manager (NtCreateDirectoryObject access denied); no force push was attempted. Production publishing succeeded independently through the existing Vercel CLI connection. Preserve local commits until GitHub authentication is repaired.

The homepage now has a Reviews navigation link and a reviews section after the coach section. `app/components/Testimonials.tsx` and `Testimonials.module.css` provide the layout. `app/lib/testimonials.ts` contains the review email draft and the public approved-testimonial list, which is intentionally empty until genuine reviews are approved.

The owner requested a minimal public section: a Testimonials heading, approved quotes when available, and a Write a review link. Do not restore the invitation panel, explanatory paragraphs, or wording about vetting/approval. The link opens the visitor's email app with a draft addressed to theathletelab@yahoo.com, subject "The Athlete Lab — review". The visitor must send it; the website does not automatically submit or store reviews. The draft asks for publication permission without describing moderation. Delivery has not been tested by sending a message. The Yahoo approval workflow remains in place privately.

Approval process:
1. Francis reads submissions in Yahoo and checks the author's permission to publish.
2. Francis tells the assistant which exact quote, display name (prefer first name and last initial), and program to post. Confirm permission when missing; do not invent or silently rewrite reviews.
3. Add only those public fields, a stable ID, and `approvedForPublication: true` to `approvedTestimonials`. Pending submissions, email addresses, and approval records stay out of the repository because its code is public.
4. Show a preview and publish only when requested. Removing an approved entry and redeploying removes it from the website. No incoming email publishes automatically.

TypeScript, targeted ESLint, diff check, all five existing tests, and Vercel's production-mode preview build passed. Desktop (1440px), tablet (820px), and phone (390px) layouts were inspected. The mobile Reviews navigation and encoded email draft were verified; all eight homepage images loaded and booking links retained their existing Wix destinations. Local build remains blocked by the existing Windows SWC folder-access error. Screenshots are saved outside the repository in outputs/Website-Reviews-Desktop-2026-10-09.png, outputs/Website-Reviews-Mobile-2026-10-09.png, and outputs/Website-Reviews-Mobile-Email-2026-10-09.png.

No messages were sent and no Wix, pricing, schedule, booking, DNS, or billing settings changed. GitHub synchronization remains unresolved as documented below; preserve local commits.

The simplified revision passed TypeScript, targeted ESLint, diff check, and the Vercel preview build. Desktop and 390px phone layouts were checked again, including the email destination and removal of moderation wording. Updated screenshots: outputs/Website-Reviews-Simple-Desktop-2026-10-09.png and outputs/Website-Reviews-Simple-Mobile-2026-10-09.png. The preceding screenshot names document the original design, now superseded.

## Copy consistency cleanup (prepared 2026-10-05, published 2026-10-09)

These copy changes are now live as part of the approved October 9 release above. Original preview deployment `dpl_FXkGgitVcqwox6cn5isxef6qUPgt` remains at https://athlete-g3ab3roai-the-athlete-lab.vercel.app. The homepage and its metadata now show ages 3-18. Mini Soccer booking buttons no longer describe September start dates as upcoming; the full course date ranges remain in the schedules. Footer text uses the full Intro to Speed & Agility name and labels the Mini Soccer fall date range. The schedule metadata now includes both Monday and Wednesday Mini Soccer. Homepage metadata describes classes in Pembroke serving the South Shore rather than claiming a current Hanover class location.

Vercel's production-mode preview build, TypeScript, targeted ESLint, diff check, and all five existing tests passed. Desktop and 390px mobile previews were inspected; updated links retained their Wix destinations, all eight homepage images loaded, and homepage/schedule had no horizontal overflow. Local development remains blocked by the existing Windows SWC folder-access error. Screenshots are saved outside the repository in outputs/Website-Copy-Cleanup-Desktop-2026-10-05.png and outputs/Website-Copy-Cleanup-Mobile-2026-10-05.png.

Current live deployment and rollback details are in the October 9 section above. GitHub synchronization is still unresolved; preserve local commits. Prices, program schedules, booking destinations, Wix records, and the temporary location notice were not changed.

## Booking and email fixes published (2026-10-05)

Source commit `2ffe3a6` adds temporary 307 redirects in `next.config.ts` for `/book-now`, `/booking-calendar/:path*`, `/service-page/:path*`, `/booking-form/:path*`, and `/pricing-plans/:path*` to the same paths on https://bookings.theathletelab.net. Query parameters are retained. This repairs Wix-generated links using the main website domain.

Production deployment `dpl_WvyADXWYa2dz6zpkQV5MfKi3fPXt` built successfully and was promoted to the existing public website after staging verification. Immutable URL: https://athlete-9222p29z9-the-athlete-lab.vercel.app. Previous production for rollback: `dpl_3A1cZshwavd3xhwFkkgDkmqytBA7`, https://athlete-5une6ysty-the-athlete-lab.vercel.app. Roll back through the existing Vercel project or promote that previous deployment using the existing CLI authentication.

All five program destinations, book-now, and pricing plans returned 200 after redirects; booking-calendar and booking-form query preservation passed. Homepage and schedule returned 200. The real Intro booking button reached its Wix calendar. No bookings or payments were submitted. TypeScript, ESLint, and five existing tests passed. The local production build was blocked by Windows SWC folder-access errors; the Vercel production build passed.

Separately, the existing Wix footer email link was corrected from theathletelab@yahoo.co to theathletelab@yahoo.com and published. The Website Inquiry subject was preserved and the public mailto destination was verified. No domain, DNS, billing, price, or booking-history changes were made.

GitHub push remains unresolved due to local credential-manager failure. The current verified remote and public repository API still identify WRISTER-AI/athlete-lab; do not replace this checkout with the older remote branch. The code is committed locally and live via the existing Vercel CLI connection. Verification records are saved outside the repository in outputs/Booking-Link-Verification-2026-10-05.json and outputs/Wix-Email-Link-Fixed-2026-10-05.png.

## Temporary location notice published (2026-10-03)

Owner-requested top-of-website notice is LIVE. Source commit `3a73b92` adds a shared `LocationNotice` to the homepage immediately below its navigation and to `/schedule` below its top bar. It announces that Mini Soccer and Intro to Speed & Agility move to Riverside Sports Complex, 38 Riverside Drive, Pembroke, for October 5–11, 2026, due to the City Arena consignment sale. Days and times stay the same, including drop-ins. All Youth Sports Performance classes remain at City Arena in the gym.

The component stops displaying after `2026-10-12T00:00:00-04:00` using the visitor's clock; open pages refresh visibility every minute. Statically generated HTML includes the notice, and React hides it after hydration when expired. No prices, standard schedule entries, or booking links changed.

Vercel deployment `dpl_3A1cZshwavd3xhwFkkgDkmqytBA7` returned READY and was aliased to https://www.theathletelab.net. Immutable deployment URL: https://athlete-5une6ysty-the-athlete-lab.vercel.app. Previous production for rollback: `dpl_GBFmqzu7tEKwt7e77yr5ruHCgQSt`. Public homepage and schedule notice were verified through the browser after deployment. Desktop and mobile previews showed readable text and no horizontal overflow. Production build, TypeScript, ESLint, diff check, and all five existing tests passed. Initial font fetch failed before network access was granted; rerun succeeded.

Publishing used the existing Vercel project and existing CLI authentication. No DNS, billing, or Wix site content changed. The public homepage is this Next.js/Vercel site; Wix is used for the bookings subdomain. Separate Wix booking changes were already made earlier in the owner's finance/business task for the five affected drop-in occurrences. GitHub source sync remains pending as previously documented; the source commit is preserved locally. Do not overwrite this checkout with the older GitHub branch.

## Latest section-order deployment (2026-09-11)

Owner-approved commit `3c6fc28` is LIVE: homepage order is Hero, Programs, How We Train, Coach, Schedule. Published to the existing Vercel project as `dpl_GBFmqzu7tEKwt7e77yr5ruHCgQSt`, https://athlete-9cn1jgbqd-the-athlete-lab.vercel.app, aliased to https://www.theathletelab.net. Local production build, TypeScript, targeted ESLint, and all five existing tests passed. Vercel returned READY. Direct public HTTP checks returned 200 for homepage and schedule and verified Programs before training benefits before Coach, with both fall Mini Soccer booking links retained. A fresh visual browser check remains unverified because the browser has been timing out.

GitHub push was attempted again and failed; source sync remains unresolved. Previous production deployment for rollback is `dpl_Fpm4ycxE3KddM1thxaG87NQ1qHeW`. No Wix, domain, or billing settings were changed for this deployment.

## Latest published update (2026-09-11)

Owner-approved Mini Soccer update is LIVE. Local commit `30517ec` adds Monday September 21–November 9 and Wednesday September 23–November 11, 2026, 10:30–11:15 AM at City Arena, Pembroke ($140 per eight-week course). Links use Wix `/service-page/mini-soccer-monday-ages-3-5` and `/service-page/mini-soccer-wednesday-ages-3-5`; courses use service pages rather than the drop-in calendar route. The existing drop-in link is preserved.

Vercel CLI authenticated as `mulkernf-5877`, verified the existing project/team, and successfully deployed production `dpl_Fpm4ycxE3KddM1thxaG87NQ1qHeW`: https://athlete-miqvkxcfi-the-athlete-lab.vercel.app, aliased to https://www.theathletelab.net. Public homepage and schedule show the new dates and correct Wix links; all eight homepage images loaded. Build, TypeScript, lint, and five tests passed. Wix services were read, not modified.

GitHub sync remains pending: the push did not complete and remote `master` still resolved to `d674493b4bd1620195be7f8275f81b3455a6a3e4` after publishing. Preserve the local commit and do not replace it with remote files. Vercel Git integration remains disconnected. CLI publishing works independently, but the source repository must be synced when GitHub authentication is resolved. The earlier setup notes below are historical where superseded by this section.

For this workspace the installed CLI is `node ..\work\deploy-tools\node_modules\vercel\dist\index.js`; append `--global-config ..\work\vercel-auth --scope the-athlete-lab`. Its authentication directory stays outside the repository; never copy it into Git or deployment uploads. The CLI's update-check worker can report a local cache permission error; the production command nevertheless returned READY and was verified publicly.

Prior known good production for rollback: `6fTAStBTZeAxaAD64h1XBqxAGAW9`.

## Existing website and accounts

- Repository confirmed by the owner: https://github.com/WRISTER-AI/athlete-lab (origin fetch/push: same URL with `.git`). Default checkout: `master`.
- Local checkout: `C:\Users\francis\Documents\Codex\2026-09-11\you-are-helping-me-maintain-the\athlete-lab`.
- Existing Vercel project: https://vercel.com/the-athlete-lab/athlete-lab
- Vercel project ID: `prj_ZcMFCmpNOW5ZShmXixnQLuJiuos8`; team ID: `team_Wnfukra5nz4jVP1A84SBNx0a` (the athlete lab).
- `.vercel/project.json` contains these verified IDs and is ignored by Git. This local association is not proof of CLI authentication or deployment success.
- Homepage: https://www.theathletelab.net; schedule: https://www.theathletelab.net/schedule.
- Bookings: https://bookings.theathletelab.net; Wix site ID: `9cc93184-95fb-492d-9187-1d4ce30db037`.

## Current verification (2026-09-11)

Cloned `master` at `d674493` with no uncommitted work. Dependencies installed from `package-lock.json`; Next.js 16.2.3, Node.js 24.19.0. Production build and TypeScript passed, ESLint passed, and all five existing schedule/coach tests passed. No application code, content, or lockfile changes were made during setup.

Local desktop homepage and mobile homepage/schedule inspected (390px mobile viewport); all eight homepage images loaded and no horizontal mobile overflow was observed. Public and local homepage/schedule returned HTTP 200 with matching headings and booking-link sets. All five booking URLs returned HTTP 200 with the intended service titles; no bookings or payments were made. A live browser navigation had a connection reset, so a complete side-by-side visual comparison and interactive Wix availability check remain unverified. Wix dashboard access to the specified site was verified earlier in setup. Its unrelated Google Search Console reconnection notice was left unchanged.

GitHub browser access is signed in as `theathletelab`. The repository is currently listed under `WRISTER-AI`; GitHub denies this account access to repository options, and lists no organization memberships. Repository ownership/admin access and authenticated command-line push access remain unresolved. Do not represent the transfer or publishing access as verified.

Vercel dashboard access is verified. Framework: Next.js; root directory empty (repository root); command/output overrides off; Node.js 24.x. No project production environment variables or marketplace integrations were listed. Application source has no `process.env` or backend fetch requirements; Wix supplies public assets and booking destinations separately. Do not copy Wix credentials into this app.

Vercel Git is disconnected and requests installation of its GitHub application. `master` is the intended production branch, but current production branch tracking cannot be verified until Git is connected. Both apex and www domains showed Valid Configuration; apex redirects to www with 307. The bookings subdomain is not listed on this Vercel project; preserve its separate Wix configuration.

Existing production deployment: `6fTAStBTZeAxaAD64h1XBqxAGAW9`, shown Ready, created via Vercel CLI. No deployment was performed during this setup.

## Files and editing rules

Read `AGENTS.md` and the relevant installed documentation in `node_modules/next/dist/docs/` before writing code. `CLAUDE.md` refers to the same rules.

- `app/lib/data.ts`: programs, prices, schedules, booking links, coaches, promotions.
- `app/components/AthleteLab.tsx`: homepage layout, navigation, coach section, footer.
- `app/schedule/FullSchedulePage.tsx`: schedule display.
- `app/schedule/page.tsx`: schedule metadata.
- `public/coach/`: coach photographs.
- `app/layout.tsx`, `app/globals.css`: fonts, global metadata/styles.
- `test/program-schedule.test.mjs`: existing content regression checks.

Preserve unrelated work. Before editing, inspect `git status --short` and the diff; never reset someone else's changes. Homepage edits do not update Wix services, availability, plans, or registration. Do not alter DNS, domains, billing, or Wix during routine frontend work. Deleting Wix services requires explicit exact targets and a preserved export and booking history.

## Local preview and checks

From the checkout, use Node.js 24 and the existing npm lockfile:

```sh
npm ci
npm run lint
node --test test/program-schedule.test.mjs
npm run build
npm run dev -- --hostname 127.0.0.1
```

Open http://127.0.0.1:3000 and `/schedule`. For a preview of the production build, use `npm run start -- --hostname 127.0.0.1` after building instead of the development server. Inspect desktop/mobile, program tabs, coach images, and booking destinations without booking or paying.

On this Codex workspace, npm is available locally through `node ..\work\package\bin\npm-cli.js` (for example, append `ci --cache ..\work\npm-cache --no-audit --no-fund`). This setup did not install npm globally. Equivalent direct commands are `node node_modules\next\dist\bin\next dev`, `build`, or `start`, and `node node_modules\eslint\bin\eslint.js`.

The bundled Git requires `GIT_EXEC_PATH` set to `C:\Users\francis\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\mingw64\bin` for HTTPS helpers. This environment's Windows TLS backend failed; `git -c http.sslBackend=openssl ...` worked with certificate verification enabled. No global Git configuration was changed.

## Publishing (only when the owner asks)

1. Resolve authenticated GitHub push access and Vercel CLI authentication. Connect the confirmed repository to this existing Vercel project, with the necessary GitHub application permission; verify production branch `master`. Do not create a replacement project. Avoid any connection action that triggers production until publishing is authorized.
2. Inspect the complete diff, run the checks above, and show visual changes. Verify the remote and the project/team IDs above before publishing.
3. Commit only intended changes and push to the confirmed repository. Once Git is connected, pushing/merging to the production branch can deploy automatically: do not push `master` during setup or review.
4. For an authorized CLI production deployment, authenticate normally and use the existing linked project (`vercel --prod --scope the-athlete-lab`). Do not deploy twice if the Git push already triggered the intended deployment.
5. Verify the resulting deployment is Ready and assigned to www, then inspect the public homepage, schedule, assets, and booking destinations. Report the commit and deployment URL, and distinguish build success from production verification.

Never put passwords, tokens, cookies, or environment secret values in Git or chat.

## Rollback

When authorized, open this project's Vercel Overview and use Instant Rollback to the recorded last known good production deployment. Verify the public domains and pages afterward. If the desired deployment is no longer retained, revert the specific unwanted Git commit with a new revert commit, run checks, then publish that revert. Do not force-push or reset shared history. A frontend rollback does not roll back Wix.

## Wix program contact groups (September 11, 2026)

Five Wix custom automations are ACTIVE. Each uses `Wix Bookings: Session booked`, matches one exact Service ID, and only adds the specified contact label. No email action or subscription-status change is included.

| Program | Service ID | Contact label | Automation ID |
| --- | --- | --- | --- |
| Monday Mini Soccer | 08362d2a-ef41-4e84-99b2-c622a93c7553 | Mini Soccer - Mondays (8 Weeks) | c96c1da3-56f0-42f7-b824-63833f2ee5a0 |
| Wednesday Mini Soccer | e3ecb40e-047b-46d1-af37-ba3c1e7c39ef | Mini Soccer - Wednesdays (8 Weeks) | 03d3bd02-ddaa-4e07-a4ca-d7e8156aab13 |
| Mini Soccer drop-in | 6f802ca3-f62a-4933-9765-c6a267875ca8 | Mini Soccer - Drop In | 88945346-9b99-4bd7-930c-e6b223c6709a |
| Intro to Speed & Agility | e5ad4019-9b43-45ed-bfb8-34de8e9e3c73 | Intro To Speed & Agility | d99e77a9-b3ac-488d-9497-5ad6afdfb321 |
| Sports Performance | c3e50817-42b2-4b1b-8b66-100890558451 | Sports Performance Training | 7fbee32f-13c3-4a1d-8963-b75d5e6d7da9 |

View the audiences in Wix: Customers & Leads > Contacts > Filter > Labels. All five labels were verified in this selector. Contacts can have multiple labels. These are booked-program groups, not a live attendance or paid-only roster; cancellation does not remove a label. Existing Monday label was reused; four labels were created.

Activation and saved configuration were verified. No real booking or email was submitted for testing, so a successful live automation run has not yet been verified. The rules cover future bookings. On September 11, 2026, historical bookings for these five services were backfilled using existing linked contacts and exact parent-email matches for retained registration forms. The review covered 19 course registrations and 277 class bookings (22 Mini Soccer drop-in, 87 Speed & Agility, 168 Sports Performance), including historical/cancelled records. Labels therefore indicate booking history, not current fall enrollment.

Final verification across all 171 Wix contacts showed: Monday Mini Soccer 11 contacts; Wednesday Mini Soccer 7; Mini Soccer drop-in 13; Speed & Agility 32; Sports Performance 42. These counts include any existing labels and consolidate repeat bookings under contacts; one contact can belong to multiple groups. All identified form-only exceptions were matched to existing contacts. No messages were sent, contacts merged, bookings changed, or subscription preferences changed. Retired summer/weekend/free-trial services were kept separate. Older services and newly created replacement service IDs need their own rules. Preserve email subscription preferences when selecting campaign recipients.

To disable this grouping, deactivate the relevant automation in Wix Automations. Existing bookings and labels remain intact. Website deployments do not modify these Wix rules.
