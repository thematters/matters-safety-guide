# Quality and Performance Report

## Test environment

- Date　2026-07-14
- Build　Astro 7.0.7 static output
- Browser automation　Playwright Chromium 149
- Performance inspection　Chrome DevTools trace
- Target　local production preview

## Lighthouse

手機與桌面 navigation audit 結果相同。

| Category | Mobile | Desktop |
| --- | ---: | ---: |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| Agentic Browsing | 100 | 100 |

`public/llms.txt` 提供 H1、可讀摘要、主要段落、隱私界線與 Markdown 連結。首頁的 landmark、heading、ARIA、文字對比與鍵盤操作未發現 Lighthouse 失敗項目。

## Core Web Vitals trace

| Environment | LCP | TTFB | CLS | Result |
| --- | ---: | ---: | ---: | --- |
| Desktop 1440 × 900，無節流 | 172 ms | 4 ms | 0 | Good |
| Mobile 390 × 844，Slow 4G，CPU 4× | 1,368 ms | 11 ms | 0 | Good |

手機 LCP 元素是 Hero H1。標題現在直接隨 HTML 與 CSS 顯示，不再等候 GSAP 進場。Slow 4G trace 中主要延遲是單一同源 CSS，估計可省 548 ms，但目前 LCP 仍明顯低於 2.5 秒，且拆分或內嵌會增加維護成本，因此本版維持單一壓縮 CSS。

GSAP 初始化在四倍 CPU 下產生 47 ms 的一次性 layout work，沒有可估算的 Core Web Vitals 節省。動畫只使用 transform、opacity 與 SVG stroke，手機不啟用 ScrollTrigger pin。

## Payload

| Asset | Raw | Gzip |
| --- | ---: | ---: |
| HTML | 40 KB | 10.0 KB |
| CSS | 36 KB | 7.0 KB |
| JavaScript including GSAP | 116 KB | 45.2 KB |

首頁沒有 Hero 點陣圖片、遠端字型、第三方 script 或首次載入的跨站 request。

## Automated tests

- Astro type and content check　pass，0 errors、0 warnings、0 hints
- Unit tests　9 pass
- Core logic coverage　100% statements、branches、functions、lines
- Playwright　17 pass，1 個 desktop 專案略過 mobile-only case
- JavaScript 關閉時，Dashboard 顯示 3、2、1 的真實數值
- Reduced motion　pass，沒有 pinned scroll wrapper
- Persistence　pass，localStorage 0、sessionStorage 0、cookies 0
- 清單複製與列印入口　pass
- 行動版目錄與急迫入口　pass
- `llms.txt` plain text　pass
- Internal targets　12 pass
- External links　20 pass
- npm audit　0 vulnerabilities

## Visual QA

- Desktop 1440 × 900　Hero、pinned trace、Dashboard、Footer inspected
- Mobile 390 × 844　Hero、目錄、行動清單、Dashboard inspected
- Hero H1 直接顯示，支援文案與足跡地圖保留一次性進場
- 行動版固定顯示急迫事件與目錄，不再讓導覽完全消失
- 行動版章節標題、情境控制與清單工具沒有水平溢出
- 證據數字保留動畫，但螢幕閱讀器與停用 JavaScript 都取得真實值

## Release checks

1. CI 與 Codecov 必須綠燈
2. Staging 與 production 必須對應 release commit
3. `_headers`、canonical、sitemap、robots、security.txt、llms.txt 必須在線上重驗
4. 定期重驗 `safety.matters.town` 的憑證、HTTPS DNS 記錄與 Cloudflare Pages domain 狀態
