---
title: "Facturas"
sidebar_position: 1
---

Esta sección describe los endpoints del grupo **Facturas**. Base URL: `https://link.datil.co`.

:::tip Guía relacionada
En la documentación general: [Configuración avanzada — Facturas](/docs/advconf/invoice).
:::

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## POST `/invoices/issue` — Emite una factura (JSON)

**Identificador de operación:** `postInvoicesIssue`

**Autenticación:** `X-Key` (header) + `X-Password` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `Idempotency-key` | header | string | no | Clave de idempotencia (UUID v4 o nano-id). Emisión y re-emisión de facturas. |

**Cuerpo de la petición**

| Origen | Content-Type | Requerido | Esquema |
| --- | --- | --- | --- |
| Cuerpo | application/json | sí | `JsonObject` |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | Respuesta de emisión (estado inicial del comprobante). | application/json |
| `400` | Solicitud incorrecta | application/json |
| `401` | No autorizado | — |
**Ejemplo (curl)**

```bash
curl -sS -X POST 'https://link.datil.co/invoices/issue' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## POST `/invoices/issue/xml` — Emite una factura (XML)

**Identificador de operación:** `postInvoicesIssueXml`

**Autenticación:** `X-Key` (header) + `X-Password` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `Idempotency-key` | header | string | no | Clave de idempotencia (UUID v4 o nano-id). Emisión y re-emisión de facturas. |

**Cuerpo de la petición**

| Origen | Content-Type | Requerido | Esquema |
| --- | --- | --- | --- |
| Cuerpo | application/xml | sí | `XmlBody` |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | OK | application/json |
| `400` | Solicitud incorrecta | — |
**Ejemplo (curl)**

```bash
curl -sS -X POST 'https://link.datil.co/invoices/issue/xml' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## GET `/invoices/{id}` — Consulta una factura

**Identificador de operación:** `getInvoiceById`

**Autenticación:** `X-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `id` | path | string | sí | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | Factura encontrada | application/json |
| `404` | No encontrado | — |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://link.datil.co/invoices/{id}' \
  -H 'X-Key: TU_API_KEY'
```

## POST `/invoices/{id}/reissue` — Re-emite una factura

**Identificador de operación:** `postInvoiceReissue`

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
curl -sS -X POST 'https://link.datil.co/invoices/{id}/reissue' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## POST `/invoices` — Crea una factura (sin emitir según flujo documentado)

**Identificador de operación:** `postInvoicesCreate`

**Autenticación:** `X-Key` (header) + `X-Password` (header)


**Cuerpo de la petición**

| Origen | Content-Type | Requerido | Esquema |
| --- | --- | --- | --- |
| Cuerpo | application/json | sí | `JsonObject` |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | Objeto factura con `id` y `clave_acceso` cuando aplica | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X POST 'https://link.datil.co/invoices' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

