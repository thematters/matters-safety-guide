# Design-system Conformance Report

## Source

- Repository: `thematters/design-system`
- Commit: `21606749cbeb94bde83a873dd799e7fa8f95d950`
- Vendored tokens: `tokens/dist/tokens.css`
- Vendored component: `components/buttons/normal/impl.css`

## Result

Pass with documented standalone editorial exceptions.

## Conformance checks

- 應用程式 CSS 只使用專案語意 token，不直接引用 design-system primitive color token
- 語意 token 的底層值集中在 `:root` 對應 design-system tokens
- 主要 CTA 使用 design-system normal button 結構與尺寸 class
- focus ring、spacing 與 font family 來自 design-system 定義
- 所有一般文字通過 WCAG 2.2 AA，Lighthouse accessibility 100
- 沒有在元件內使用硬編碼色碼

## Standalone editorial exceptions

以下元件在 design-system 尚無對應，且是安全指南的核心資訊表達，因此保留本站實作。

1. 足跡地圖 SVG
2. ScrollTrigger 圖文敘事版面
3. 證據狀態形狀與構成條
4. 個人行動任務卡
5. 急迫事件訊號列

這些元件仍遵守語意 token、鍵盤操作、reduced motion 與文字可替代原則。design-system 日後若提供正式元件，維護者應建立遷移 issue 並重新執行視覺回歸。

## Visual language check

設計沒有採用霓虹漸層、玻璃擬態、漂浮聊天框、三欄 feature cards、Bento 卡片牆或裝飾性 3D 物件。大字排版、調查圖線條與紙張色塊用於建立公共安全出版品的辨識度，資料圖只呈現 evidence matrix 的實際狀態數量。

