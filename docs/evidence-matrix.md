# Matters 措施證據矩陣

本表是公開儀表板的內容來源。任何「已驗證」項目都必須能由公開文件、repo、可重現網路檢查或負責團隊確認。未取得足夠證據時，寧可標成待補證據。

| 措施 | 狀態 | 目前證據 | 最後驗證 | 限制 | 負責方 |
| --- | --- | --- | --- | --- | --- |
| HTTPS 傳輸加密 | 已驗證 | 對正式 Pages 網址進行 TLS 連線與 redirect 檢查 | 2026-07-13 | 保護傳輸，不隱藏使用者與 CDN、網路服務商之間的連線中繼資料 | Matters infra |
| 網站無應用層分析追蹤 | 已驗證 | 本 repo source 與 build 產物 dependency／network audit | 2026-07-13 | Cloudflare 仍可能為傳輸、安全與防濫用處理一般請求中繼資料 | Guide maintainer |
| Cloudflare ECH 可用性 | 已驗證 | `matters-safety-guide.pages.dev` HTTPS/SVCB 記錄含 ECH 設定 | 2026-07-13 | 瀏覽器、DNS 與網路環境需支援，且不等同匿名 | Matters infra |
| IPFS 內容可攜性 | 待補證據 | Matters 公開說明提及 IPFS，仍需逐項確認目前發布流程與內容範圍 | 2026-07-13 | 去中心化保存也會提高撤除與遺忘的難度 | Matters product |
| 帳號安全控制 | 待補證據 | 需由 matters-web、matters-server 與產品設定頁建立逐項證據 | 2026-07-13 | 本指南不可代替產品內的安全設定 | Matters product |
| 化名與個資政策 | 政策處理中 | 現行服務條款與預計隨 NCC 批次調整的隱私方向 | 2026-07-13 | 化名不等於冒充，也不能消除付款與操作足跡 | Matters governance |

## 發布前補證流程

1. 為每項 repo 證據記錄 commit SHA 與檔案路徑
2. 為可重現檢查保存命令、日期與輸出摘要
3. 由對應負責方確認措辭未超出實際能力
4. 若證據過期或產品行為改變，立即降級狀態

