---
title: "Catálogo — productos"
sidebar_position: 1
---

Esta sección describe los endpoints del grupo **Catálogo — productos**. Base URL: `https://api.datil.co`.

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## GET `/catalog/products` — Lista productos

**Identificador de operación:** `getCatalogProducts`

**Autenticación:** `X-Api-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `ids` | query | string | no | IDs separados por coma |
| `category_id` | query | string | no | — |
| `sku` | query | string | no | — |
| `name` | query | string | no | — |
| `track_inventory` | query | boolean | no | — |
| `page_size` | query | integer | no | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | Result set de productos | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://api.datil.co/catalog/products' \
  -H 'X-Api-Key: TU_API_KEY'
```

## POST `/catalog/products` — Crea un producto

**Identificador de operación:** `postCatalogProducts`

**Autenticación:** `X-Api-Key` (header)


**Cuerpo de la petición**

| Origen | Content-Type | Requerido | Esquema |
| --- | --- | --- | --- |
| Cuerpo | application/json | sí | `JsonObject` |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | Producto creado | application/json |
| `201` | Creado | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X POST 'https://api.datil.co/catalog/products' \
  -H 'X-Api-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## GET `/catalog/products/{id}` — Consulta un producto

**Identificador de operación:** `getCatalogProductById`

**Autenticación:** `X-Api-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `id` | path | string | sí | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | OK | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://api.datil.co/catalog/products/{id}' \
  -H 'X-Api-Key: TU_API_KEY'
```

## PUT `/catalog/products/{id}` — Actualiza un producto

**Identificador de operación:** `putCatalogProductById`

**Autenticación:** `X-Api-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `id` | path | string | sí | — |

**Cuerpo de la petición**

| Origen | Content-Type | Requerido | Esquema |
| --- | --- | --- | --- |
| Cuerpo | application/json | sí | `JsonObject` |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | OK | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X PUT 'https://api.datil.co/catalog/products/{id}' \
  -H 'X-Api-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## DELETE `/catalog/products/{id}` — Elimina un producto

**Identificador de operación:** `deleteCatalogProductById`

**Autenticación:** `X-Api-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `id` | path | string | sí | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | OK | — |
| `204` | Sin contenido | — |
**Ejemplo (curl)**

```bash
curl -sS -X DELETE 'https://api.datil.co/catalog/products/{id}' \
  -H 'X-Api-Key: TU_API_KEY'
```

