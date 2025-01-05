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

test('shows the application tabs', async ({ page }) => {
  await page.goto('/')

  const tabs = [/resources/i, /create a new resource/i]

  tabs.forEach(async (tab) => {
    await expect(
      page.getByRole('tab', {
        name: tab,
      }),
    ).toBeVisible()
  })
})

test('shows the default resources', async ({ page }) => {
  await page.goto('/')

  const resources = [/vue mastery/i, /vue.js/i, /vite/i, /tailwind css/i]

  resources.forEach(async (resource) => {
    await expect(
      page.getByRole('heading', {
        name: resource,
      }),
    ).toBeVisible()
  })
})

test('allows the user to create a new resource', async ({ page }) => {
  const newResource = {
    title: 'Svelte',
    url: 'https://svelte.dev/',
    description: 'Svelte is a radical new approach to building user interfaces.',
  }

  await page.goto('/')
  await page.click('text=Create a new resource')
  await page.fill('input[name="title"]', newResource.title)
  await page.fill('input[name="url"]', newResource.url)
  await page.fill('textarea[name="description"]', newResource.description)

  const submitButton = page.getByRole('button', { name: /create/i })
  await submitButton.click()

  const resourceCards = await page.locator('div[data-testid="resource-card"]').all()
  const newResourceCard = resourceCards[4]

  expect(resourceCards).toHaveLength(5)

  const resourceTitle = newResourceCard.getByRole('heading', {
    name: newResource.title,
  })
  const resourceDescription = newResourceCard.getByText(newResource.description)
  const resourceLink = newResourceCard.getByRole('link', {
    name: /visit/i,
  })

  await expect(resourceTitle).toBeVisible()
  await expect(resourceDescription).toBeVisible()
  await expect(resourceLink).toBeVisible()
})

test('allows the user to delete a resource', async ({ page }) => {
  await page.goto('/')

  const resourceCards = await page.locator('div[data-testid="resource-card"]').all()
  const firstResourceCard = resourceCards[0]

  const deleteButton = firstResourceCard.getByRole('button', { name: /delete/i })
  await deleteButton.click()

  const updatedResourceCards = await page.locator('div[data-testid="resource-card"]').all()

  expect(updatedResourceCards).toHaveLength(3)
})
