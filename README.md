# Link Docs

Documentación para la aplicación **Link** de Dátil: integración de sistemas contables/ERP con facturación electrónica.

Este repositorio contiene el sitio web construido con Docusaurus, junto con las guías y referencias necesarias para instalar, configurar y operar Link.

## Qué incluye

- `docs/`: documentación principal sobre instalación, configuración, tablas de Control y Mensaje, operación y compatibilidad.
- `api/`: documentación de API generada con el plugin de Docusaurus para OpenAPI.
- `docusaurus.config.js`: configuración del sitio, navegación y temas.
- `sidebars.js` y `sidebarsApi.js`: definición de los menús laterales de la documentación.
- `src/`: recursos y estilos personalizados del sitio.
- `static/`: imágenes y archivos estáticos usados por la web.

## Secciones importantes

- `docs/intro.md`: introducción general a Link y su flujo de emisión.
- `docs/guia-primer-dia.md`: pasos iniciales para dejar Link funcionando.
- `docs/compatibility/`: requisitos de compatibilidad y base de datos.
- `docs/configuration/`: configuración de `environment.ini`, `company.ini`, `receipt.ini` y más.
- `docs/tables/`: estructura y uso de las tablas `Control` y `Mensaje`.
- `docs/advconf/`: configuración avanzada por tipo de comprobante.
- `docs/operation.md`: operación del servicio y solución de problemas.

## Requisitos

- Node.js `>=20.0`
- Yarn
- Docusaurus `3.9.2`

## Desarrollo local

```bash
yarn

yarn start
```

Abre un servidor local y actualiza el sitio en caliente al editar los archivos.

## Compilar el sitio

```bash
yarn build
```

Genera el sitio estático en el directorio `build`.

## Servir el sitio compilado

```bash
yarn serve
```

## Despliegue

Si quieres publicar el sitio con Docusaurus, usa:

```bash
USE_SSH=true yarn deploy
```

O, si no usas SSH:

```bash
GIT_USER=<tu_usuario> yarn deploy
```

## Notas útiles

- La documentación está en español.
- La configuración de `receipt.ini` controla cómo Link lee/escribe en `Control` y `Mensaje`.
- La configuración de `environment.ini` define conexión de base datos, programación de tareas, logs y sincronización.
- Cada tipo de comprobante se configura con su propio archivo en `config/receipts/`.

## Contribuir

Edita los archivos dentro de `docs/` y `api/`, y actualiza `docusaurus.config.js` o los sidebars si agregas nuevas secciones.

> Actualiza `docusaurus.config.js` si cambias la navegación, el título del sitio o el logo.
