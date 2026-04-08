---
title: "Descargas"
sidebar_position: 10
---

Esta sección describe los endpoints del grupo **Descargas**. Base URL: `https://app.datil.co`.

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## GET `/ver/{id}/pdf` — Consulta RIDE (PDF)

**Identificador de operación:** `getVerPdf`

**Autenticación:** `X-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `id` | path | string | sí | ID del comprobante |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | PDF o redirección según implementación | application/pdf |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://app.datil.co/ver/{id}/pdf' \
  -H 'X-Key: TU_API_KEY'
```

## GET `/ver/{id}/xml` — Consulta XML del comprobante

**Identificador de operación:** `getVerXml`

**Autenticación:** `X-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `id` | path | string | sí | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | XML | application/xml |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://app.datil.co/ver/{id}/xml' \
  -H 'X-Key: TU_API_KEY'
```

