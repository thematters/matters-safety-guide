# Release Evaluation

## Decision

- Evaluation date: 2026-07-13
- Risk tier: Full
- Candidate branch: `develop`
- Recommendation: Ready for production promotion
- Current lifecycle state: staging verified
- Production state: pending `develop` → `main` approval and deployment

## Scope evaluated

- Approved product SPEC and design handoff
- Research content and external source links
- Hero, ScrollTrigger trace story and dashboard animation
- Scenario-based non-persistent action plan
- Evidence dashboard and limitation language
- Security headers and privacy disclosure
- SEO, sitemap, security.txt and social metadata
- Build, unit coverage, e2e, dependency and deployed smoke checks

## Requirements traceability

| Requirement | Evidence | Result |
| --- | --- | --- |
| Design approved before code | `docs/spec.md`, `docs/design-handoff.md`, commit `1fe7fa7` precedes implementation commit | Pass |
| Avoid AI SaaS visual template | `docs/reference-board.md`, `docs/design-system-conformance.md`, desktop/mobile screenshots | Pass |
| GSAP Hero | one-time timeline, SVG route reveal, no loop | Pass |
| ScrollTrigger story | desktop pin and trace synchronization, mobile natural flow | Pass |
| Dashboard animation | real evidence counts only, one-time count and bar reveal | Pass |
| Reduced motion | no pin, scrub, count-up or stagger | Pass |
| No false safety score | action wording and Playwright assertion | Pass |
| No persistence or analytics | source inspection and browser storage/cookie assertions | Pass |
| Research links resolve | EFF, CPJ, Access Now, Amnesty, CISA and Matters links returned HTTP 200 | Pass |
| Security review | `docs/security-review.md` | Pass |
| Design-system conformance | `docs/design-system-conformance.md` | Pass with documented exceptions |
| Performance and accessibility | `docs/quality-report.md` | Pass |

## Test evidence

### Local production build

- `npm audit`: 0 vulnerabilities
- `npm run check`: 0 errors, 0 warnings
- `npm run test:coverage`: 7 pass, 100% core logic coverage
- `npm run build`: pass
- `npm run test:e2e`: 8 pass across desktop and mobile
- Lighthouse mobile: 99 Performance, 100 Accessibility, 100 Best Practices, 100 SEO
- LCP 1.5 s, TBT 0 ms, CLS 0

### Remote CI

- PR #1 feature → develop: CI pass, `codecov/project` pass
- PR #2 deploy config → develop: CI pass, `codecov/project` pass, `codecov/patch` pass

### Staging deployment

- Environment: Cloudflare Pages Preview
- Branch: `develop`
- Deployment ID: `d45e9711-5fd4-42ab-8b84-89278ccbbfc3`
- Immutable URL: <https://d45e9711.matters-safety-guide.pages.dev>
- Alias: <https://develop.matters-safety-guide.pages.dev>
- Deployed smoke tests: 8 pass across desktop and mobile
- Response: HTTP 200
- Preview indexing: `X-Robots-Tag: noindex`
- Verified headers: CSP, HSTS, Referrer-Policy, X-Content-Type-Options, X-Frame-Options, Permissions-Policy, COOP, CORP

## Claims and evidence review

三項目前標為已驗證的措施有可重現依據，包括 HTTPS、本站無應用層分析與 Pages 網址 ECH 設定。IPFS 與帳號控制沒有足夠逐項證據，因此維持待補證據。化名與個資政策維持政策處理中，等待 NCC 條款批次更新。

指南只說明化名可降低部分關聯風險，並明示化名不能用來冒充他人。服務條款連結已修正為目前可用的 `/tos`。

## Rollback plan

Cloudflare Pages 保留既有 production deployments。若 production smoke test 失敗，立即在 Pages 介面或 API rollback 至部署 `66f8697e-0448-442c-b4fc-c3981d72481a`，並停止 custom-domain promotion。Git 端保留 main merge commit，可由新的 revert PR 回復。

## Known follow-up

以下項目不阻擋本次指南上線，但必須維持公開狀態，不得改寫成已完成。

1. 由 product／infra 補上 IPFS 發布範圍與 commit 證據
2. 由 matters-web／matters-server 補上帳號安全控制矩陣
3. NCC 條款批次確認化名、個資、金流與保存語言
4. `safety.matters.town` 自訂網域尚未綁定，production deployment 後另行驗證 DNS 與憑證

## Promotion gate

本 release 可從 `develop` promotion 至 `main`。promotion PR 必須保持 CI 與 Codecov 綠燈。合併後以 main branch 執行 production deployment，再對 `matters-safety-guide.pages.dev` 與自訂網域執行 smoke、headers、canonical、sitemap 與 robots 驗證。

