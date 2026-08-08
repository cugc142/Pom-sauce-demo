# Tarea 04 - Reflexión sobre Playwright

## ¿Cuál principio es más importante y por qué?

Considero que el principio más importante al realizar pruebas automatizadas es la confiabilidad de las pruebas. Una prueba automatizada debe ejecutarse de manera consistente y producir resultados que permitan determinar si una funcionalidad está funcionando correctamente.

En Playwright, esto es importante porque las pruebas interactúan directamente con la aplicación como lo haría un usuario. Acciones como `click()`, `fill()`, `clear()` y las diferentes validaciones permiten comprobar el comportamiento de la aplicación.

También es importante utilizar localizadores adecuados y realizar las validaciones correspondientes después de cada acción. No basta con ejecutar una acción; es necesario comprobar que el resultado obtenido sea el esperado.

Por esta razón, considero que la confiabilidad es el principio más importante. Una prueba que se ejecuta correctamente, pero que no permite determinar con seguridad si la funcionalidad funciona, no aporta suficiente valor al proceso de aseguramiento de la calidad del software.