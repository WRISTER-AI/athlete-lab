# The Athlete Lab maintenance

## Copy consistency cleanup ready for review (2026-10-05)

Preview only; these copy changes are not published to the public website. Preview deployment `dpl_FXkGgitVcqwox6cn5isxef6qUPgt` is READY at https://athlete-g3ab3roai-the-athlete-lab.vercel.app. The homepage and its metadata now show ages 3-18. Mini Soccer booking buttons no longer describe September start dates as upcoming; the full course date ranges remain in the schedules. Footer text uses the full Intro to Speed & Agility name and labels the Mini Soccer fall date range. The schedule metadata now includes both Monday and Wednesday Mini Soccer. Homepage metadata describes classes in Pembroke serving the South Shore rather than claiming a current Hanover class location.

Vercel's production-mode preview build, TypeScript, targeted ESLint, diff check, and all five existing tests passed. Desktop and 390px mobile previews were inspected; updated links retained their Wix destinations, all eight homepage images loaded, and homepage/schedule had no horizontal overflow. Local development remains blocked by the existing Windows SWC folder-access error. Screenshots are saved outside the repository in outputs/Website-Copy-Cleanup-Desktop-2026-10-05.png and outputs/Website-Copy-Cleanup-Mobile-2026-10-05.png.

Publish only when requested. Current live deployment and rollback details remain in the following section. GitHub synchronization is still unresolved; preserve local commits. Prices, program schedules, booking destinations, Wix records, and the temporary location notice were not changed.

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
