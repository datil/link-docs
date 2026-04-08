---
title: "Inventario"
sidebar_position: 9
---

Esta sección describe los endpoints del grupo **Inventario**. Base URL: `https://api.datil.co`.

:::info Esquemas JSON/XML
Los cuerpos y respuestas suelen modelarse como objeto genérico en OpenAPI. El detalle de campos está en las guías de producto y tablas del tutorial.
:::

## GET `/inventory/warehouses` — Lista bodegas

**Identificador de operación:** `getInventoryWarehouses`

**Autenticación:** `X-Api-Key` (header)


**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | OK | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://api.datil.co/inventory/warehouses' \
  -H 'X-Api-Key: TU_API_KEY'
```

## GET `/inventory/warehouses/{id}` — Consulta una bodega

**Identificador de operación:** `getInventoryWarehouseById`

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
curl -sS -X GET 'https://api.datil.co/inventory/warehouses/{id}' \
  -H 'X-Api-Key: TU_API_KEY'
```

## GET `/inventory/warehouses/locations/{id}` — Consulta bodega por punto de emisión (location)

**Identificador de operación:** `getInventoryWarehouseByLocationId`

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
curl -sS -X GET 'https://api.datil.co/inventory/warehouses/locations/{id}' \
  -H 'X-Api-Key: TU_API_KEY'
```

## GET `/inventory/warehouses/{warehouse_id}/stocks` — Lista existencias en bodega

**Identificador de operación:** `getInventoryWarehouseStocks`

**Autenticación:** `X-Api-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `warehouse_id` | path | string | sí | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | OK | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://api.datil.co/inventory/warehouses/{warehouse_id}/stocks' \
  -H 'X-Api-Key: TU_API_KEY'
```

## GET `/inventory/warehouses/{warehouse_id}/stocks/{item_id}` — Consulta existencias de un ítem en bodega

**Identificador de operación:** `getInventoryWarehouseStockByItem`

**Autenticación:** `X-Api-Key` (header)

**Parámetros**

| Nombre | En | Tipo | Requerido | Descripción |
| --- | --- | --- | --- | --- |
| `warehouse_id` | path | string | sí | — |
| `item_id` | path | string | sí | — |

**Respuestas**

| Código | Descripción | Content-Type |
| --- | --- | --- |
| `200` | OK | application/json |
**Ejemplo (curl)**

```bash
curl -sS -X GET 'https://api.datil.co/inventory/warehouses/{warehouse_id}/stocks/{item_id}' \
  -H 'X-Api-Key: TU_API_KEY'
```

## POST `/inventory/input` — Entrada de inventario

**Identificador de operación:** `postInventoryInput`

**Autenticación:** `X-Api-Key` (header)

:::note Detalle
Los ejemplos cURL usan `/inventory/input` (singular). El título en Slate indica `POST /inventory/inputs`.
:::


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
curl -sS -X POST 'https://api.datil.co/inventory/input' \
  -H 'X-Api-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

## POST `/inventory/output` — Salida de inventario

**Identificador de operación:** `postInventoryOutput`

**Autenticación:** `X-Api-Key` (header)

:::note Detalle
Ruta canónica asumida `/inventory/output`. Un ejemplo cURL en la sección «Salida» del Slate reutiliza erróneamente `/inventory/input`.
:::


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
curl -sS -X POST 'https://api.datil.co/inventory/output' \
  -H 'X-Api-Key: TU_API_KEY' -H 'X-Password: TU_PASSWORD' -H 'Content-Type: application/json' \
  -d '{}'
```

