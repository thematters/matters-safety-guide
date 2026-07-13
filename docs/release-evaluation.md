# Release Evaluation

## Decision

- Evaluation date　2026-07-14
- Risk tier　Full
- Candidate branch　`develop`
- Candidate commit　`8947b90b77f4ffc9de366e6de93205c1e033af02`
- Production merge　`d207d95494b7ed225513440b6963191b9338ec63`
- Recommendation　Released
- Current lifecycle state　production verified
- Production state　active on `matters-safety-guide.pages.dev`

## Scope evaluated

- Approved product SPEC、design handoff、reference board
- Four-stage finalization for accessibility、mobile UX、research evidence、policy alignment and maintenance automation
- Hero、ScrollTrigger trace story and Dashboard animation
- Scenario-based non-persistent action plan with copy and print
- Security headers、privacy disclosure、SEO、sitemap、security.txt、llms.txt
- Build、unit coverage、e2e、dependency、dead-link and deployed smoke checks

## Requirements traceability

| Requirement | Evidence | Result |
| --- | --- | --- |
| Design approved before code | `docs/spec.md`、`docs/design-handoff.md`、`docs/reference-board.md` | Pass |
| Avoid AI SaaS visual template | editorial guide、trace map and evidence desk visual QA | Pass |
| GSAP Hero | H1 immediately visible；supporting copy and SVG reveal once | Pass |
| ScrollTrigger story | desktop pin and trace synchronization；mobile natural flow | Pass |
| Dashboard animation | real evidence counts；screen reader and no-JS values remain truthful | Pass |
| Reduced motion | no pin、scrub、count-up or stagger | Pass |
| No false safety score | action wording and Playwright assertion | Pass |
| No persistence or analytics | source inspection and browser storage／cookie assertions | Pass |
| Research evidence | claim-level links、20 external link checks、account controls matrix | Pass |
| Evidence maintenance | single JSON source、90-day expiry、weekly dead-link workflow | Pass |
| Security review | `docs/security-review.md` | Pass |
| Performance and accessibility | `docs/quality-report.md` | Pass |

## Test evidence

### Local production build

- `npm audit`　0 vulnerabilities
- `npm run check`　0 errors、0 warnings、0 hints
- `npm run test:coverage`　9 pass、100% core logic coverage
- `npm run build`　pass
- `npm run links:check`　12 internal targets and 20 external links pass
- `npm run test:e2e`　17 pass、1 desktop skip for a mobile-only case
- Lighthouse mobile and desktop　Accessibility 100、Best Practices 100、SEO 100、Agentic Browsing 100
- Mobile Slow 4G plus 4x CPU　LCP 1.368 s、CLS 0
- Desktop unthrottled　LCP 172 ms、CLS 0

### Remote CI and Codecov

- PR #11 feature to develop　two CI runs pass
- Codecov upload for commit `2d286b2` completed successfully
- Core logic statements、branches、functions and lines　100%

### Staging deployment

- Environment　Cloudflare Pages Preview
- Branch　`develop`
- Source commit　`8947b90`
- Deployment ID　`0d830eae-83cd-46fb-bc27-97a5cbcf071c`
- Immutable URL　<https://0d830eae.matters-safety-guide.pages.dev>
- Alias　<https://develop.matters-safety-guide.pages.dev>
- Deployed smoke tests　17 pass across desktop and mobile
- Response　HTTP 200
- Preview indexing　`X-Robots-Tag: noindex`
- Verified headers　CSP、HSTS、Referrer-Policy、X-Content-Type-Options、X-Frame-Options、Permissions-Policy、COOP、CORP
- `llms.txt`　HTTP 200 and plain text

### Production deployment

- Environment　Cloudflare Pages Production
- Branch　`main`
- Source commit　`d207d95`
- Deployment ID　`6464d107-9585-498b-a1d3-5ebaa5224e33`
- Immutable URL　<https://6464d107.matters-safety-guide.pages.dev>
- Production URL　<https://matters-safety-guide.pages.dev>
- Immutable URL smoke tests　17 pass across desktop and mobile
- Production URL smoke tests　17 pass across desktop and mobile
- Response　HTTP 200，沒有 preview `X-Robots-Tag`
- Canonical and Open Graph URL　`https://matters-safety-guide.pages.dev/`
- Verified discovery files　sitemap、robots.txt、security.txt、llms.txt
- Verified headers　CSP、HSTS、Referrer-Policy、X-Content-Type-Options、X-Frame-Options、Permissions-Policy、COOP、CORP

## Claims and evidence review

三項已驗證措施都有可重現依據，包括 HTTPS、本站無應用層分析與 Pages 網址 ECH 設定。去中心化發布範圍維持待補證據，沒有把公開 IPFS 說明推論成每一類內容的目前行為。

帳號登入、email OTP、密碼重設與安全 cookie 已取得 `matters-web`、`matters-server` commit 證據。2FA、工作階段檢視與撤銷、密碼重設後撤銷既有工作階段仍沒有足夠證據，因此整項維持待補證據。

化名與個資政策維持政策處理中。`docs/policy-alignment.md` 是預備納入 NCC 條款批次的隱私優先需求，不取代現行條款。

## Rollback plan

Cloudflare Pages 保留既有 production deployments。若 production smoke test 失敗，回復到部署 `1e1348de-cf9e-4e64-9784-a28625c182be`，並停止 custom-domain promotion。Git 端由新的 revert PR 回復 main merge commit。

## Known follow-up

以下項目維持公開待辦，不能改寫成已完成。

1. 由 product 確認目前去中心化發布、保存與撤除範圍
2. 補上 2FA、工作階段檢視與撤銷、密碼重設後撤銷既有工作階段
3. NCC 條款批次確認化名、個資、金流、跨境與保存語言
4. `safety.matters.town` 已加到 Pages 專案，但 verification 顯示 `CNAME record not set`；需完成 DNS 與憑證後再切換 canonical

## Release result

本 release 已由 PR #13 從 `develop` promotion 至 `main`。promotion PR 的 CI、`codecov/project` 與 `codecov/patch` 全部通過。正式部署、smoke、headers、canonical、sitemap、robots、security.txt 與 llms.txt 驗證完成。

`safety.matters.town` 不列入本次正式網址，因 Pages domain association 仍回報 `CNAME record not set`。在取得 DNS edit 權限、建立 CNAME 並完成憑證前，canonical 保持可解析的 Pages 網址。
