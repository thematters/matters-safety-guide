# 設計交付規格

## 核准方向

「獨立記者工作路線＋可驗證的平台說明」是 2026-07-14 第二輪改版方向。設計要讓讀者像在翻一份有證據、能採取行動的公共安全出版品，同時延續《看不見的平台清道夫》的分層世界觀。

## 設計關鍵字

- 編輯式
- 克制
- 有摩擦感
- 證據可追溯
- 公共利益
- 情境導向
- 紙張與訊號系統
- 記者工作流程
- 平台資料最小化
- 玻璃資料分層

## 明確排除

- AI SaaS landing page
- 紫藍霓虹漸層與外發光
- 全頁玻璃擬態與透明浮卡
- 漂浮聊天機器人
- 三欄功能卡搭配抽象 icon
- 沒有資料意義的 dashboard 圖表
- 無限呼吸、漂浮或背景粒子動畫
- 把每個區塊都做成大圓角 Bento 卡

## 版面概念

### Hero

左側是出版品式標題與核心說明，右側是玻璃分層的 Active Trace。四片資料層分別代表裝置、連線、平台與站外服務，內容會隨查資料、聯絡與互動、上稿、收款切換。

首屏不放照片或 3D 物件。背景以暖白紙色為主，搭配深墨色、Matters 紫與高可見度黃綠。玻璃只用來表示資料層，色彩負責區分狀態。

### 急迫事件列

緊接 Hero 的橫向黑色訊號列，提供三個直接入口。文案短、按鈕明確，不使用促銷式 CTA。

### 足跡敘事

桌面版採左右雙欄。左欄是四個工作章節，右欄固定 Active Trace。捲動時由單一 ScrollTrigger timeline 切換資料層與目前情境。手機版回到一般章節流，資料層放在章節前方，不固定。

### 平台來函流程

深色區塊用四個步驟說明政府或警察機關來函後，平台會確認法律與範圍、盤點既有資料、決定回覆與留下透明度紀錄。旁邊放《看不見的平台清道夫》的 NCC 插畫，案例連回同系列文章。玻璃卡在這裡代表請求、資料與回覆三個不同層次。

### 個人行動清單

像編輯部工作台。先用四個情境切換鈕選擇需求，再顯示三個行動層級。卡片不計分，完成後只改變任務狀態。上方用一句話提醒清單只存在目前頁面。

### 措施儀表板

採資料編輯台語彙。上方是三個真實統計量，只計算 evidence matrix 中已驗證、待補證據與政策處理中的項目。下方每項措施有狀態、最後驗證、證據與限制。微型圖只呈現狀態構成，不暗示即時流量或監控。

## 色彩語意

專案建立以下語意層，底層值引用 design-system tokens。

| 語意 token | 用途 |
| --- | --- |
| `--surface-page` | 全站紙色背景 |
| `--surface-strong` | 深色訊號區與 footer |
| `--surface-subtle` | 分區背景 |
| `--text-primary` | 主要文字 |
| `--text-on-strong` | 深色底文字 |
| `--text-secondary` | 次要文字，須通過 AA |
| `--signal-primary` | Matters 紫，表示目前選取與主要動作 |
| `--signal-attention` | 黃綠，表示需要注意或互動焦點 |
| `--status-verified` | 已驗證 |
| `--status-pending` | 待補證據 |
| `--status-policy` | 政策處理中 |
| `--border-primary` | 主要分隔線 |

元件 CSS 只能使用上述語意 token。design-system primitive 僅能出現在語意別名宣告處。

## 字體與排版

- 標題使用自架的 jf open 粉圓 2.1，授權為 SIL Open Font License 1.1
- UI 與正文使用 design-system system font stack
- 長文可使用 reading font stack，但不載入遠端字型
- Hero 標題以流體尺寸呈現，桌面約 68 至 104 px，手機約 48 至 64 px
- 多行 Hero 行高至少 1.02，一般 section heading 至少 1.08，手機再增加
- 內文主欄最大 68ch
- 資料標籤使用全大寫拉丁字或短中文字，避免模擬終端機介面
- 裝飾性編號採等寬數字

## 元件狀態

### 情境切換鈕

- Default：紙色底、深色框
- Hover：黃綠底
- Selected：深色底、白字、`aria-pressed=true`
- Focus：紫色 3 px 外框
- Disabled：不使用，所有情境都應可選

### 任務卡

- Default：白底、細框
- Completed：標題仍可讀，增加完成圖示與輕微背景，不把整張卡降到低對比
- Focus-within：紫色外框

### 證據狀態

- 狀態文字與形狀同時出現
- 已驗證使用實心圓
- 待補證據使用半圓
- 政策處理中使用空心圓

## 動畫規格

### Hero timeline

1. 標題隨首屏直接顯示，不設定初始 opacity 或位移
2. Eyebrow、核心警語與動作入口由下方 24 px 一次性進場
3. 四片資料層從後往前展開
4. 目前情境的訊號線與資料標籤一次性出現
5. 總長不超過 1.8 秒，不循環，動畫不能延後 LCP 標題

### ScrollTrigger

- 桌面斷點 960 px 以上才 pin 右欄
- 每個章節透過同一條 timeline 的標籤更新 active state
- 資料層使用 opacity、scale 與小幅 translate 呈現
- scrub 約 0.6 至 1，不與 toggleActions 混用
- 唯一的 top-level timeline 綁定 ScrollTrigger
- pin wrapper，動畫只作用於內部圖層
- 圖文內容在動畫失效時仍完整可見

### Dashboard

- 進入可視區時，三個統計數字一次性 count up
- 狀態構成條使用 scaleX，由左向右生長
- 證據卡以小幅 y 與 opacity stagger 進場
- 不使用循環、閃爍或假即時更新

### Reduced motion

- Hero 元素直接顯示
- 取消 pin、scrub、count up 與 stagger
- 保留選取狀態的即時切換，不做位移過場

## 響應式行為

- 360 至 767 px：單欄、自然捲動、情境按鈕可換行
- 768 至 959 px：雙欄資料卡，但足跡敘事不 pin
- 960 px 以上：啟用 pinned scrollytelling
- 1440 px 以上：內容寬度封頂，不讓行長持續增加
- 959 px 以下取消 backdrop-filter，避免手機捲動掉幀

## 無障礙註記

- Hero 圖是補充資訊，提供短 `aria-label`，核心內容仍在文字中
- 活躍章節透過可見標題與 `aria-current=step` 表達
- 動畫狀態不可成為唯一訊息
- 完成任務後以 polite live region 回報，不強迫焦點移動
- skip link、landmark 與 heading 層級必須完整

## Design-system conformance

- 採用 tokens 與 normal button CSS，README 固定來源 commit
- 足跡地圖、證據狀態、任務卡與 scrollytelling layout 為 standalone editorial product 的必要自製元件
- 自製元件仍只使用專案語意 token、design-system spacing 與 typography utilities
- 若 design-system 後續提供對應元件，應建立遷移 issue，而非永久分叉
