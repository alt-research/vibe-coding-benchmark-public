import { test, expect } from '@playwright/test';

test.describe('Pricing Card Interactions', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/pricing');
  });

  test('CTA button is clickable', async ({ page }) => {
    const card = page.locator('[data-testid="pricing-card"]').first();
    const ctaButton = card.locator('button');

    await expect(ctaButton).toBeEnabled();
    await ctaButton.click();

    // Should trigger some action - check for modal, navigation, or event
    const wasClicked = await page.evaluate(() => {
      return (window as any).__ctaClicked === true;
    });
    expect(wasClicked).toBe(true);
  });

  test('button has hover state', async ({ page }) => {
    const card = page.locator('[data-testid="pricing-card"]').first();
    const ctaButton = card.locator('button');

    const initialBg = await ctaButton.evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );

    await ctaButton.hover();

    const hoverBg = await ctaButton.evaluate(
      (el) => getComputedStyle(el).backgroundColor
    );

    expect(hoverBg).not.toBe(initialBg);
  });

  test('card is keyboard accessible', async ({ page }) => {
    await page.keyboard.press('Tab');

    const focusedElement = await page.evaluate(() => {
      return document.activeElement?.tagName.toLowerCase();
    });

    expect(focusedElement).toBe('button');
  });

  test('renders all features', async ({ page }) => {
    const card = page.locator('[data-testid="pricing-card"]').first();
    const features = card.locator('[data-testid="feature-item"]');

    const count = await features.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const feature = features.nth(i);
      await expect(feature).toBeVisible();
      const text = await feature.textContent();
      expect(text?.length).toBeGreaterThan(0);
    }
  });

  test('displays correct price format', async ({ page }) => {
    const card = page.locator('[data-testid="pricing-card"]').first();
    const priceElement = card.locator('[data-testid="price"]');

    const priceText = await priceElement.textContent();
    expect(priceText).toMatch(/\$\d+/);
  });

  test('passes accessibility audit', async ({ page }) => {
    const card = page.locator('[data-testid="pricing-card"]').first();

    // Check semantic structure
    const hasHeading = await card.locator('h2, h3, h4').count();
    expect(hasHeading).toBeGreaterThan(0);

    // Check button has accessible name
    const button = card.locator('button');
    const buttonText = await button.textContent();
    expect(buttonText?.length).toBeGreaterThan(0);

    // Check list semantics for features
    const hasList = await card.locator('ul, ol').count();
    expect(hasList).toBeGreaterThan(0);
  });
});
