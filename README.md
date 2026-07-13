# Matters 安全指南

Matters 的隱私、安全與抗審查公共指南。網站以情境導向的足跡導覽、個人行動清單與可追溯證據儀表板，說明使用平台時可採取的保護措施及其限制。

## 本機開發

```bash
npm install
npm run dev
```

## 品質檢查

```bash
npm run check
npm run test:coverage
npm run build
npm run test:e2e
```

## 設計系統來源

本 repo vendored 以下 `thematters/design-system` 產物，來源 commit 固定為 `21606749cbeb94bde83a873dd799e7fa8f95d950`。

- `tokens/dist/tokens.css`
- `components/buttons/normal/impl.css`

更新時必須同步更新 commit、重新執行視覺與無障礙檢查。

## 隱私

網站不使用應用層分析、不設 cookie，也不把互動狀態寫入瀏覽器儲存空間或後端。Cloudflare Pages／CDN 仍可能為傳輸、安全與防濫用處理一般請求中繼資料。

## 文件

- [產品規格](docs/spec.md)
- [設計交付](docs/design-handoff.md)
- [參考網站取捨](docs/reference-board.md)
- [措施證據矩陣](docs/evidence-matrix.md)
