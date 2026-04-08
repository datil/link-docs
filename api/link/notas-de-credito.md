---
title: "Notas de crédito"
sidebar_position: 2
---

Esta sección describe los endpoints del grupo **Notas de crédito**. Base URL: `https://link.datil.co`.

:::tip Guía relacionada
En la documentación general: [Notas de crédito](/docs/advconf/credit-note).
:::

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## POST `/credit-notes/issue` — Emite nota de crédito (JSON)

**Identificador de operación:** `postCreditNotesIssue`

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
curl -sS -X POST 'https://link.datil.co/credit-notes/issue' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## POST `/credit-notes/issue/xml` — Emite nota de crédito (XML)

**Identificador de operación:** `postCreditNotesIssueXml`

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
curl -sS -X POST 'https://link.datil.co/credit-notes/issue/xml' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## GET `/credit-notes/{id}` — Consulta nota de crédito

**Identificador de operación:** `getCreditNoteById`

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
curl -sS -X GET 'https://link.datil.co/credit-notes/{id}' \
  -H 'X-Key: TU_API_KEY'
```

## POST `/credit-notes/{id}/reissue` — Re-emite nota de crédito

**Identificador de operación:** `postCreditNoteReissue`

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
curl -sS -X POST 'https://link.datil.co/credit-notes/{id}/reissue' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

