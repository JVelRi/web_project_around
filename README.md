# Tripleten web_project_around

Proyecto del sprint "Alrededor de los EE.UU." de TripleTen. Es una galería de tarjetas de lugares donde puedes editar tu perfil, agregar nuevas tarjetas con imagen y título, darles "me gusta", eliminarlas y ver la imagen ampliada en un popup.

## Funcionalidad

- Edición del nombre y la descripción del perfil.
- Agregar nuevas tarjetas (título + URL de imagen).
- Dar "me gusta" y eliminar tarjetas.
- Ver la imagen de una tarjeta ampliada en un popup.
- Validación en tiempo real de los formularios (longitud de texto, campos obligatorios, formato de URL).
- Los popups se cierran con el botón "×", haciendo clic fuera de ellos, o con la tecla Esc.

## Tecnologías y técnicas utilizadas

- HTML5 semántico y metodología BEM para las clases CSS.
- CSS con variables e importaciones modulares por bloque.
- TypeScript con Programación Orientada a Objetos: el proyecto está organizado en clases independientes y reutilizables (`FormValidator`, `Card`, `Section`, `Popup`, `PopupWithImage`, `PopupWithForm`, `UserInfo`), cada una con una única responsabilidad.
- `tsc` compila el código fuente de `src/` hacia `public/`, que es la carpeta que se sirve en el navegador.

## Migración de JavaScript a TypeScript

El proyecto comenzó como HTML, CSS y JavaScript plano, con toda la lógica en funciones globales dentro de `scripts/index.js` y `scripts/validate.js`. Se refactorizó a TypeScript con Programación Orientada a Objetos:

- Las funciones sueltas de validación se encapsularon en la clase `FormValidator`, configurable mediante un objeto (`defaultFormConfig`) en vez de tener clases CSS "quemadas" en el código.
- La creación manual de tarjetas con `document.createElement`/plantillas se reemplazó por las clases `Card` (una tarjeta) y `Section` (una lista de elementos renderizados).
- El manejo de ventanas emergentes se reorganizó en una jerarquía de herencia: `Popup` (clase base, abrir/cerrar, Esc, clic fuera) con dos clases hijas, `PopupWithImage` y `PopupWithForm`.
- La información del perfil del usuario se encapsuló en la clase `UserInfo`.
- El proyecto se reestructuró en dos carpetas: `src/` (código fuente en `.ts`) y `public/` (HTML, CSS, imágenes, y el `.js` que genera el compilador). `tsc` compila automáticamente todo `src/` hacia `public/` según `tsconfig.json`.
- `index.ts` quedó reducido a solo instanciar las clases y conectar los listeners entre ellas — toda la lógica vive dentro de cada clase.
