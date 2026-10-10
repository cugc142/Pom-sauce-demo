import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';

test.describe('Regression Tests - Sauce Demo', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard_user');

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test(
    'Ordenamiento A-Z funciona',
    { tag: '@regression' },
    async ({ page }) => {
      await page
        .locator('[data-test="product-sort-container"]')
        .selectOption('az');

      const nombres = await page
        .locator('.inventory_item_name')
        .allTextContents();

      const esperado = [...nombres].sort((a, b) => a.localeCompare(b));

      expect(nombres).toEqual(esperado);
    },
  );

  test(
    'Ordenamiento Z-A funciona',
    { tag: '@regression' },
    async ({ page }) => {
      await page
        .locator('[data-test="product-sort-container"]')
        .selectOption('za');

      const nombres = await page
        .locator('.inventory_item_name')
        .allTextContents();

      const esperado = [...nombres]
        .sort((a, b) => a.localeCompare(b))
        .reverse();

      expect(nombres).toEqual(esperado);
    },
  );

  test(
    'Precio de menor a mayor funciona',
    { tag: '@regression' },
    async ({ page }) => {
      await page
        .locator('[data-test="product-sort-container"]')
        .selectOption('lohi');

      const textos = await page
        .locator('.inventory_item_price')
        .allTextContents();

      const precios = textos.map((texto) =>
        Number(texto.replace('$', '').trim()),
      );

      expect(precios).toHaveLength(6);

      for (const precio of precios) {
        expect(Number.isFinite(precio)).toBe(true);
      }

      expect(precios).toEqual([...precios].sort((a, b) => a - b));
    },
  );

  test(
    'El boton Remove aparece despues de agregar al carrito',
    { tag: '@regression' },
    async ({ page }) => {
      const boton = page.locator('.btn_inventory').first();

      await expect(boton).toHaveText('Add to cart');

      await boton.click();

      await expect(boton).toHaveText('Remove');
      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

      await boton.click();

      await expect(boton).toHaveText('Add to cart');
      await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
    },
  );

  test(
    'Navegar al detalle del producto y regresar',
    { tag: '@regression' },
    async ({ page }) => {
      const nombre = page.locator('.inventory_item_name').first();
      const nombreEsperado = (await nombre.innerText()).trim();

      await nombre.click();

      await expect(page).toHaveURL(/\/inventory-item\.html\?id=\d+/);
      await expect(page.locator('.inventory_details_name')).toHaveText(
        nombreEsperado,
      );

      await page.locator('[data-test="back-to-products"]').click();

      await expect(page).toHaveURL(/\/inventory\.html$/);
      await expect(page.locator('.inventory_item')).toHaveCount(6);
    },
  );
});
