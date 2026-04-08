---
title: "Edocs"
sidebar_position: 7
---

Esta sección describe los endpoints del grupo **Edocs**. Base URL: `https://link.datil.co`.

:::tip Guía relacionada
En la documentación general: [Consulta de documentos](/docs/advconf/doc-query).
:::

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## POST `/edocs/{id}/issue` — Autorizar comprobante

**Identificador de operación:** `postEdocsIssue`

**Autenticación:** `X-Key` (header) + `X-Password` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `id` | path | string | sí | ID del documento |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | Estado de autorización | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X POST 'https://link.datil.co/edocs/{id}/issue' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## GET `/edocs/{id}` — Consulta de autorización

**Identificador de operación:** `getEdocById`

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
curl -sS -X GET 'https://link.datil.co/edocs/{id}' \
  -H 'X-Key: TU_API_KEY'
```

## POST `/edocs/send-email/{id}` — Envío de comprobante por correo

**Identificador de operación:** `postEdocsSendEmail`

**Autenticación:** `X-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `id` | path | string | sí | — |

**Cuerpo de la petición**

| Origen | Content-Type | Requerido | Esquema |
| --- | --- | --- | --- |
| Cuerpo | application/json | no | `JsonObject` |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | OK | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X POST 'https://link.datil.co/edocs/send-email/{id}' \
  -H 'X-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

