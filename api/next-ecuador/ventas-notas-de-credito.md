---
title: "Ventas — notas de crédito"
sidebar_position: 4
---

Esta sección describe los endpoints del grupo **Ventas — notas de crédito**. Base URL: `https://api.datil.co`.

:::tip Guía relacionada
En la documentación general: [Notas de crédito](/docs/advconf/credit-note).
:::

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## POST `/sales/credit-notes/issues` — Emite nota de crédito de venta

**Identificador de operación:** `postSalesCreditNotesIssues`

**Autenticación:** `X-Api-Key` (header) + `X-Password` (header)


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
curl -sS -X POST 'https://api.datil.co/sales/credit-notes/issues' \
  -H 'X-Api-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## GET `/sales/credit-notes/{id}` — Consulta nota de crédito de venta

**Identificador de operación:** `getSalesCreditNoteById`

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
curl -sS -X GET 'https://api.datil.co/sales/credit-notes/{id}' \
  -H 'X-Api-Key: TU_API_KEY'
```

## GET `/sales/credit-notes` — Lista notas de crédito de venta

**Identificador de operación:** `getSalesCreditNotes`

**Autenticación:** `X-Api-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `customer_tax_identification` | query | string | no | — |
| `issue_from` | query | string | no | — |
| `issue_to` | query | string | no | — |
| `page_size` | query | integer | no | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | Result set | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://api.datil.co/sales/credit-notes' \
  -H 'X-Api-Key: TU_API_KEY'
```

## POST `/sales/credit-notes/{id}/reissues` — Re-emite nota de crédito de venta

**Identificador de operación:** `postSalesCreditNoteReissues`

**Autenticación:** `X-Api-Key` (header) + `X-Password` (header)

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
curl -sS -X POST 'https://api.datil.co/sales/credit-notes/{id}/reissues' \
  -H 'X-Api-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

