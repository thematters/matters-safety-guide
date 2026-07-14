# Security Review Report

## Review metadata

- Project: Matters 安全指南
- Review date: 2026-07-14
- Reviewer: Codex under project owner authorization
- Risk tier: Full
- Scope: static Astro site, client-side interactions, Cloudflare Pages configuration, CI dependencies
- Decision: Pass for staging, production remains gated on remote CI, Codecov and live header verification

## System and data flow

本站是預先建置的靜態網站。瀏覽器只向同一來源取得 HTML、CSS、JavaScript、SVG、sitemap 與安全文件。使用者可在頁面內選擇情境與勾選任務，狀態只存在目前頁面的 JavaScript 記憶體，重新整理後清空。使用者可主動把清單複製到裝置剪貼簿或交由瀏覽器列印，網站不會接收結果。

網站程式沒有帳號、API、表單提交、資料庫、cookie、分析服務、遠端字型或第三方執行程式碼。使用者點擊外部研究來源時，瀏覽器才會離開本站前往對應網站。

Cloudflare Pages／CDN 仍可能為內容傳輸、可靠性、安全與防濫用處理請求中繼資料。2026-07-14 production audit 確認 `matters.town` 的 Bot Fight Mode 會對疑似機器流量注入同來源 challenge script，必要時顯示 challenge page 並設定安全 cookie。[Cloudflare Bot Fight Mode 文件](https://developers.cloudflare.com/bots/get-started/bot-fight-mode/)說明免費方案作用於整個 zone，無法以子網域 skip rule 排除，因此保留主站防護並在本站文案明確揭露限制。

## Threat review

| Threat | Exposure | Control | Residual risk |
| --- | --- | --- | --- |
| Cross-site scripting | 所有內容來自版本控制，無使用者輸入渲染 | 靜態輸出、無 `set:html`、CSP `script-src 'self'` | 供應鏈或 repo 權限遭入侵仍可能注入內容 |
| Clickjacking | 公開資訊頁可被第三方 iframe | CSP `frame-ancestors 'none'` 與 `X-Frame-Options: DENY` | 舊客戶端可能只支援其中一種標頭，已雙重設定 |
| Referrer leakage | 外部研究連結可能收到來源資訊 | `strict-origin-when-cross-origin`，新分頁連結含 `noopener noreferrer` | 使用者主動前往外部網站後受該站政策約束 |
| Browser capability abuse | 靜態頁無需相機、麥克風、位置或付款 | Permissions-Policy 全部停用 | 瀏覽器或平台層漏洞不在本站控制範圍 |
| Data persistence | 清單可能洩露使用者風險情境 | 網站程式不使用 localStorage、sessionStorage、cookie、IndexedDB 或後端 | Cloudflare 安全挑戰可能設定必要 cookie；頁面、剪貼簿、列印結果與裝置畫面仍可能被旁觀者看見 |
| Third-party tracking | 外部 SDK、字型或分析可建立跨站足跡 | build 不含第三方分析、字型或 SDK，正常頁面只允許 same-origin | Cloudflare 可對疑似機器流量提供 challenge script；使用者主動前往外部連結後受該站政策約束 |
| Supply-chain compromise | Astro、GSAP、Playwright、Vitest 等 npm dependency | lockfile、Dependabot-ready、`npm audit`、CI 重建 | lockfile 仍需定期更新與審查 |
| Misleading safety claims | 安全內容可能造成錯誤安心 | 移除分數、狀態分級、公開限制與 evidence matrix | 內容會隨產品與威脅改變，需要維護者定期複核 |

## Authentication and authorization

不適用。本站沒有登入、角色、後端管理介面或受限資料。GitHub 與 Cloudflare 權限由既有組織治理，本 repo 不保存部署憑證。

## Privacy review

- 收集個資：否
- 儲存使用者輸入：否
- Cookie：網站程式不主動設定；Cloudflare 安全挑戰可能設定必要 cookie
- 應用層分析與廣告：否
- 跨站請求：正常首頁載入時否；Cloudflare challenge page 可能連線至 `challenges.cloudflare.com`
- 敏感互動：情境與清單勾選只存在頁面記憶體
- 第三方處理者：Cloudflare Pages／CDN 處理 HTTP 請求中繼資料與安全挑戰
- 資料刪除：重新整理或關閉頁面即清除互動狀態

## Security headers

`public/_headers` 定義以下控制，部署後需以正式網址再次驗證。

- Content-Security-Policy
- Strict-Transport-Security
- Referrer-Policy
- X-Content-Type-Options
- X-Frame-Options
- Permissions-Policy
- Cross-Origin-Opener-Policy
- Cross-Origin-Resource-Policy

## Dependency review

- 2026-07-14 執行 `npm audit`
- 結果：0 vulnerabilities
- Astro 升級至 7.0.7，避開舊版已公告的 XSS 與 SSRF 問題
- GSAP 3.15.0 只從 npm bundle 載入，不使用 CDN script
- build 產物未包含 source map 或 secrets

## Security contact

`/.well-known/security.txt` 指向 GitHub private vulnerability reporting。本站不把公開 issue 當成漏洞細節回報管道。

## Findings

### Resolved before release

1. 將原本缺少的 CSP 與瀏覽器安全標頭納入 Pages 設定
2. 移除任何安全分數與「完成即安全」暗示
3. 所有外部新分頁連結加入 opener protection
4. 修正現行服務條款網址為 `/tos`
5. 以 patched Astro 7 取代有已知高風險公告的 Astro 5

### Follow-up

1. IPFS 發布範圍仍需產品團隊提供 commit 與流程證據
2. 帳號登入、重設密碼與 cookie 已有 repo 證據，2FA、工作階段檢視、撤銷與密碼重設後失效仍待產品補齊
3. 化名與個資政策等待 NCC 條款批次更新
4. 正式網域上線後每季重新驗證 headers、ECH、連結與 dependency；證據到期與死鏈已由每週 workflow 自動檢查

## Gate decision

本地安全審查通過。只有在遠端 CI、Codecov 與正式部署 headers 全部通過後，release evaluation 才能標記 Done。
