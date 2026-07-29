import { test, expect } from '@playwright/test';

test.describe('Clase 03 - Locators en DemoBlaze', () => {

  test('Locator por texto: verificar elementos del menú', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('#navbarExample');

    await expect(nav.getByText('Home')).toBeVisible();
    await expect(nav.getByText('Contact')).toBeVisible();
    await expect(nav.getByText('About us')).toBeVisible();

    await expect(
      nav.getByText('Cart', { exact: true })
    ).toBeVisible();

    // Evidencia del Test 1
    await page.screenshot({
      path: 'evidencias/clase03/01-locator-texto-menu.png',
      fullPage: true
    });
  });


  test('Locator por CSS: productos en la página principal', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('.card-title');

    const tarjetas = page.locator('.card');
    const cantidad = await tarjetas.count();

    expect(cantidad).toBeGreaterThan(0);

    const primerProducto = page.locator('.card-title a').first();
    const nombreProducto = await primerProducto.textContent();

    expect(nombreProducto).not.toBeNull();

    // Evidencia del Test 2
    await page.screenshot({
      path: 'evidencias/clase03/02-locator-css-productos.png',
      fullPage: true
    });
  });


  test('Locator por ID: campos del modal de login', async ({ page }) => {
    await page.goto('/');

    await page
      .locator('#navbarExample')
      .getByRole('link', { name: 'Log in', exact: true })
      .click();

    await page.waitForSelector('#logInModal', {
      state: 'visible'
    });

    await expect(page.locator('#loginusername')).toBeVisible();
    await expect(page.locator('#loginpassword')).toBeVisible();

    // Evidencia del Test 3
    // Aquí quedará visible el modal de Login.
    await page.screenshot({
      path: 'evidencias/clase03/03-locator-id-login.png',
      fullPage: true
    });
  });


  test('Locator por atributo: imagen del primer producto', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('.card-title');

    await page.locator('.card-title a').first().click();

    await page.waitForLoadState('domcontentloaded');

    const imagenProducto = page.locator('.product-image img');

    await expect(imagenProducto).toBeVisible();

    const srcImagen = await imagenProducto.getAttribute('src');

    expect(srcImagen).not.toBeNull();

    // Evidencia del Test 4
    await page.screenshot({
      path: 'evidencias/clase03/04-locator-atributo-imagen.png',
      fullPage: true
    });
  });


  test('Locators encadenados: precio dentro de una tarjeta', async ({ page }) => {
    await page.goto('/');

    await page.waitForSelector('.card-title');

    const primeraTarjeta = page.locator('.card').first();

    const precio = primeraTarjeta.locator('h5');

    await expect(precio).toBeVisible();

    // Evidencia del Test 5
    await page.screenshot({
      path: 'evidencias/clase03/05-locators-encadenados-precio.png',
      fullPage: true
    });
  });


  test('Verificar que NO existe un elemento (negación)', async ({ page }) => {
    await page.goto('/');

    const mensajeVacio = page.getByText('No products found');

    await expect(mensajeVacio).not.toBeVisible();

    // Evidencia del Test 6
    await page.screenshot({
      path: 'evidencias/clase03/06-negacion.png',
      fullPage: true
    });
  });


  test('Reto 1 - Locator por rol: verificar botón Place Order', async ({ page }) => {

    await page.goto('/cart.html');

    const botonPlaceOrder = page.getByRole('button', {
      name: 'Place Order'
    });

    await expect(botonPlaceOrder).toBeVisible();

    // Evidencia del Reto 1
    await page.screenshot({
      path: 'evidencias/clase03/07-reto-place-order.png',
      fullPage: true
    });
  });


  test('Reto 2 - Locator con filter(): encontrar producto y leer precio', async ({ page }) => {

    await page.goto('/');

    await page.waitForSelector('.card');

    const producto = page
      .locator('.card')
      .filter({ hasText: 'Samsung galaxy s6' });

    await expect(producto).toBeVisible();

    const precio = producto.locator('h5');

    await expect(precio).toBeVisible();

    const textoPrecio = await precio.textContent();

    expect(textoPrecio).not.toBeNull();

    console.log('Precio de Samsung galaxy s6:', textoPrecio);

    // Evidencia del Reto 2
    await page.screenshot({
      path: 'evidencias/clase03/08-reto-filter-producto.png',
      fullPage: true
    });
  });


  test('Reto 3 - Locator por atributo parcial: verificar categorías', async ({ page }) => {

    await page.goto('/');

    const categorias = page.locator('[onclick*="byCat"]');

    await expect(categorias).toHaveCount(3);

    await expect(categorias.nth(0)).toContainText('Phones');
    await expect(categorias.nth(1)).toContainText('Laptops');
    await expect(categorias.nth(2)).toContainText('Monitors');

    // Evidencia del Reto 3
    await page.screenshot({
      path: 'evidencias/clase03/09-reto-categorias.png',
      fullPage: true
    });
  });

});