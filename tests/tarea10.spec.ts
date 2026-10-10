import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import * as path from 'node:path';
import { loginAs } from '../helpers/auth';

test.describe('Tarea 10 - Tags, soft assertions y cross-browser', () => {
  test.beforeEach(async ({ page }) => {
    await loginAs(page, 'standard_user');

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test.afterEach(async ({ page }, testInfo) => {
    const carpeta = path.join(
      'evidencias',
      'clase10',
      testInfo.project.name,
    );

    await mkdir(carpeta, { recursive: true });

    const nombre = testInfo.title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();

    const archivo = path.join(carpeta, `${nombre}.png`);

    await page.screenshot({
      path: archivo,
      fullPage: true,
    });

    await testInfo.attach('Captura del reto', {
      path: archivo,
      contentType: 'image/png',
    });
  });

  test(
    'Reto 1 - Tags multiples',
    { tag: ['@regression', '@ui'] },
    async ({ page }) => {
      const producto = page.locator('.inventory_item').filter({
        has: page
          .locator('.inventory_item_name')
          .filter({ hasText: /^Sauce Labs Backpack$/ }),
      });

      await expect(producto).toHaveCount(1);

      const boton = producto.getByRole('button', {
        name: 'Add to cart',
        exact: true,
      });

      await expect(boton).toBeVisible();
      await expect(boton).toBeEnabled();

      await boton.click();

      await expect(
        producto.getByRole('button', {
          name: 'Remove',
          exact: true,
        }),
      ).toBeVisible();

      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

      await page.locator('.shopping_cart_link').click();

      await expect(page.locator('.cart_item')).toHaveCount(1);
      await expect(page.locator('.inventory_item_name')).toHaveText(
        'Sauce Labs Backpack',
      );
    },
  );

  test(
    'Reto 2 - Atributos del producto con soft assertions',
    { tag: ['@regression', '@soft'] },
    async ({ page }, testInfo) => {
      const producto = page.locator('.inventory_item').filter({
        has: page
          .locator('.inventory_item_name')
          .filter({ hasText: /^Sauce Labs Backpack$/ }),
      });

      await expect(producto).toHaveCount(1);

      const nombre = producto.locator('.inventory_item_name');
      const descripcion = producto.locator('.inventory_item_desc');
      const precio = producto.locator('.inventory_item_price');
      const imagen = producto.locator('img');
      const boton = producto.locator('.btn_inventory');

      await expect.soft(
        nombre,
        'El nombre debe coincidir con el producto esperado',
      ).toHaveText('Sauce Labs Backpack');

      await expect.soft(
        descripcion,
        'La descripcion no debe estar vacia',
      ).toHaveText(/\S+/);

      await expect.soft(
        precio,
        'El precio debe ser $29.99',
      ).toHaveText('$29.99');

      await expect.soft(
        imagen,
        'La imagen debe ser visible',
      ).toBeVisible();

      await expect.soft(
        imagen,
        'La imagen debe tener el texto alternativo correcto',
      ).toHaveAttribute('alt', 'Sauce Labs Backpack');

      await expect.soft(
        imagen,
        'La imagen debe tener una direccion de origen',
      ).toHaveAttribute('src', /.+/);

      await expect.soft(
        boton,
        'El boton debe mostrar Add to cart',
      ).toHaveText('Add to cart');

      await expect.soft(
        boton,
        'El boton debe estar habilitado',
      ).toBeEnabled();

      const errores = testInfo.errors.map((error, indice) => ({
        numero: indice + 1,
        mensaje: error.message ?? 'Error sin mensaje',
      }));

      console.log(
        `[${testInfo.project.name}] Errores de validacion: ${errores.length}`,
      );

      await testInfo.attach('Resumen de soft assertions', {
        body: JSON.stringify(
          {
            producto: 'Sauce Labs Backpack',
            proyecto: testInfo.project.name,
            cantidadErrores: errores.length,
            errores,
          },
          null,
          2,
        ),
        contentType: 'application/json',
      });
    },
  );

  test(
    'Reto 3 - Asercion segun browserName',
    { tag: ['@regression', '@crossbrowser'] },
    async ({ page, browserName }, testInfo) => {
      const userAgent = await page.evaluate(() => navigator.userAgent);

      if (browserName === 'chromium') {
        expect(
          userAgent,
          'Chromium debe identificarse con Chrome en esta configuracion',
        ).toMatch(/Chrome\//);
      } else if (browserName === 'firefox') {
        expect(
          userAgent,
          'Firefox debe identificarse con Firefox',
        ).toMatch(/Firefox\//);
      } else {
        expect(
          userAgent,
          'WebKit debe identificarse con AppleWebKit',
        ).toMatch(/AppleWebKit\//);

        expect(
          userAgent,
          'El perfil Safari debe incluir Safari',
        ).toMatch(/Safari\//);

        expect(
          userAgent,
          'El perfil Safari no debe identificarse con Chrome',
        ).not.toMatch(/Chrome\/|Chromium\//);
      }

      await page
        .locator('[data-test="product-sort-container"]')
        .selectOption('hilo');

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

      expect(
        precios,
        `Los precios deben ordenarse de mayor a menor en ${browserName}`,
      ).toEqual([...precios].sort((a, b) => b - a));

      await testInfo.attach('Datos del navegador', {
        body: JSON.stringify(
          {
            proyecto: testInfo.project.name,
            motor: browserName,
            userAgent,
          },
          null,
          2,
        ),
        contentType: 'application/json',
      });
    },
  );
});