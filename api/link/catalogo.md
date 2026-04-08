---
title: "Catálogo"
sidebar_position: 9
---

Esta sección describe los endpoints del grupo **Catálogo**. Base URL: `https://link.datil.co`.

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## GET `/catalog/id-types` — Tipos de identificación

**Identificador de operación:** `getCatalogIdTypes`

**Autenticación:** `X-Key` (header)


**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | OK | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://link.datil.co/catalog/id-types' \
  -H 'X-Key: TU_API_KEY'
```

## GET `/catalog/withholdings-tax-rates/{tipo_impuesto}` — Tasas de retención por tipo de impuesto

**Identificador de operación:** `getCatalogWithholdingsTaxRates`

**Autenticación:** `X-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `tipo_impuesto` | path | string | sí | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | OK | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://link.datil.co/catalog/withholdings-tax-rates/{tipo_impuesto}' \
  -H 'X-Key: TU_API_KEY'
```

## GET `/catalog/document-types` — Tipos de documento

**Identificador de operación:** `getCatalogDocumentTypes`

**Autenticación:** `X-Key` (header)


**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | OK | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://link.datil.co/catalog/document-types' \
  -H 'X-Key: TU_API_KEY'
```

## GET `/catalog/sales-tax-rates/{tipo_impuesto}` — Tasas de IVA u otros por tipo de impuesto

**Identificador de operación:** `getCatalogSalesTaxRates`

**Autenticación:** `X-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `tipo_impuesto` | path | string | sí | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | OK | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://link.datil.co/catalog/sales-tax-rates/{tipo_impuesto}' \
  -H 'X-Key: TU_API_KEY'
```

