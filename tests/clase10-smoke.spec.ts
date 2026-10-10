import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';

test.describe('Smoke Tests - Sauce Demo', () => {
  test(
    'La pagina de login carga',
    { tag: '@smoke' },
    async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');

      await expect(page).toHaveTitle(/Swag Labs/);
      await expect(page.locator('#login-button')).toBeVisible();
    },
  );

  test(
    'Login con usuario estandar funciona',
    { tag: '@smoke' },
    async ({ page }) => {
      await loginAs(page, 'standard_user');

      await expect(page).toHaveURL(/\/inventory\.html$/);
    },
  );

  test(
    'El inventario muestra productos',
    { tag: '@smoke' },
    async ({ page }) => {
      await loginAs(page, 'standard_user');

      await expect(page.locator('.inventory_item')).toHaveCount(6);
    },
  );

  test(
    'El carrito es accesible',
    { tag: '@smoke' },
    async ({ page }) => {
      await loginAs(page, 'standard_user');
      await page.locator('.shopping_cart_link').click();

      await expect(page).toHaveURL(/\/cart\.html$/);
    },
  );

  test(
    'El checkout inicia correctamente',
    { tag: '@smoke' },
    async ({ page }) => {
      await loginAs(page, 'standard_user');

      await page.locator('.btn_inventory').first().click();
      await page.locator('.shopping_cart_link').click();
      await page.locator('[data-test="checkout"]').click();

      await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
      await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    },
  );
});