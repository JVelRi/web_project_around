# Around The U.S. — Integración de la API

Proyecto del sprint "Alrededor de los EE.UU." de TripleTen (`web_project_around`). Es una galería de tarjetas de lugares conectada al servidor de TripleTen.

## Descripción

La página permite:

- Cargar desde la API el perfil del usuario y las tarjetas.
- Editar el nombre y la descripción del perfil.
- Actualizar la foto de perfil (el icono de editar aparece al pasar el cursor sobre ella).
- Agregar tarjetas nuevas con imagen y título.
- Dar y quitar "me gusta" a las tarjetas.
- Eliminar las tarjetas propias, con una ventana emergente de confirmación.
- Ver las imágenes ampliadas en una ventana emergente.
- Ver el texto "Guardando..." en los botones de los formularios mientras se envían los datos.

## Tecnologías y técnicas

- TypeScript, HTML5 y CSS3.
- Programación orientada a objetos con clases ES6, cada una en su propio archivo: `Api`, `Card`, `Section`, `Popup`, `PopupWithForm`, `PopupWithImage`, `PopupWithConfirmation`, `UserInfo` y `FormValidator`.
- Peticiones a la API con `fetch` y `async/await`, comprobación de `res.ok` y manejo de errores con `try...catch`.
- `Promise.all()` para cargar el perfil y las tarjetas en paralelo; las tarjetas se muestran solo después de recibir el `_id` del usuario.
- Interfaces separadas para los datos que se envían desde los formularios y los que devuelve la API (por ejemplo `CardFormData` y `CardData`), reunidas en `src/utils/types.ts`.
- Bajo acoplamiento entre clases: ninguna crea instancias de otras, y la lógica que las une está en `index.ts`.
- Validación de formularios con `FormValidator`.

## Migración de JavaScript a TypeScript

El proyecto comenzó como HTML, CSS y JavaScript plano, con toda la lógica en funciones globales dentro de `scripts/index.js` y `scripts/validate.js`. Se refactorizó a TypeScript con Programación Orientada a Objetos:

- Las funciones sueltas de validación se encapsularon en la clase `FormValidator`, configurable mediante un objeto (`defaultFormConfig`) en vez de tener clases CSS "quemadas" en el código.
- La creación manual de tarjetas con `document.createElement`/plantillas se reemplazó por las clases `Card` (una tarjeta) y `Section` (una lista de elementos renderizados).
- El manejo de ventanas emergentes se reorganizó en una jerarquía de herencia: `Popup` (clase base: abrir/cerrar, Esc, clic fuera) con tres clases hijas, `PopupWithImage`, `PopupWithForm` y `PopupWithConfirmation`.
- La información del perfil del usuario se encapsuló en la clase `UserInfo`.
- Las solicitudes al servidor se concentraron en la clase `Api`.
- El proyecto se reestructuró en dos carpetas: `src/` (código fuente en `.ts`) y `public/` (HTML, CSS, imágenes y el `.js` que genera el compilador). Al ejecutar `tsc`, se compila todo `src/` hacia `public/` según `tsconfig.json`.
- `index.ts` se limita a crear las instancias de las clases y a conectarlas entre sí (handlers y llamadas a `Api`); la lógica propia de cada tarea vive dentro de su clase.
