# Quality and Performance Report

## Test environment

- Date: 2026-07-13
- Build: Astro 7.0.7 static output
- Browser automation: Playwright Chromium 149
- Lighthouse: 13.4.0 CLI，mobile preset
- Target: local production preview

Chrome DevTools MCP 未在目前工作環境設定，因此 `web-perf` skill 的 trace-based workflow 無法執行。改用 Lighthouse CLI、Playwright 與 build/network inspection，沒有把工具缺失解讀成通過證據。

## Lighthouse

| Category | Score |
| --- | ---: |
| Performance | 99 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

| Metric | Value | Rating |
| --- | ---: | --- |
| First Contentful Paint | 1.5 s | Good |
| Largest Contentful Paint | 1.5 s | Good |
| Speed Index | 2.3 s | Good |
| Total Blocking Time | 0 ms | Good |
| Cumulative Layout Shift | 0 | Good |

Lighthouse 指出單一同源 CSS 是 render-blocking request，估計 150 ms。實測 LCP 1.5 s、performance 99，依 `web-perf` 指引不把 0 或低影響項目升格成優化工作。CSS 保持單一壓縮檔可避免額外 request chain。

## Payload

| Asset | Raw | Gzip |
| --- | ---: | ---: |
| HTML | 36 KB | 9.4 KB |
| CSS | 32 KB | 6.7 KB |
| JavaScript including GSAP | 116 KB | 45.7 KB |

首頁沒有 hero 點陣圖片、遠端字型、第三方 script 或首次載入的跨站 request。

## Automated tests

- Astro type and content check: pass, 0 errors and 0 warnings
- Unit tests: 7 pass
- Core logic coverage: 100% statements, branches, functions and lines
- Playwright: 8 pass across desktop and mobile
- Reduced motion: pass, no pinned scroll wrapper
- Persistence: pass, localStorage 0, sessionStorage 0, cookies 0
- External opener protection: pass
- npm audit: 0 vulnerabilities

## Visual QA

- Desktop 1440 × 900: Hero、pinned trace、dashboard、footer inspected
- Mobile 390 × 844 and Pixel 7 preset: Hero、task planner、dashboard inspected
- Hero title size reduced on mobile to avoid the weakest four／three character wrap
- Dashboard contrast issue fixed by darkening small purple index labels
- Header accessible name adjusted to include visible label text

## Remaining production checks

1. Cloudflare Pages must serve `_headers` exactly as configured
2. Production canonical and sitemap should resolve on `safety.matters.town`
3. Pages deployment must be associated with the release commit
4. Remote CI and Codecov must be green

