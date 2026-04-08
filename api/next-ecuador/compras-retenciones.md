---
title: "Compras — retenciones"
sidebar_position: 8
---

Esta sección describe los endpoints del grupo **Compras — retenciones**. Base URL: `https://api.datil.co`.

:::tip Guía relacionada
En la documentación general: [Retenciones](/docs/advconf/ats-retention).
:::

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## POST `/purchases/withholdings/issues` — Emite retención de compra

**Identificador de operación:** `postPurchasesWithholdingsIssues`

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
curl -sS -X POST 'https://api.datil.co/purchases/withholdings/issues' \
  -H 'X-Api-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## GET `/purchases/withholdings/{id}` — Consulta retención de compra

**Identificador de operación:** `getPurchasesWithholdingById`

**Autenticación:** `X-Api-Key` (header)

:::note Detalle
Usar `GET /purchases/withholdings/{id}`; un ejemplo cURL en Slate apunta a `/withholdings/{id}` (posible error de documentación).
:::

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
curl -sS -X GET 'https://api.datil.co/purchases/withholdings/{id}' \
  -H 'X-Api-Key: TU_API_KEY'
```

## GET `/purchases/withholdings` — Lista retenciones de compra

**Identificador de operación:** `getPurchasesWithholdings`

**Autenticación:** `X-Api-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `customer_tax_identification` | query | string | no | — |
| `page_size` | query | integer | no | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | Result set | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://api.datil.co/purchases/withholdings' \
  -H 'X-Api-Key: TU_API_KEY'
```

## POST `/purchases/withholdings/{id}/reissues` — Re-emite retención de compra

**Identificador de operación:** `postPurchasesWithholdingReissues`

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
curl -sS -X POST 'https://api.datil.co/purchases/withholdings/{id}/reissues' \
  -H 'X-Api-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

