import { expect, test } from '@playwright/test'

test('renders the complete guide and primary landmarks', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' })

  await expect(page).toHaveTitle(/Matters 安全指南/)
  const heading = page.getByRole('heading', { level: 1 })
  await expect(heading).toContainText('一篇稿子')
  await expect(heading).toHaveCSS('opacity', '1')
  await expect(heading).toHaveCSS('visibility', 'visible')
  await expect(page.locator('[data-site-header]')).toBeVisible()
  await expect(page.locator('[data-site-header]')).toHaveCSS('position', 'sticky')
  await expect(heading).toHaveCSS('font-family', /jf open 粉圓/i)
  await expect(page.locator('nav.site-nav')).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'Matters 目前做了哪些保護' })).toBeVisible()
  await expect(page.locator('main')).toContainText('化名能幫忙，別把它當隱身衣')
  await expect(page.locator('.site-footer')).toContainText('Cloudflare 仍會為傳輸、安全與防濫用處理請求資料')
})

test('filters tasks without assigning a safety score or persisting state', async ({ page }) => {
  await page.goto('/#plan')
  const publish = page.getByRole('button', { name: /上稿/ })

  await publish.click()
  await expect(publish).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('[data-plan-summary]')).toContainText('完成數不是安全分數')

  const firstVisibleTask = page.locator('[data-task-card]:visible').first()
  await firstVisibleTask.locator('label').click()
  await expect(page.locator('[data-plan-summary]')).toContainText('標記完成 1 項')

  expect(await page.evaluate(() => localStorage.length)).toBe(0)
  expect(await page.evaluate(() => sessionStorage.length)).toBe(0)
  expect(await page.context().cookies()).toEqual([])

  await page.reload()
  await expect(page.getByRole('button', { name: /上稿/ })).toHaveAttribute('aria-pressed', 'false')
})

test('dashboard counts remain truthful without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/')

  await expect(page.locator('[data-count]')).toHaveText(['6', '2', '1'])
  await expect(page.locator('.dashboard-summary')).toContainText('已驗證')

  await context.close()
})

test('mobile navigation keeps the urgent route and full menu reachable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile', 'mobile-only behavior')
  await page.goto('/')

  await expect(page.locator('.mobile-emergency-link')).toBeVisible()
  await expect(page.locator('nav.site-nav')).toBeHidden()
  await page.locator('.mobile-menu summary').click()
  await expect(page.locator('.mobile-menu nav')).toBeVisible()
  await page.locator('.mobile-menu nav a[href="#evidence"]').click()
  await expect(page.locator('.mobile-menu')).not.toHaveAttribute('open', '')
})

test('copies a local checklist with sources outside the task toggle', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          ;(window as typeof window & { copiedPlan?: string }).copiedPlan = text
        },
      },
    })
  })
  await page.goto('/#plan')
  await page.getByRole('button', { name: /查資料/ }).click()
  await page.locator('[data-task-card]:visible').first().locator('label').click()
  await page.getByRole('button', { name: '複製清單' }).click()

  const copied = await page.evaluate(() => (window as typeof window & { copiedPlan?: string }).copiedPlan)
  expect(copied).toContain('使用情境　查資料')
  expect(copied).toContain('☑')
  expect(copied).toContain('完成數不是安全分數')

  const card = page.locator('[data-task-card]:visible').first()
  const checkbox = card.locator('[data-task-checkbox]')
  await checkbox.evaluate((input: HTMLInputElement) => {
    input.checked = false
    input.dispatchEvent(new Event('change', { bubbles: true }))
  })
  await card.locator('.task-card__sources a').first().evaluate((link) => {
    link.addEventListener('click', (event) => event.preventDefault(), { once: true })
    ;(link as HTMLAnchorElement).click()
  })
  await expect(checkbox).not.toBeChecked()
})

test('reduced motion keeps content visible without pinned scroll wrappers', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await context.newPage()
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('[data-count]').first()).toHaveText(/\d/)
  await expect(page.locator('.pin-spacer')).toHaveCount(0)

  await context.close()
})

test('all external new-tab links protect the opener', async ({ page }) => {
  await page.goto('/')
  const unsafeLinks = await page.locator('a[target="_blank"]').evaluateAll((links) =>
    links.filter((link) => {
      const rel = link.getAttribute('rel')?.split(/\s+/) ?? []
      return !rel.includes('noopener') || !rel.includes('noreferrer')
    }).length
  )
  expect(unsafeLinks).toBe(0)
})

test('the CSP permits same-origin discovery files without external connections', async ({ page }) => {
  const pageResponse = await page.goto('/')

  await expect(page.locator('script[src*="cloudflareinsights"]')).toHaveCount(0)

  if (page.url().startsWith('https://')) {
    expect(pageResponse?.headers()['cache-control']).toContain('no-transform')
  }

  const response = await page.evaluate(async () => {
    const robots = await fetch('/robots.txt')
    return { ok: robots.ok, text: await robots.text() }
  })

  expect(response.ok).toBe(true)
  expect(response.text).toContain('Sitemap: https://safety.matters.town/sitemap-index.xml')
})

test('publishes an agent-readable plain-text guide', async ({ request }) => {
  const response = await request.get('/llms.txt')
  expect(response.ok()).toBe(true)
  expect(response.headers()['content-type']).toContain('text/plain')
  expect(await response.text()).toContain('# Matters 安全指南')
})
