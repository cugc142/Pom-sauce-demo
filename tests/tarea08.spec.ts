import { test, expect, Page, BrowserContext } from '@playwright/test';

test.describe('Reto 1 - Suite serial con página compartida', () => {
  test.describe.configure({ mode: 'serial' });

  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('iniciar sesión', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory/);
  });

  test('agregar producto al carrito', async () => {
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});

test('Reto 2 - Usuario con lentitud artificial', async ({ page }) => {
  test.slow();

  await page.goto('https://www.saucedemo.com/');
  await page.waitForTimeout(3000);
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.waitForTimeout(2000);
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.waitForTimeout(2000);
  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory/);
});

test('Reto 3 - Skip dinámico', async ({ page, browserName }) => {
  test.skip(
    browserName === 'webkit',
    'Esta prueba se omite en WebKit porque la función evaluada solo está disponible en Chromium y Firefox'
  );

  await page.goto('https://www.saucedemo.com/');
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});