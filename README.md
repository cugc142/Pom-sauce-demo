# Proyecto QA - DemoBlaze

Proyecto desarrollado para el curso de **Aseguramiento de la Calidad del Software**, utilizando Playwright con TypeScript para la automatización de pruebas sobre la aplicación DemoBlaze.

---

# Datos del estudiante

**Nombre:** Cesar Ulises González Cardona

**Carné:** 1790-22-6044

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

## Archivo

```text
tests/clase01.spec.ts
```

## Ejecutar los tests de la Clase 01

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

## Archivo

```text
tests/clase02.spec.ts
```

## Ejecutar los tests de la Clase 02

```bash
npx playwright test tests/clase02.spec.ts
```

## Evidencias Clase 02

Las capturas generadas durante las pruebas se encuentran en:

```text
evidencias/clase02/
```

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

```text
Precio de Samsung galaxy s6: $360
```

### Reto 3 - Locator por atributo parcial

Se utiliza un selector basado en el atributo `onclick` para verificar las tres categorías disponibles:

- Phones
- Laptops
- Monitors

## Archivo

```text
tests/clase03.spec.ts
```

---

# Ejecutar los tests de la Clase 03

Para ejecutar únicamente los 9 tests correspondientes a la Clase 03:

```bash
npx playwright test tests/clase03.spec.ts
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

```text
evidencias/clase03/
```

---

# Caso de prueba

Como parte de la Clase 03 se documentó el caso de prueba:

**TC-001 - Agregar un producto al carrito**

El documento se encuentra en:

```text
casos-de-prueba/TC-001.md
```

El caso verifica que un usuario pueda seleccionar un producto de DemoBlaze, agregarlo al carrito y comprobar posteriormente que aparece correctamente dentro del carrito de compras.

---

# Clase 04 - Actions en Playwright

En la Clase 04 se trabajó con diferentes **acciones de usuario en Playwright**, utilizando métodos como `fill()`, `click()` y `clear()` para interactuar con formularios, botones, ventanas modales y campos de la aplicación DemoBlaze.

Para esta clase se integraron los tests realizados anteriormente junto con los **3 tests reto solicitados en la Tarea 04**, obteniendo un total de **7 pruebas automatizadas**.

## Tests de la Clase 04

### Test 1 - Registrar un nuevo usuario

Se realiza el proceso de registro de un nuevo usuario en DemoBlaze utilizando las acciones de Playwright necesarias para completar el formulario.

### Test 2 - Iniciar sesión

Se utiliza el usuario registrado para realizar el proceso de inicio de sesión y verificar que el acceso se realice correctamente.

### Test 3 - Agregar producto al carrito

Se realiza el inicio de sesión, se selecciona un producto y posteriormente se agrega al carrito para comprobar que el producto haya sido agregado correctamente.

### Test 4 - Login con credenciales incorrectas

Se intenta iniciar sesión utilizando credenciales incorrectas para verificar el comportamiento de la aplicación ante un intento de autenticación no válido.

---

# Tests reto de la Clase 04

## Reto 1 - Completar Place Order utilizando fill()

Se utiliza el método `fill()` de Playwright para completar los campos correspondientes al formulario de **Place Order**.

Este ejercicio permite practicar la interacción automatizada con diferentes campos de un formulario.

## Reto 2 - Cerrar el modal utilizando Close

Se interactúa con una ventana modal de DemoBlaze y se utiliza el botón **Close** para cerrarla.

Este ejercicio permite practicar la interacción con elementos que aparecen dentro de ventanas modales.

## Reto 3 - Llenar y limpiar un campo utilizando clear()

Se llena un campo utilizando Playwright y posteriormente se utiliza `clear()` para eliminar su contenido.

Este ejercicio permite comprobar el comportamiento de un campo antes y después de limpiar su información.

---

# Archivo de la Clase 04

Los tests de la Clase 04 se encuentran en:

```text
tests/clase04.spec.ts
```

La Clase 04 contiene un total de **7 tests automatizados**:

1. Registrar un nuevo usuario.
2. Iniciar sesión con el usuario registrado.
3. Iniciar sesión y agregar un producto al carrito.
4. Intentar iniciar sesión con credenciales incorrectas.
5. Completar Place Order utilizando `fill()`.
6. Cerrar un modal utilizando el botón `Close`.
7. Llenar y limpiar un campo utilizando `clear()`.

---

# Ejecutar los tests de la Clase 04

Para ejecutar únicamente los tests correspondientes a la Clase 04:

```bash
npx playwright test tests/clase04.spec.ts
```

Para ejecutar los tests mostrando el navegador:

```bash
npx playwright test tests/clase04.spec.ts --headed
```

Para utilizar la interfaz gráfica de Playwright:

```bash
npx playwright test tests/clase04.spec.ts --ui
```

---

# Reflexión Tarea 04

Como parte de la Tarea 04 se debe presentar una reflexión sobre los principios utilizados durante la automatización de pruebas.

La reflexión se encuentra en:

```text
tareas/tarea-04.md
```

La pregunta principal de la reflexión es:

**¿Cuál principio es más importante y por qué?**

En la reflexión se analiza la importancia de la confiabilidad de las pruebas automatizadas, la correcta interacción con los elementos de la aplicación y la importancia de realizar validaciones después de ejecutar las acciones.

---

# Reporte HTML de Playwright

Después de ejecutar las pruebas se puede visualizar el reporte generado por Playwright mediante:

```bash
npx playwright show-report
```

El reporte permite visualizar:

- Tests ejecutados.
- Tests aprobados.
- Tests fallidos.
- Duración de las pruebas.
- Detalles de cada prueba.
- Evidencias generadas durante la ejecución.

---

# Ejecutar todas las pruebas

Para ejecutar todos los tests desarrollados en el proyecto:

```bash
npx playwright test
```

Para ejecutar todos los tests mostrando el navegador:

```bash
npx playwright test --headed
```

Para ejecutar las pruebas utilizando la interfaz gráfica:

```bash
npx playwright test --ui
```

Para visualizar el reporte:

```bash
npx playwright show-report
```

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
├── tareas/
│   └── tarea-04.md
│
├── tests/
│   ├── clase01.spec.ts
│   ├── clase02.spec.ts
│   ├── clase03.spec.ts
│   └── clase04.spec.ts
│
├── README.md
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

---

# Instalación del proyecto

Para instalar las dependencias del proyecto se debe ejecutar:

```bash
npm install
```

Si es la primera vez que se utiliza Playwright en el equipo, también se pueden instalar los navegadores mediante:

```bash
npx playwright install
```

---

# Comandos principales

## Instalar dependencias

```bash
npm install
```

## Ejecutar todos los tests

```bash
npx playwright test
```

## Ejecutar Clase 01

```bash
npx playwright test tests/clase01.spec.ts
```

## Ejecutar Clase 02

```bash
npx playwright test tests/clase02.spec.ts
```

## Ejecutar Clase 03

```bash
npx playwright test tests/clase03.spec.ts
```

## Ejecutar Clase 04

```bash
npx playwright test tests/clase04.spec.ts
```

## Ejecutar mostrando el navegador

```bash
npx playwright test --headed
```

## Ejecutar utilizando la interfaz gráfica

```bash
npx playwright test --ui
```

## Mostrar el reporte HTML

```bash
npx playwright show-report
```

---

# Entrega Tarea 04

La entrega de la Tarea 04 contiene los elementos solicitados:

- Tests anteriores de Playwright.
- Tests de la Clase 04.
- 3 tests reto de la Tarea 04.
- Reflexión de la Tarea 04.
- README con instrucciones de ejecución.
- Evidencias de las pruebas realizadas.

Los archivos principales de la Tarea 04 son:

```text
tests/clase04.spec.ts
tareas/tarea-04.md
README.md
```

El enlace al repositorio de GitHub será entregado en Canvas de acuerdo con las instrucciones de la actividad.

---

# Estado del proyecto

| Elemento | Estado |
|---|---|
| Clase 01 | Completada |
| Clase 02 | Completada |
| Clase 03 | Completada |
| Tests Clase 03 | 9 tests |
| Caso de prueba TC-001 | Completado |
| Clase 04 | Completada |
| Tests Clase 04 | 7 tests |
| Tests reto Clase 04 | 3 tests |
| Reflexión Tarea 04 | Completada |
| README | Actualizado |
| Repositorio GitHub | Pendiente de actualización final |
| Entrega Canvas | Pendiente |

---

# Autor

**Cesar Ulises González Cardona**

**Universidad Mariano Gálvez de Guatemala**

**Curso: Aseguramiento de la Calidad del Software**