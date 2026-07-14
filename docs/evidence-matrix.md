# Matters 措施證據矩陣

本表由 `src/data/evidence.json` 產生，是網站公開儀表板、維護文件與 `llms.txt` 的單一資料源。未取得足夠證據時，狀態必須維持待補證據或政策處理中。

- 最後整體檢視　2026-07-14
- 維護者　Matters
- 預定複查間隔　90 天
- 正式網址　https://safety.matters.town/

| 措施 | 狀態 | 目前證據 | 最後驗證 | 證據到期 | 限制 | 負責方 |
| --- | --- | --- | --- | --- | --- | --- |
| 網站使用 HTTPS 與 HSTS | 已驗證 | 正式網域回應 HTTP 200，連線使用 TLS，並送出 Strict-Transport-Security | 2026-07-14 | 2026-10-12 | HTTPS 會保護傳輸內容，IP、連線時間與部分服務資訊仍可能被網路上的不同角色看見。 | Matters infra |
| 這份指南沒有加入分析與廣告追蹤 | 已驗證 | 原始碼、相依套件與正式 build 未載入分析、廣告或追蹤服務，行動清單只留在目前頁面 | 2026-07-14 | 2026-10-12 | 這項檢查只涵蓋 safety.matters.town。Cloudflare 仍會為傳輸、安全與防濫用處理請求資料。 | Guide maintainer |
| 正式網域提供 ECH 設定 | 已驗證 | safety.matters.town 的 HTTPS DNS 記錄含 Encrypted Client Hello 參數 | 2026-07-14 | 2026-10-12 | 瀏覽器、DNS 與所在網路都要支援才會生效。ECH 也不會讓使用者自動成為匿名。 | Matters infra |
| 洋蔥小站提供匿名唯讀入口 | 已驗證 | 洋蔥小站 repo 已有唯讀服務、HTML 清理、站內圖片代理、嚴格 CSP 與不記錄閱讀歷史的規格和測試 | 2026-07-14 | 2026-10-12 | 目前不能登入、發稿、留言、付款或存取私人內容。AWS、Matters API、閘道遭入侵與 Tor 流量關聯仍在威脅模型之外。 | Matters onion gateway |
| 公開文章會觸發 IPFS 發布流程 | 已驗證 | matters-server 在非垃圾文章發布後送出 IPFS 任務，由 Pinata 上傳文章 bundle，並把 CID 寫回文章版本 | 2026-07-14 | 2026-10-12 | 被判定為垃圾內容的文章不會觸發這段流程；素材過多時可能只上傳文字 bundle，付費內容另有加密。能否長期取回仍受節點、pin 與閘道狀態影響。 | Matters product and infra |
| 記憶吐司可把公開文章備份到自己手上 | 已驗證 | lifeboat.matters.town 正常回應，提供免登入的公開文章下載、個人保存空間與自架部落格流程 | 2026-07-14 | 2026-10-12 | 工具處理的是公開文章備份，不能取代原稿、採訪資料與私密附件的加密備份，也不保證第三方保存空間永久在線。 | Matters lifeboat |
| 政府資料請求仍缺固定公開報告 | 待補證據 | 治理資料記有 2023 至 2025 年數次來函與處理結果，NCC 自評也指出仍缺年度繁中透明度報告與政府要求揭露 | 2026-07-14 | 2026-10-12 | 歷史案例是 Matters 的自述紀錄，不能推成目前保存週期、法律義務或未來每一案的固定處理方式。 | Matters legal and governance |
| 帳號安全控制仍有幾項查不到 | 待補證據 | 登入、重設密碼、email OTP 與安全 cookie 已有 repo 證據；2FA、工作階段檢視與撤銷仍待補 | 2026-07-14 | 2026-10-12 | 目前無法確認改密碼或重設後是否會撤銷所有既有工作階段，指南不能代替產品內的安全控制。 | Matters product |
| 隱私條款會跟 NCC 批次一起更新 | 政策處理中 | 已整理資料最小化、保存期間、政府請求與化名使用的更新需求，正式文字等待 NCC 批次處理 | 2026-07-14 | 2026-10-12 | 草案還沒有取代現行條款。化名也無法消除付款、裝置、互動與操作時間留下的紀錄。 | Matters governance |

## 逐項查核紀錄

### 網站使用 HTTPS 與 HSTS

- command `curl -sSI https://safety.matters.town/`　HTTP 200，Strict-Transport-Security 已啟用

主要連結　https://developers.cloudflare.com/ssl/

### 這份指南沒有加入分析與廣告追蹤

- repo `matters-safety-guide release candidate 2026-07-14`　原始碼、相依套件與 dist 的外部請求檢查

主要連結　https://github.com/thematters/matters-safety-guide

### 正式網域提供 ECH 設定

- command `curl -sS 'https://dns.google/resolve?name=safety.matters.town&type=HTTPS'`　HTTPS/SVCB 記錄含 ech 參數

主要連結　https://developers.cloudflare.com/ssl/edge-certificates/ech/

### 洋蔥小站提供匿名唯讀入口

- repo `matters-onion-gateway@9675240bbf8ffb318497f7acf2eb24a3a1afaae2`　README、security-and-privacy、sanitize 與測試套件

主要連結　https://github.com/thematters/matters-onion-gateway/tree/9675240bbf8ffb318497f7acf2eb24a3a1afaae2

### 公開文章會觸發 IPFS 發布流程

- repo `matters-server@95aef228bbc7313d130b0fd8fa414d7584b524b4`　publicationService、IPFSPublicationService、SQS handler 與 CID 寫回流程

主要連結　https://github.com/thematters/matters-server/blob/95aef228bbc7313d130b0fd8fa414d7584b524b4/src/connectors/article/ipfsPublicationService.ts

### 記憶吐司可把公開文章備份到自己手上

- live-site `https://lifeboat.matters.town/`　HTTP 200，公開頁面說明三種備份流程與瀏覽器端處理邊界

主要連結　https://lifeboat.matters.town/

### 政府資料請求仍缺固定公開報告

- public-doc `Matters governance site, Platform Meets Law`　具名案例表、資料最小化說明與 NCC 透明度缺口

主要連結　https://thematters.github.io/matters-governance-site/reading/platform-meets-law/

### 帳號安全控制仍有幾項查不到

- repo `matters-web@da0823029be55c891a933680144b0809c6d2b52a`　密碼設定、email 驗證與替代登入介面
- repo `matters-server@95aef228bbc7313d130b0fd8fa414d7584b524b4`　email OTP、密碼重設、JWT 期限與 cookie 屬性

主要連結　https://matters.town/me/settings

### 隱私條款會跟 NCC 批次一起更新

- public-doc `https://matters.town/tos`　現行帳號、付款、第三方登入、跨境處理與保存條款
- repo-doc `docs/policy-alignment.md`　等待 NCC 批次採納的隱私優先需求

主要連結　https://matters.town/tos

## 發布前補證流程

1. 為 repo 證據記錄 commit SHA 與檔案路徑
2. 為網路檢查保留命令、日期與輸出摘要
3. 由負責方確認措辭沒有超出實際能力
4. 證據過期、連結失效或產品行為改變時，立即更新或降級狀態
5. 執行 `npm run evidence:sync` 後再提交產生的文件
