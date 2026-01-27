import { test, expect } from '@playwright/test';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import * as fs from 'fs';
import * as path from 'path';

const REFERENCE_DIR = path.join(__dirname, '../../reference');
const SCREENSHOTS_DIR = path.join(__dirname, '../../screenshots');

test.describe('Visual Regression Tests', () => {
  test.beforeAll(() => {
    if (!fs.existsSync(SCREENSHOTS_DIR)) {
      fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
    }
  });

  test('pricing card desktop matches reference', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/pricing');

    const card = page.locator('[data-testid="pricing-card"]').first();
    await card.waitFor({ state: 'visible' });

    const screenshot = await card.screenshot();
    const screenshotPath = path.join(SCREENSHOTS_DIR, 'pricing-card-desktop.png');
    fs.writeFileSync(screenshotPath, screenshot);

    const referencePath = path.join(REFERENCE_DIR, 'pricing-card-desktop.png');
    if (!fs.existsSync(referencePath)) {
      test.skip('Reference image not found');
      return;
    }

    const reference = PNG.sync.read(fs.readFileSync(referencePath));
    const captured = PNG.sync.read(screenshot);

    const { width, height } = reference;
    const diff = new PNG({ width, height });

    const mismatchedPixels = pixelmatch(
      reference.data,
      captured.data,
      diff.data,
      width,
      height,
      { threshold: 0.1 }
    );

    const totalPixels = width * height;
    const matchPercentage = ((totalPixels - mismatchedPixels) / totalPixels) * 100;

    fs.writeFileSync(
      path.join(SCREENSHOTS_DIR, 'pricing-card-desktop-diff.png'),
      PNG.sync.write(diff)
    );

    expect(matchPercentage).toBeGreaterThan(95);
  });

  test('pricing card mobile matches reference', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/pricing');

    const card = page.locator('[data-testid="pricing-card"]').first();
    await card.waitFor({ state: 'visible' });

    const screenshot = await card.screenshot();
    const screenshotPath = path.join(SCREENSHOTS_DIR, 'pricing-card-mobile.png');
    fs.writeFileSync(screenshotPath, screenshot);

    const referencePath = path.join(REFERENCE_DIR, 'pricing-card-mobile.png');
    if (!fs.existsSync(referencePath)) {
      test.skip('Reference image not found');
      return;
    }

    const reference = PNG.sync.read(fs.readFileSync(referencePath));
    const captured = PNG.sync.read(screenshot);

    const { width, height } = reference;
    const diff = new PNG({ width, height });

    const mismatchedPixels = pixelmatch(
      reference.data,
      captured.data,
      diff.data,
      width,
      height,
      { threshold: 0.1 }
    );

    const totalPixels = width * height;
    const matchPercentage = ((totalPixels - mismatchedPixels) / totalPixels) * 100;

    expect(matchPercentage).toBeGreaterThan(90);
  });

  test('popular card shows badge', async ({ page }) => {
    await page.goto('/pricing');

    const popularCard = page.locator('[data-testid="pricing-card"][data-popular="true"]');
    const badge = popularCard.locator('[data-testid="popular-badge"]');

    await expect(badge).toBeVisible();
    await expect(badge).toHaveText(/popular/i);
  });
});
