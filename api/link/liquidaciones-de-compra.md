---
title: "Liquidaciones de compra"
sidebar_position: 6
---

Esta sección describe los endpoints del grupo **Liquidaciones de compra**. Base URL: `https://link.datil.co`.

:::tip Guía relacionada
En la documentación general: [Liquidaciones de compra](/docs/advconf/purch-settlement).
:::

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## POST `/purchase-settlements/issue` — Emite liquidación de compra (JSON)

**Identificador de operación:** `postPurchaseSettlementsIssue`

**Autenticación:** `X-Key` (header) + `X-Password` (header)


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
curl -sS -X POST 'https://link.datil.co/purchase-settlements/issue' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## POST `/purchase-settlements/issue/xml` — Emite liquidación de compra (XML)

**Identificador de operación:** `postPurchaseSettlementsIssueXml`

**Autenticación:** `X-Key` (header) + `X-Password` (header)


**Cuerpo de la petición**

| Origen | Content-Type | Requerido | Esquema |
| --- | --- | --- | --- |
| Cuerpo | application/xml | sí | `XmlBody` |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | OK | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X POST 'https://link.datil.co/purchase-settlements/issue/xml' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## GET `/purchase-settlements/{id}` — Consulta liquidación de compra

**Identificador de operación:** `getPurchaseSettlementById`

**Autenticación:** `X-Key` (header)

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
curl -sS -X GET 'https://link.datil.co/purchase-settlements/{id}' \
  -H 'X-Key: TU_API_KEY'
```

## POST `/purchase-settlements/{id}/reissue` — Re-emite liquidación de compra

**Identificador de operación:** `postPurchaseSettlementReissue`

**Autenticación:** `X-Key` (header) + `X-Password` (header)

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
curl -sS -X POST 'https://link.datil.co/purchase-settlements/{id}/reissue' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

