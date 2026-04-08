---
title: Introducción
sidebar_position: 1
description: Referencia HTTP de las APIs Link y Next Ecuador, generada a partir de OpenAPI.
---

Esta sección recoge los **endpoints REST** descritos en los archivos OpenAPI del repositorio. Está pensada como **índice operativo**: método, ruta, parámetros, cabeceras y códigos de respuesta. El detalle de negocio (campos de factura, impuestos, tablas, etc.) sigue en el [tutorial](/docs/intro) y en las guías de configuración avanzada.

:::tip Regenerar la referencia
Si cambian los YAML, ejecuta `npm run generate-api-docs` para volver a generar las páginas bajo `api/link` y `api/next-ecuador`.
:::

## Dos APIs

| API | Base URL | Uso principal |
| --- | --- | --- |
| **Link** | `https://link.datil.co` | Emisión y consulta de comprobantes electrónicos (facturas, notas, retenciones, guías, etc.). |
| **Next (Ecuador)** | `https://api.datil.co` | Catálogo, ventas, compras e inventario (productos, facturas de venta/compra, bodegas, movimientos). |

Algunas operaciones de **descarga** (PDF/XML) usan **`https://app.datil.co`**; lo indica cada página del grupo correspondiente.

## Autenticación

| API | Cabecera de API key | Contraseña de certificado (emisión) |
| --- | --- | --- |
| Link | `X-Key` | `X-Password` (donde la operación lo requiera) |
| Next Ecuador | `X-Api-Key` | `X-Password` (donde la operación lo requiera) |

:::caution Claves
No incluyas claves reales en código de ejemplo ni en issues públicos.
:::

## Idempotencia (solo Link)

En **Link**, las operaciones de **emisión y re-emisión** pueden aceptar la cabecera opcional **`Idempotency-key`** (16–48 caracteres, p. ej. UUID v4 o nano-id), para evitar duplicados ante reintentos. Aparece en las tablas de parámetros de cada endpoint que la define.

## Navegación

- **[API Link (link.datil.co)](./link/facturas)** — facturas, notas, retenciones, guías, liquidaciones, edocs, webhooks, catálogo, descargas (índice de categoría en la barra lateral).
- **[API Next Ecuador (api.datil.co)](./next-ecuador/catalogo-productos)** — catálogo (productos y categorías), ventas, compras, inventario (índice en la barra lateral).
