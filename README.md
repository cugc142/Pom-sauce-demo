# Proyecto QA - DemoBlaze

Proyecto desarrollado para el curso de **Aseguramiento de la Calidad del Software**, utilizando Playwright con TypeScript para la automatización de pruebas sobre la aplicación DemoBlaze.

## Datos del estudiante

**Nombre:** Cesar Ulises González Cardona

**Carné:** [COLOCA AQUÍ TU CARNÉ]

**Curso:** Aseguramiento de la Calidad del Software

**Universidad:** Universidad Mariano Gálvez de Guatemala

---

# Tecnologías utilizadas

- Node.js
- TypeScript
- Playwright
- Visual Studio Code
- Git
- GitHub

---

# Clase 01 - Fundamentos de Playwright

En la Clase 01 se realizó la configuración inicial del proyecto y la creación de los primeros tests automatizados utilizando Playwright.

Se implementaron las siguientes pruebas:

1. Verificar que la página de DemoBlaze carga correctamente.
2. Verificar que el menú de categorías sea visible.
3. Verificar que la barra de navegación contenga los enlaces correspondientes.

Archivo:

`tests/clase01.spec.ts`

Para ejecutar únicamente los tests de la Clase 01:

```bash
npx playwright test tests/clase01.spec.ts
```

---

# Clase 02 - Navegación, esperas y capturas

En la Clase 02 se trabajó con navegación entre páginas, estrategias de espera y generación automática de capturas de pantalla.

Se realizaron pruebas relacionadas con:

1. Navegación al carrito y regreso a la página principal.
2. Navegación a la categoría Phones.
3. Visualización del detalle de un producto.
4. Captura del Navbar.
5. Captura del Footer.
6. Verificación del tiempo de carga.

Archivo:

`tests/clase02.spec.ts`

Para ejecutar únicamente la Clase 02:

```bash
npx playwright test tests/clase02.spec.ts
```

## Evidencias Clase 02

Las capturas generadas durante las pruebas se encuentran en:

`evidencias/clase02/`

---

# Reflexión - Auto-Wait vs sleep()

Playwright utiliza **auto-wait** para esperar automáticamente a que los elementos estén disponibles y preparados antes de realizar una acción sobre ellos. Esto permite que las pruebas se adapten al comportamiento real de la aplicación sin depender de tiempos establecidos manualmente.

El uso de `sleep()` establece una espera fija. Esto puede provocar que una prueba espere más tiempo del necesario cuando la página carga rápidamente o que falle cuando la aplicación necesita más tiempo del establecido.

Auto-wait permite desarrollar pruebas más estables, eficientes y fáciles de mantener, debido a que Playwright realiza las esperas necesarias según el estado de los elementos. Por esta razón, es preferible utilizar las esperas automáticas y explícitas proporcionadas por Playwright en lugar de pausas fijas con `sleep()`.

---

# Clase 03 - Locators en DemoBlaze

En la Clase 03 se trabajó con diferentes estrategias para localizar elementos dentro de una aplicación web utilizando Playwright.

Se desarrollaron **9 pruebas automatizadas**, divididas en 6 pruebas realizadas durante la clase y 3 tests reto.

## Tests realizados en clase

1. Locator por texto: verificar elementos del menú.
2. Locator por CSS: productos en la página principal.
3. Locator por ID: campos del modal de login.
4. Locator por atributo: imagen del primer producto.
5. Locators encadenados: precio dentro de una tarjeta.
6. Verificar que un elemento no existe mediante negación.

## Tests reto

### Reto 1 - Locator por rol

Se utiliza `getByRole()` para localizar y verificar el botón **Place Order** disponible en el carrito de compras.

### Reto 2 - Locator con filter()

Se utiliza `filter()` para encontrar específicamente el producto **Samsung galaxy s6** entre las tarjetas disponibles y obtener su precio.

Durante la ejecución se obtuvo:

`Precio de Samsung galaxy s6: $360`

### Reto 3 - Locator por atributo parcial

Se utiliza un selector basado en el atributo `onclick` para verificar las tres categorías disponibles:

- Phones
- Laptops
- Monitors

Archivo correspondiente:

`tests/clase03.spec.ts`

---

# Ejecutar los tests de la Clase 03

Para ejecutar únicamente los 9 tests correspondientes a la Clase 03:

```bash
npx playwright test tests/clase03.spec.ts
```

Resultado esperado:

```text
Running 9 tests using 1 worker

9 passed
```

Para ejecutar los tests mostrando el navegador:

```bash
npx playwright test tests/clase03.spec.ts --headed
```

Para utilizar la interfaz gráfica de Playwright:

```bash
npx playwright test tests/clase03.spec.ts --ui
```

---

# Reporte HTML

Después de ejecutar las pruebas se puede visualizar el reporte generado por Playwright mediante:

```bash
npx playwright show-report
```

El reporte permite visualizar los tests ejecutados, su duración y el resultado de cada prueba.

---

# Evidencias Clase 03

Durante la ejecución de los 9 tests de la Clase 03 se generan automáticamente las siguientes evidencias:

1. `01-locator-texto-menu.png`
2. `02-locator-css-productos.png`
3. `03-locator-id-login.png`
4. `04-locator-atributo-imagen.png`
5. `05-locators-encadenados-precio.png`
6. `06-negacion.png`
7. `07-reto-place-order.png`
8. `08-reto-filter-producto.png`
9. `09-reto-categorias.png`

Las imágenes se encuentran almacenadas en:

`evidencias/clase03/`

---

# Caso de prueba

Como parte de la Clase 03 se documentó el caso de prueba:

**TC-001 - Agregar un producto al carrito**

El documento se encuentra en:

`casos-de-prueba/TC-001.md`

El caso verifica que un usuario pueda seleccionar un producto de DemoBlaze, agregarlo al carrito y comprobar posteriormente que aparece correctamente dentro del carrito de compras.

---

# Estructura del proyecto

```text
pw-2026/
│
├── casos-de-prueba/
│   └── TC-001.md
│
├── evidencias/
│   ├── clase02/
│   │   ├── 01-pagina-inicio.png
│   │   ├── 02-carrito-vacio.png
│   │   ├── 03-detalle-producto.png
│   │   ├── 04-navbar.png
│   │   └── 05-footer.png
│   │
│   └── clase03/
│       ├── 01-locator-texto-menu.png
│       ├── 02-locator-css-productos.png
│       ├── 03-locator-id-login.png
│       ├── 04-locator-atributo-imagen.png
│       ├── 05-locators-encadenados-precio.png
│       ├── 06-negacion.png
│       ├── 07-reto-place-order.png
│       ├── 08-reto-filter-producto.png
│       └── 09-reto-categorias.png
│
├── tests/
│   ├── clase01.spec.ts
│   ├── clase02.spec.ts
│   └── clase03.spec.ts
│
├── README.md
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

---

# Ejecutar todas las pruebas

Para ejecutar todos los tests desarrollados hasta el momento:

```bash
npx playwright test
```

Para consultar posteriormente el reporte:

```bash
npx playwright show-report
```

---

# Estado del proyecto

- Clase 01: Completada
- Clase 02: Completada
- Clase 03: Completada
- Tests Clase 03: **9 passed**
- Caso de prueba TC-001: Completado