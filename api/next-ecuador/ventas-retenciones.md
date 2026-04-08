---
title: "Ventas — retenciones"
sidebar_position: 5
---

Esta sección describe los endpoints del grupo **Ventas — retenciones**. Base URL: `https://api.datil.co`.

:::tip Guía relacionada
En la documentación general: [Retenciones](/docs/advconf/ats-retention).
:::

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## GET `/sales/withholding` — Lista retenciones de venta recibidas

**Identificador de operación:** `getSalesWithholdingList`

**Autenticación:** `X-Api-Key` (header)

:::note Detalle
La documentación Slate usa `GET /sales/withholding` en los ejemplos cURL (singular).
El índice enlaza `GET /sales/withholdings`; verificar en backend cuál aplica.
:::

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `issuer_tax_identification` | query | string | no | — |
| `issue_from` | query | string | no | — |
| `issue_to` | query | string | no | — |
| `sequence_from` | query | string | no | — |
| `sequence_to` | query | string | no | — |
| `issuer_locations_codes` | query | string | no | — |
| `issuer_location_points_of_sale_codes` | query | string | no | — |
| `select_keys` | query | string | no | — |
| `page_size` | query | integer | no | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | Result set | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://api.datil.co/sales/withholding' \
  -H 'X-Api-Key: TU_API_KEY'
```

