---
title: "Notas de débito"
sidebar_position: 3
---

Esta sección describe los endpoints del grupo **Notas de débito**. Base URL: `https://link.datil.co`.

:::tip Guía relacionada
En la documentación general: [Notas de débito](/docs/advconf/debit-note).
:::

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## POST `/debit-notes/issue` — Emite nota de débito (JSON)

**Identificador de operación:** `postDebitNotesIssue`

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
curl -sS -X POST 'https://link.datil.co/debit-notes/issue' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## POST `/debit-notes/issue/xml` — Emite nota de débito (XML)

**Identificador de operación:** `postDebitNotesIssueXml`

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
curl -sS -X POST 'https://link.datil.co/debit-notes/issue/xml' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## GET `/debit-notes/{id}` — Consulta nota de débito

**Identificador de operación:** `getDebitNoteById`

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
curl -sS -X GET 'https://link.datil.co/debit-notes/{id}' \
  -H 'X-Key: TU_API_KEY'
```

## POST `/debit-notes/{id}/reissue` — Re-emite nota de débito

**Identificador de operación:** `postDebitNoteReissue`

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
curl -sS -X POST 'https://link.datil.co/debit-notes/{id}/reissue' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

