import { test, expect } from '@playwright/test';

test.describe('Todo App E2E Tests', () => {
  const testEmail = `test${Date.now()}@example.com`;
  const testPassword = 'TestPassword123';

  test('complete user flow: register, create todos, filter, edit, delete', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/login/);

    await page.click('text=Register here');
    await expect(page).toHaveURL(/\/register/);

    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.fill('input[name="confirmPassword"]', testPassword);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/todos/);
    await expect(page.locator('text=My Todos')).toBeVisible();

    await page.fill('input[placeholder="What needs to be done?"]', 'Buy groceries');
    await page.click('button:has-text("Add")');
    await expect(page.locator('text=Buy groceries')).toBeVisible();

    await page.fill('input[placeholder="What needs to be done?"]', 'Write tests');
    await page.click('button:has-text("Add")');
    await expect(page.locator('text=Write tests')).toBeVisible();

    await page.fill('input[placeholder="What needs to be done?"]', 'Deploy app');
    await page.click('button:has-text("Add")');
    await expect(page.locator('text=Deploy app')).toBeVisible();

    const firstCheckbox = page.locator('input[type="checkbox"]').first();
    await firstCheckbox.check();
    await expect(firstCheckbox).toBeChecked();

    await page.click('button:has-text("Active")');
    await expect(page.locator('text=Write tests')).toBeVisible();
    await expect(page.locator('text=Deploy app')).toBeVisible();

    await page.click('button:has-text("Completed")');
    await expect(page.locator('li').filter({ hasText: 'Buy groceries' })).toBeVisible();

    await page.click('button:has-text("All")');

    const editButton = page.locator('button:has-text("Edit")').first();
    await editButton.click();

    const editInput = page.locator('input[type="text"]').nth(1);
    await editInput.fill('Buy groceries and cook dinner');
    await page.click('button:has-text("Save")');
    await expect(page.locator('text=Buy groceries and cook dinner')).toBeVisible();

    const deleteButton = page.locator('button:has-text("Delete")').first();
    await deleteButton.click();
    await expect(page.locator('text=Buy groceries and cook dinner')).not.toBeVisible();

    await page.click('button:has-text("Logout")');
    await expect(page).toHaveURL(/\/login/);
  });

  test('login flow', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', testEmail);
    await page.fill('input[name="password"]', testPassword);
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/\/todos/);
    await expect(page.locator('text=My Todos')).toBeVisible();
  });

  test('protected route redirects to login', async ({ page }) => {
    await page.goto('/todos');
    await expect(page).toHaveURL(/\/login/);
  });

  test('validation errors on registration', async ({ page }) => {
    await page.goto('/register');

    await page.fill('input[name="email"]', 'invalid-email');
    await page.fill('input[name="password"]', 'weak');
    await page.fill('input[name="confirmPassword"]', 'weak');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Password must be at least 8 characters')).toBeVisible();
  });

  test('login with invalid credentials', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="email"]', 'wrong@example.com');
    await page.fill('input[name="password"]', 'WrongPassword123');
    await page.click('button[type="submit"]');

    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });
});
