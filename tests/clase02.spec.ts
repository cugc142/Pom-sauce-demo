import { test, expect, Page, Locator } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const EVIDENCE_DIR = path.join('.', 'evidencias');

test.beforeAll(() => {
  if (!fs.existsSync(EVIDENCE_DIR)) {
    fs.mkdirSync(EVIDENCE_DIR, { recursive: true });
  }
});

async function tomarCaptura(
  target: Page | Locator,
  fileName: string,
  options: { fullPage?: boolean } = {}
): Promise<void> {
  const filePath = path.join(EVIDENCE_DIR, fileName);
  try {
    await target.screenshot({ path: filePath, ...options });
  } catch (error) {
    console.error(`No se pudo capturar "${fileName}":`, error);
    throw error;
  }
}

test.describe('Clase 02 - Navegación y esperas en DemoBlaze', () => {
  test('Navegar al carrito y regresar al inicio', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/demoblaze/);
    await tomarCaptura(page, '01-pagina-inicio.png', { fullPage: true });

    const linkCarrito = page.getByRole('link', { name: 'Cart' });
    await expect(linkCarrito).toBeVisible();
    await linkCarrito.click();

    await page.waitForURL('**/cart.html');
    await expect(page).toHaveURL(/cart/);
    await tomarCaptura(page, '02-carrito-vacio.png', { fullPage: true });

    await page.goBack();
    await expect(page).toHaveURL(/demoblaze\.com\/?$/);
  });

  test('Navegar a la categoría Phones y ver un producto', async ({ page }) => {
    await page.goto('/');

    const linkPhones = page.getByText('Phones', { exact: true });
    await expect(linkPhones).toBeVisible();
    await linkPhones.click();

    await page.waitForSelector('.card-title a');

    const productos = page.locator('.card-title a');
    const totalProductos = await productos.count();

    expect(totalProductos, 'La categoría Phones no devolvió productos').toBeGreaterThan(0);

    await productos.first().click();
    await page.waitForLoadState('domcontentloaded');
    await tomarCaptura(page, '03-detalle-producto.png', { fullPage: true });

    await expect(page.getByText('Add to cart')).toBeVisible();
  });

  test('Capturar el navbar y el footer por separado', async ({ page }) => {
    await page.goto('/');

    const navbar = page.locator('#navbarExample');
    await expect(navbar).toBeVisible();
    await tomarCaptura(navbar, '04-navbar.png');

    const footer = page.locator('#footc');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer).toBeVisible();

    await tomarCaptura(footer, '05-footer.png');
  });

  test('Verificar tiempo de carga de la página principal', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('load');

    const loadTime = Date.now() - startTime;
    console.log(`Tiempo de carga: ${loadTime}ms`);

    expect(loadTime, `La carga tomó ${loadTime}ms, se esperaba menos de 10000ms`).toBeLessThan(10000);
  });
});