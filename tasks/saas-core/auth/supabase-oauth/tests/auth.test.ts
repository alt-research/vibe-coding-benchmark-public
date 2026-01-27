import { test, expect } from '@playwright/test';

test.describe('Google OAuth Authentication', () => {
  test('should show sign in with Google button on login page', async ({ page }) => {
    await page.goto('/login');
    const googleButton = page.getByRole('button', { name: /sign in with google/i });
    await expect(googleButton).toBeVisible();
  });

  test('should redirect unauthenticated users from dashboard to login', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });

  test('should complete OAuth flow and redirect to dashboard', async ({ page }) => {
    // This test uses a mock OAuth provider
    await page.goto('/login');

    // Click Google sign in button
    const googleButton = page.getByRole('button', { name: /sign in with google/i });
    await googleButton.click();

    // Mock OAuth callback
    await page.goto('/auth/callback?code=mock_code');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/dashboard/);
  });

  test('should display user info on dashboard after login', async ({ page }) => {
    // Set up authenticated session
    await page.goto('/auth/callback?code=mock_code');
    await page.goto('/dashboard');

    // Should show user email
    await expect(page.getByText(/@/)).toBeVisible();

    // Should show sign out button
    const signOutButton = page.getByRole('button', { name: /sign out/i });
    await expect(signOutButton).toBeVisible();
  });

  test('should clear session on sign out', async ({ page }) => {
    // Set up authenticated session
    await page.goto('/auth/callback?code=mock_code');
    await page.goto('/dashboard');

    // Click sign out
    const signOutButton = page.getByRole('button', { name: /sign out/i });
    await signOutButton.click();

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);

    // Session should be cleared - accessing dashboard should redirect to login
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/\/login/);
  });
});
