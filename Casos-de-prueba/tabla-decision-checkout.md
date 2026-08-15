# Tabla de Decisión - Checkout en Sauce Demo

## 1. Objetivo

Validar el comportamiento del proceso de checkout en Sauce Demo considerando diferentes combinaciones de condiciones relacionadas con el inicio de sesión, la existencia de productos en el carrito y la información requerida para completar la compra.

La tabla de decisión permite identificar los diferentes escenarios que pueden presentarse durante el proceso de checkout y establecer el resultado esperado para cada combinación de condiciones.

## 2. Condiciones

Para construir la tabla de decisión se establecen las siguientes condiciones:

| ID | Condición |
|---|---|
| C1 | El usuario está autenticado |
| C2 | El carrito contiene al menos un producto |
| C3 | El nombre del comprador está ingresado |
| C4 | El código postal está ingresado |

## 3. Reglas de decisión

Se establecen seis reglas para representar diferentes escenarios del proceso de checkout.

| Condición / Regla | R1 | R2 | R3 | R4 | R5 | R6 |
|---|---:|---:|---:|---:|---:|---:|
| C1 - Usuario autenticado | Sí | Sí | Sí | Sí | No | Sí |
| C2 - Carrito con productos | Sí | No | Sí | Sí | Sí | Sí |
| C3 - Nombre ingresado | Sí | Sí | No | Sí | Sí | Sí |
| C4 - Código postal ingresado | Sí | Sí | Sí | No | Sí | Sí |
| **Resultado esperado** | Checkout disponible | Carrito vacío | Solicitar nombre | Solicitar código postal | No permitir checkout | Continuar con checkout |

## 4. Descripción de las reglas

### Regla 1 - Usuario autenticado con productos

**Condiciones:**

- El usuario está autenticado.
- Existe al menos un producto en el carrito.
- El nombre está ingresado.
- El código postal está ingresado.

**Resultado esperado:**

El sistema permite acceder al proceso de checkout.

El botón **Checkout** debe estar visible y habilitado.

### Regla 2 - Usuario autenticado sin productos

**Condiciones:**

- El usuario está autenticado.
- El carrito no contiene productos.
- El nombre está ingresado.
- El código postal está ingresado.

**Resultado esperado:**

El carrito debe mostrarse vacío y no debe existir ningún producto disponible para continuar con la compra.

### Regla 3 - Nombre del comprador vacío

**Condiciones:**

- El usuario está autenticado.
- Existe al menos un producto en el carrito.
- El nombre del comprador no está ingresado.
- El código postal está ingresado.

**Resultado esperado:**

El sistema debe solicitar el nombre antes de permitir continuar con el proceso de checkout.

### Regla 4 - Código postal vacío

**Condiciones:**

- El usuario está autenticado.
- Existe al menos un producto en el carrito.
- El nombre del comprador está ingresado.
- El código postal no está ingresado.

**Resultado esperado:**

El sistema debe solicitar el código postal antes de permitir continuar con el proceso de checkout.

### Regla 5 - Usuario no autenticado

**Condiciones:**

- El usuario no está autenticado.
- Existe un producto en el carrito.
- El nombre está ingresado.
- El código postal está ingresado.

**Resultado esperado:**

El sistema no debe permitir el acceso al proceso de checkout sin autenticación.

### Regla 6 - Datos completos para continuar

**Condiciones:**

- El usuario está autenticado.
- Existe al menos un producto en el carrito.
- El nombre está ingresado.
- El código postal está ingresado.

**Resultado esperado:**

El sistema permite continuar con el proceso de checkout y mostrar la información correspondiente para completar la compra.

## 5. Casos de prueba derivados

| ID | Regla | Escenario | Resultado esperado |
|---|---|---|---|
| TC-01 | R1 | Usuario autenticado con productos | Checkout visible y habilitado |
| TC-02 | R2 | Usuario autenticado sin productos | Carrito vacío |
| TC-03 | R3 | Nombre vacío | Solicitar nombre |
| TC-04 | R4 | Código postal vacío | Solicitar código postal |
| TC-05 | R5 | Usuario no autenticado | No permitir acceso al checkout |
| TC-06 | R6 | Datos completos | Permitir continuar con checkout |


## 6. Relación con las pruebas automatizadas

Las reglas de esta tabla se relacionan con las pruebas automatizadas desarrolladas en `tests/clase05.spec.ts`.

### Regla 1

Está representada mediante la prueba:

```text
Tabla de decisión - Regla 1: logueado con items -> puede pagar