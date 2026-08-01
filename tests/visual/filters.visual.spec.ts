import { createHash } from 'node:crypto'
import { test, expect } from '@playwright/test'

const STORY_IDS = [
  {
    id: 'svg-filters-filtersurface--risograph-grain',
    name: 'risograph-grain',
    sha256: '0315c0e53aaa422e32142a5cd35771e7ff3287c898fcbed587a2503c87ff8717'
  },
  {
    id: 'svg-filters-filtersurface--posterization-pass',
    name: 'posterization-pass',
    sha256: '1b5dadb6086e52ab0bd967e78e3f1ba7d0a74a568fd6a6ebd23d4aabdbd50ac6'
  },
  {
    id: 'svg-filters-filtersurface--ambient-noise-glass-static',
    name: 'ambient-noise-glass-static',
    sha256: '11dafdb591da4a95bab061bdc9253a6aa392924bc02ea70b0de0af26b332ff5a'
  }
] as const

for (const story of STORY_IDS) {
  test(`visual regression: ${story.name}`, async ({ page }, testInfo) => {
    await page.goto(
      `/iframe.html?id=${story.id}&viewMode=story&args=&globals=backgrounds.value:!hex(f8fafc)`
    )

    await page.waitForSelector('[data-filter-id]', { state: 'visible' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(300)

    const screenshot = await page.screenshot({
      animations: 'disabled',
      caret: 'hide'
    })

    await testInfo.attach(`${story.name}.png`, {
      body: screenshot,
      contentType: 'image/png'
    })

    const digest = createHash('sha256').update(screenshot).digest('hex')
    expect(digest, `${story.name} visual checksum`).toBe(story.sha256)
  })
}
