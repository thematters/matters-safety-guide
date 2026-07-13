import { expect, test } from '@playwright/test'

test('renders the complete guide and primary landmarks', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Matters 安全指南/)
  await expect(page.getByRole('heading', { level: 1 })).toContainText('先看見')
  await expect(page.locator('[data-site-header]')).toBeVisible()
  await expect(page.locator('nav.site-nav')).toHaveCount(1)
  await expect(page.getByRole('heading', { name: 'Matters 措施與證據' })).toBeVisible()
  await expect(page.locator('main')).toContainText('化名不等於冒充')
})

test('filters tasks without assigning a safety score or persisting state', async ({ page }) => {
  await page.goto('/#plan')
  const publish = page.getByRole('button', { name: /發布/ })

  await publish.click()
  await expect(publish).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('[data-plan-summary]')).toContainText('完成數不是安全分數')

  const firstVisibleTask = page.locator('[data-task-card]:visible').first()
  await firstVisibleTask.click()
  await expect(page.locator('[data-plan-summary]')).toContainText('標記完成 1 項')

  expect(await page.evaluate(() => localStorage.length)).toBe(0)
  expect(await page.evaluate(() => sessionStorage.length)).toBe(0)
  expect(await page.context().cookies()).toEqual([])

  await page.reload()
  await expect(page.getByRole('button', { name: /發布/ })).toHaveAttribute('aria-pressed', 'false')
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
