# Matters 措施證據矩陣

本表由 `src/data/evidence.json` 產生，是網站公開儀表板、維護文件與 `llms.txt` 的單一資料源。未取得足夠證據時，狀態必須維持待補證據或政策處理中。

- 最後整體檢視　2026-07-14
- 維護者　Matters
- 預定複查間隔　90 天
- 正式網址　https://matters-safety-guide.pages.dev/

| 措施 | 狀態 | 目前證據 | 最後驗證 | 證據到期 | 限制 | 負責方 |
| --- | --- | --- | --- | --- | --- | --- |
| HTTPS 傳輸加密 | 已驗證 | 正式 Pages 網址回應 HTTP 200，並提供 TLS 與 HSTS | 2026-07-14 | 2026-10-12 | 保護傳輸內容，不會隱藏所有連線中繼資料。 | Matters infra |
| 無應用層分析追蹤 | 已驗證 | 本 repo 原始碼、依賴與正式 build 產物未載入分析、廣告或追蹤服務 | 2026-07-14 | 2026-10-12 | Cloudflare 仍可能為傳輸、安全與防濫用處理一般請求中繼資料。 | Guide maintainer |
| Cloudflare ECH 可用性 | 已驗證 | Pages 網址的 HTTPS DNS 記錄含 ECH 設定 | 2026-07-14 | 2026-10-12 | 需要瀏覽器、DNS 與網路環境支援，且不等於匿名。 | Matters infra |
| 去中心化發布與保存範圍 | 待補證據 | 公開說明提及 IPFS，尚待產品團隊確認目前發布流程、內容範圍與撤除邊界 | 2026-07-14 | 2026-10-12 | 公開內容也可能被第三方截圖、轉貼或保存，去中心化保存會進一步提高撤除難度。 | Matters product |
| 帳號安全控制 | 待補證據 | 登入、重設密碼與安全 cookie 已取得 repo 證據；2FA、工作階段檢視與撤銷仍待補 | 2026-07-14 | 2026-10-12 | 密碼變更或重設是否撤銷既有工作階段尚未取得證據，本指南不能代替產品內的安全控制。 | Matters product |
| 化名與個資政策 | 政策處理中 | 已建立隱私優先的政策對齊草案，正式文字等待 NCC 批次更新 | 2026-07-14 | 2026-10-12 | 化名不等於冒充，也不能消除付款、裝置與操作足跡；草案尚未取代現行條款。 | Matters governance |

## 逐項查核紀錄

### HTTPS 傳輸加密

- command `curl -sSI https://matters-safety-guide.pages.dev/`　HTTP 200，Strict-Transport-Security 啟用

主要連結　https://developers.cloudflare.com/ssl/

### 無應用層分析追蹤

- repo `matters-safety-guide@fafbf74e2bcc465f5088570a15e60c06e8814ad8`　原始碼、dependency 與 dist network audit

主要連結　https://github.com/thematters/matters-safety-guide/tree/fafbf74e2bcc465f5088570a15e60c06e8814ad8

### Cloudflare ECH 可用性

- command `dig +short HTTPS matters-safety-guide.pages.dev`　HTTPS/SVCB 記錄含 ech 參數

主要連結　https://developers.cloudflare.com/ssl/edge-certificates/ech/

### 去中心化發布與保存範圍

- public-doc `https://matters.town/about`　僅能支持平台使用 IPFS 的公開描述，不能證明每一類內容的目前發布行為
- public-doc `https://matters.town/tos`　條款提醒特定公開內容可能無法完全刪除

主要連結　https://matters.town/about

### 帳號安全控制

- repo `matters-web@da0823029be55c891a933680144b0809c6d2b52a`　已核對密碼設定、email 驗證與替代登入介面
- repo `matters-server@95aef228bbc7313d130b0fd8fa414d7584b524b4`　已核對 email OTP、密碼重設、JWT 期限與 cookie 屬性

主要連結　https://matters.town/me/settings

### 化名與個資政策

- public-doc `https://matters.town/tos`　已核對帳號資訊、付款、第三方登入、跨境處理、冒充與保存限制
- repo-doc `docs/policy-alignment.md`　待 NCC 批次採納的隱私優先需求

主要連結　https://matters.town/tos

## 發布前補證流程

1. 為 repo 證據記錄 commit SHA 與檔案路徑
2. 為網路檢查保留命令、日期與輸出摘要
3. 由負責方確認措辭沒有超出實際能力
4. 證據過期、連結失效或產品行為改變時，立即更新或降級狀態
5. 執行 `npm run evidence:sync` 後再提交產生的文件
