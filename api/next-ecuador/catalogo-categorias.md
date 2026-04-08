---
title: "Catálogo — categorías"
sidebar_position: 2
---

Esta sección describe los endpoints del grupo **Catálogo — categorías**. Base URL: `https://api.datil.co`.

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## GET `/catalog/categories` — Lista categorías

**Identificador de operación:** `getCatalogCategories`

**Autenticación:** `X-Api-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `ids` | query | string | no | — |
| `name` | query | string | no | — |
| `page_size` | query | integer | no | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | OK | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://api.datil.co/catalog/categories' \
  -H 'X-Api-Key: TU_API_KEY'
```

## POST `/catalog/categories` — Crea una categoría

**Identificador de operación:** `postCatalogCategories`

**Autenticación:** `X-Api-Key` (header)


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
curl -sS -X POST 'https://api.datil.co/catalog/categories' \
  -H 'X-Api-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## GET `/catalog/categories/{id}` — Consulta una categoría

**Identificador de operación:** `getCatalogCategoryById`

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
curl -sS -X GET 'https://api.datil.co/catalog/categories/{id}' \
  -H 'X-Api-Key: TU_API_KEY'
```

## PUT `/catalog/categories/{id}` — Actualiza una categoría

**Identificador de operación:** `putCatalogCategoryById`

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
curl -sS -X PUT 'https://api.datil.co/catalog/categories/{id}' \
  -H 'X-Api-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## DELETE `/catalog/categories/{id}` — Elimina una categoría

**Identificador de operación:** `deleteCatalogCategoryById`

**Autenticación:** `X-Api-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `id` | path | string | sí | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `204` | Sin contenido | — |
**Ejemplo (curl)**

```bash
curl -sS -X DELETE 'https://api.datil.co/catalog/categories/{id}' \
  -H 'X-Api-Key: TU_API_KEY'
```

