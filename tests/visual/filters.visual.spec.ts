import { test, expect } from '@playwright/test'

const STORY_IDS = [
  {
    id: 'svg-filters-filtersurface--risograph-grain',
    name: 'risograph-grain'
  },
  {
    id: 'svg-filters-filtersurface--posterization-pass',
    name: 'posterization-pass'
  },
  {
    id: 'svg-filters-filtersurface--ambient-noise-glass-static',
    name: 'ambient-noise-glass-static'
  }
]

for (const story of STORY_IDS) {
  test(`visual regression: ${story.name}`, async ({ page }) => {
    await page.goto(
      `/iframe.html?id=${story.id}&viewMode=story&args=&globals=backgrounds.value:!hex(f8fafc)`
    )

    await page.waitForSelector('[data-filter-id]', { state: 'visible' })
    await page.waitForTimeout(300)

    await expect(page).toHaveScreenshot(`${story.name}.png`, {
      maxDiffPixelRatio: 0.02,
      threshold: 0.1
    })
  })
}
