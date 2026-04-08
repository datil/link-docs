---
title: "Compras — facturas"
sidebar_position: 6
---

Esta sección describe los endpoints del grupo **Compras — facturas**. Base URL: `https://api.datil.co`.

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## GET `/purchases/invoices` — Lista facturas de compra

**Identificador de operación:** `getPurchasesInvoices`

**Autenticación:** `X-Api-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `supplier_tax_identification` | query | string | no | — |
| `page_size` | query | integer | no | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | Result set | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://api.datil.co/purchases/invoices' \
  -H 'X-Api-Key: TU_API_KEY'
```

