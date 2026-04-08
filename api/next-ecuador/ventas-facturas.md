---
title: "Ventas — facturas"
sidebar_position: 3
---

Esta sección describe los endpoints del grupo **Ventas — facturas**. Base URL: `https://api.datil.co`.

:::tip Guía relacionada
En la documentación general: [Facturas](/docs/advconf/invoice).
:::

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## POST `/sales/invoices/issues` — Emite una factura de venta

**Identificador de operación:** `postSalesInvoicesIssues`

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
curl -sS -X POST 'https://api.datil.co/sales/invoices/issues' \
  -H 'X-Api-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## GET `/sales/invoices/{id}` — Consulta una factura de venta

**Identificador de operación:** `getSalesInvoiceById`

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
curl -sS -X GET 'https://api.datil.co/sales/invoices/{id}' \
  -H 'X-Api-Key: TU_API_KEY'
```

## GET `/sales/invoices` — Lista facturas de venta

**Identificador de operación:** `getSalesInvoices`

**Autenticación:** `X-Api-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `customer_tax_identification` | query | string | no | — |
| `issue_from` | query | string | no | — |
| `issue_to` | query | string | no | — |
| `sequence_from` | query | string | no | — |
| `sequence_to` | query | string | no | — |
| `supplier_locations_codes` | query | string | no | — |
| `supplier_location_points_of_sale_codes` | query | string | no | — |
| `select_keys` | query | string | no | — |
| `page_size` | query | integer | no | — |
| `order_by` | query | string | no | — |
| `environment` | query | string | no | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | Result set | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://api.datil.co/sales/invoices' \
  -H 'X-Api-Key: TU_API_KEY'
```

## POST `/sales/invoices/{id}/reissues` — Re-emite una factura de venta

**Identificador de operación:** `postSalesInvoiceReissues`

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
curl -sS -X POST 'https://api.datil.co/sales/invoices/{id}/reissues' \
  -H 'X-Api-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## POST `/sales/invoices/{id}/payments` — Registra pagos sobre una factura

**Identificador de operación:** `postSalesInvoicePayments`

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
curl -sS -X POST 'https://api.datil.co/sales/invoices/{id}/payments' \
  -H 'X-Api-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

