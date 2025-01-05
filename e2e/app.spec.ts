import { test, expect } from '@playwright/test'

test('shows the application heading', async ({ page }) => {
  await page.goto('/')
  await expect(
    page.getByRole('heading', {
      name: /StashSpot/i,
    }),
  ).toBeVisible()
})

test('toggles the application theme', async ({ page }) => {
  await page.goto('/')

  await expect(page.locator('html')).toHaveClass('light')

  const toggleThemeButton = page.getByRole('button', { name: /toggle theme/i })

  await expect(toggleThemeButton).toBeVisible()

  await toggleThemeButton.click()

  const menuItems = [/light/i, /dark/i, /system/i]

  menuItems.forEach(async (menuItem) => {
    await expect(
      page.getByRole('menuitem', {
        name: menuItem,
      }),
    ).toBeVisible()
  })

  await page.click('text=Dark')

  await expect(page.locator('html')).toHaveClass('dark')
})
