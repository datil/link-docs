---
title: Liquidaciones de compra
sidebar_position: 5
---

Los queries para la emisión electrónica de __liquidaciones de compra__ se guardan en el archivo de configuración `purchase_settlement.ini`.

[Ejemplo de archivo purchase_settlement.ini](../../static/config/receipts/purchase_settlement.ini)

### Cabecera

Obtiene información de la cabecera de la liquidación de compra

```sql
headers = SELECT
  id                      id_local,
  secuencial,
  fecha_emision,
  moneda,
  tipo_emision
  FROM
  liquidaciones_compra.liquidacion
  WHERE
  id in (:sequence)
  ORDER BY id :order
```

Campo |  Descripción | Valor de ejemplo
--------- | -----------| ---------
id_local | int o string | Identifica de manera única la liquidación de compra. __Requerido__
secuencial | string  | Número de secuencia de la liquidación. __Requerido__
fecha_emision | datetime  | Fecha en la que se emite la liquidación.
moneda | string  | Código [ISO](https://en.wikipedia.org/wiki/ISO_4217) de la moneda. __Requerido__
tipo_emision | int | Emisión normal: `1`. Emisión por indisponibilidad: `2` __Requerido__

### Emisor

Obitiene información del emisor de la liquidación de compra

```sql
purchase_settlement_buyer  = SELECT
  ruc,
  obligado_contabilidad,
  contribuyente_especial,
  nombre_comercial,
  razon_social,
  direccion_establecimiento,
  direccion_matriz              direccion_emisor,
  codigo_establecimiento        codigo,
  punto_emision
  FROM
  liquidaciones_compra.liquidacion
  WHERE
  id = ?
```

Campo |  Descripción | Valor de ejemplo
--------- | -----------| ---------
ruc | string | Número de RUC de 13 caracteres. __Requerido__
obligado_contabilidad | string | `'SI'` si está obligado a llevar contabilidad. `'NO'` si no lo está.
contribuyente_especial | string | Número de resolución. En blanco `''` si no es contribuyente especial.
nombre_comercial | string | Nombre comercial. Máximo 300 caracteres __Requerido__
razon_social | |
direccion_establecimiento | string | Dirección registrada en el SRI. Máximo 300 caracteres. __Requerido__
direccion_emisor | string | Dirección del punto de emisión. Máximo 300 caracteres. __Requerido__
codigo | string | Código numérico de 3 caracteres que representa al establecimiento. Ejemplo: `001` __Requerido__
punto_emision | string | Código numérico de 3 caracteres que representa al punto de emisión, o punto de venta. Ejemplo: `001`. __Requerido__

### Proveedor

Obtiene información del proveedor de la liquidación de compra

```sql
purchase_settlement_provider = SELECT
  identificador_proveedor                   identificacion,
  tipo_identificador_proveedor              tipo_identificacion,
  razon_social_proveedor razon_social,
  direccion_proveedor direccion
  FROM
  liquidaciones_compra.liquidacion
  WHERE
  id = ?
```

Campo |  Descripción | Valor de ejemplo
--------- | -----------| ---------
identificacion | string | De 5 a 20 caracteres. __Requerido__
tipo_identificacion | string | Ver [tabla](https://datil.dev/#tipo-de-identificacion) de tipos de identificación __Requerido__
razon_social | string | Razón social. Máximo 300 caracteres __Requerido__
direccion | string | Dirección

### Totales

Obtiene información de los valores totales de las liquidaciones

```sql
purchase_settlement_totals  = SELECT
  total_sin_impuestos,
  importe_total,
  descuento
  FROM
  liquidaciones_compra.liquidacion
  WHERE
  id = ?
```

Campo |  Descripción | Valor de ejemplo
--------- | -----------| ---------
total_sin_impuestos | float | Total antes de los impuestos. __Requerido__
importe_total | float | Total incluyendo impuestos. __Requerido__
descuento | float | Suma de los descuentos de cada ítem y del descuento adicional. __Requerido__

### Impuestos de totales

Obtiene información de los impuestos de los totales de la factura

```sql
purchase_settlement_totals_taxes = SELECT
  codigo,
  codigo_porcentaje,
  base_imponible,
  valor
  FROM
  liquidaciones_compra.total_impuesto
  WHERE
  id_liquidacion = ?
```

Campo |  Descripción | Valor de ejemplo
--------- | -----------| ---------
codigo | string | Código del [tipo de impuesto](https://datil.dev/#tipos-de-impuesto) __Requerido__
codigo_porcentaje | string | Código del [porcentaje](https://datil.dev/#codigo-de-porcentaje-de-iva). __Requerido__
base_imponible | float | Base imponible. __Requerido__
valor | float | Valor del total. __Requerido__

### Items

Obtiene todos los items de una factura

```sql
items  = SELECT
  id id_detalle,
  codigo_principal,
  codigo_auxiliar,
  descripcion,
  cantidad,
  unidad_medida,
  precio_unitario,
  descuento,
  precio_total_sin_impuestos
  FROM
  liquidaciones_compra.item
  WHERE
  id_liquidacion = ?
```

Campo |  Descripción | Valor de ejemplo
--------- | -----------| ---------
id_detalle | int | Identifica de manera única el ítem o detalle de la factura. __Requerido__
codigo_principal | string | Código alfanumérico de uso del comercio. Máximo 25 caracteres. __Requerido__
codigo_auxiliar | string | Código alfanumérico de uso del comercio. Máximo 25 caracteres.
descripcion | string | Descripción del ítem. __Requerido__
cantidad | float | Cantidad de items. __Requerido__
unidad_medida | string | Unidad de medida. Ejemplo: Kilos.
precio_unitario | float | Precio unitario. __Requerido__
descuento | float | El descuento es aplicado por cada producto.
precio_total_sin_impuestos | float | Precio antes de los impuestos. Se obtiene multiplicando la `cantidad` por el `precio_unitario` __Requerido__

### Impuestos de items

Obtiene los impuestos de un item.

```sql
item_taxes  = SELECT
  id_item id_detalle,
  base_imponible,
  valor,
  tarifa,
  codigo,
  codigo_porcentaje
  FROM
  liquidaciones_compra.item_impuesto
  WHERE
  id_item = ?
```

Campo |  Descripción | Valor de ejemplo
--------- | -----------| ---------
id_detalle | |
base_imponible | float | Base imponible. __Requerido__
valor | float | Valor del total. __Requerido__
tarifa | float | Porcentaje actual del impuesto expresado por un número entre 0.0 y 100.0 __Requerido__
codigo | string | Código del [tipo de impuesto](https://datil.dev/#tipos-de-impuesto) __Requerido__
codigo_porcentaje | string | Código del [porcentaje](https://datil.dev/#codigo-de-porcentaje-de-iva). __Requerido__

### Detalles adicionales de items

Obtiene los detalles adicionales de un ítem.

Los detalles adicionales de un ítem se manejan de la forma 'Clave':'Valor'. Ejemplo: 'Peso':'Kg'

Se asume que en la tabla consultada una columna tiene los nombres y otra los valores.

Ejemplo de columnas con detalles adicionales del ítem:

columna_de_nombres  |  columna_de_valores
-------------------- | --------------
Peso        |   KG
Color       |   Rojo
Caducidad   |   10 días

```sql
item_details = SELECT
  nombre    nombre,
  valor   valor
  FROM
  liquidaciones_compra.item_detalle_adicional
  WHERE
  id_item = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
nombre | string | Nombre del detalle adicional del ítem
valor | string | Valor del detalle adicional del ítem

### Información adicional

Obtiene la información adicional de la factura. Este query es __opcional__

La información adicional de la factura se maneja de la forma 'Clave':'Valor'. Ejemplo: 'Tipo de pago':'Cheque'

Se asume que en la tabla consultada una columna tiene los nombres y otra los valores.

Ejemplo de columnas con información adicional de la liquidación:

columna_de_nombres  |  columna_de_valores
-------------------- | --------------
Tipo de servicio        |   Avanzado
Forma de pago           |   Cheque
Periodo                 |   3 meses

```sql
purchase_settlement_additional_information = SELECT
  nombre    _nombre_,
  valor     _valor_
  FROM
  liquidaciones_compra.info_adicional
  WHERE
  id_liquidacion = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
`_nombre_` | string | Nombre de la información adicional de la factura
`_valor_` | string | Valor de la información adicional de la factura

### Pagos

Obtiene la información de los pagos aplicables a la liquidación.

```sql
payment_methods = SELECT
  forma_pago,
  total total,
  unidad_tiempo,
  plazo
  FROM
  liquidaciones_compra.pago
  WHERE
  id_liquidacion = ?
```

Parámetro           | Tipo                    | Descripción
------------------- | ----------------------- | ----------
forma_pago          | string                  | Código del [tipo de forma de pago](https://datil.dev/#tipos-de-forma-de-pago). __Requerido__
total               | float                   | Total aplicable a la forma de pago especificada. __Requerido__
unidad_tiempo       | string                  | Especifica la unidad de tiempo en la cual se expresa el plazo.
plazo               | int                     | Especifica el plazo del tipo de pago.

### Reembolsos

Obtiene el reembolso aplicable a una liquidación.

```sql
purchase_settlement_reimbursement = SELECT
  r.id_reembolso,
  l.codigo_documento_reembolso
  FROM
  liquidaciones_compra.liquidacion AS l JOIN
  liquidaciones_compra.reembolso AS r
  ON
  l.id = r.id_liquidacion
  WHERE
  id = ?
```

Parámetro           | Tipo                    | Descripción
------------------- | ----------------------- | ----------
r.id_reembolso      | int     | Identificador del reembolso. __Reembolso__
l.codigo_documento_reembolso  | Identificador del documento de reembolso. __Reembolso__

### Totales de reembolosos

Obtiene la información de los totales de un reembolso

```sql
purchase_settlement_reimbursement_totals = SELECT
  total_comprobante_reembolso            subtotal,
  total_base_imponible_reembolso         total,
  total_impuesto_reembolso               total_impuestos
  FROM
  liquidaciones_compra.liquidacion
  WHERE
  id = ?
```
Parámetro           | Tipo                    | Descripción
------------------- | ----------------------- | ----------
subtotal            | float                   | Total del reembolso incluyendo base imponible e impuestos. __Requerido__
total               | float                   | Total del reembolso incluyendo la base imponible. __Requerido__
total_impuestos     | float                   | Total del reembolso incluyendo los impuestos

### Documennto reembolso

Obtiene la información de un reembolso.

```sql
purchase_settlement_reimbursement_document = SELECT
  codigo_documento_reembolso            codigo,
  id_reembolso                          id_documento,
  id_proveedor_reembolso,
  tipo_id_proveedor_reembolso,
  codigo_pais_pago_proveedor_reembolso,
  tipo_proveedor_reembolso,
  secuencia_reembolso,
  punto_emision_reembolso,
  fecha_emision_reembolso,
  numero_autorizacion_reembolso,
  codigo_establecimiento_reembolso
  FROM
  liquidaciones_compra.reembolso
  WHERE
  id_reembolso = ?
```

Parámetro           | Tipo                    | Descripción
------------------- | ----------------------- | ----------
codigo | string | Código numérico de 2 caracteres que representa al documento de reembolso. Ejemplo: `01` __Requerido__
id_documento | int | Identifica de manera única al documento de reemoblso. __Requerido__
id_proveedor_reembolso | string | Identifica de manera única al proveedor en la liquidación. __Requerido__
tipo_id_proveedor_reembolso | string | Ver [tabla](https://datil.dev/#tipo-de-identificacion) de tipos de identificación __Requerido__
codigo_pais_pago_proveedor_reembolso | string | Código de dos letras del país del proveedor según [ISO_3166](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) __Requerido__
tipo_proveedor_reembolso | string | Tipo de proveedor __Requerido__
secuencia_reembolso | int | Número de secuencia de la factura. __Requerido__
punto_emision_reembolso | string | Código numérico de 3 caracteres que  representa al punto de emisión, o punto de venta. Ejemplo: `001`. __Requerido__
fecha_emision_reembolso | datetime | Fecha de emisión __Requerido__
numero_autorizacion_reembolso | string  | Autorización del documento de reembolso. __Requerido__
codigo_establecimiento_reembolso | float | Número establecimiento que recibe la entrega. __Requerido__

### Impuestos de reembolsos

Obtiene información de los impuestos de los reembolsos

```sql
purchase_settlement_reimbursement_tax = SELECT
  codigo,
  codigo_porcentaje,
  tarifa,
  base_imponible,
  impuesto_reembolso
  FROM
  liquidaciones_compra.reembolso_tax
  WHERE
  id_reembolso = ?
```

Parámetro           | Tipo                    | Descripción
------------------- | ----------------------- | ----------
codigo | string | Código del [tipo de impuesto](https://datil.dev/#tipos-de-impuesto) __Requerido__
codigo_porcentaje | string | Código del [porcentaje](https://datil.dev/#codigo-de-porcentaje-de-iva). __Requerido__
tarifa | float | Porcentaje actual del impuesto expresado por un número entre 0.0 y 100.0 __Requerido__
base_imponible | float | Base imponible. __Requerido__
impuesto_reembolso | float | Valor del impuesto del reembolso


### Máquina fiscal

Obtiene información de la máquina fiscal con la que se emitió la liquidación

```sql
purchase_settlement_fiscal_machine = SELECT
  marca,
  modelo,
  serie
  FROM
  liquidaciones_compra.maquina_fiscal
  WHERE
  id_liquidacion = ?
```

Parámetro           | Tipo                    | Descripción
------------------- | ----------------------- | ----------
marca | string | Marca de máximo 100 caracteres
modelo | string | Modelo de máximo 100 caracteres
serie | string | Serie de máximo 100 caracteres

### Tablas recomendadas

Estructura recomendada para las tablas o vistas con información de las liquidaciones de compra.

Ejemplo en SQL Server:

```sql
CREATE SCHEMA liquidaciones_compra;
CREATE TABLE [liquidaciones_compra].[liquidacion](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [ambiente] [int] NOT NULL,
    [tipo_emision] [int] NOT NULL,
    [secuencial] [bigint] NOT NULL,
    [clave_acceso] [VARCHAR](49) NULL,
    [fecha_emision] [DATETIME] NULL,
    [moneda] [VARCHAR](15) NOT NULL,
    [codigo_documento] [VARCHAR](2) NOT NULL,
    -- EMISOR
    [ruc] [VARCHAR](13) NULL,
    [obligado_contabilidad] [VARCHAR](10) NULL,
    [contribuyente_especial] [VARCHAR](13) NULL,
    [nombre_comercial] [VARCHAR](300) NULL,
    [razon_social] [VARCHAR](300) NULL,
    [direccion_matriz] [VARCHAR](300) NOT NULL,
    [codigo_establecimiento] [VARCHAR](3) NULL,
    [punto_emision] [VARCHAR](3) NULL,
    [direccion_establecimiento] [VARCHAR](300) NULL,
    -- PROVEEDOR
    [tipo_identificador_proveedor] [VARCHAR](2) NULL,
    [razon_social_proveedor] [VARCHAR](300) NOT NULL,
    [identificador_proveedor] [VARCHAR](20) NOT NULL,
    [direccion_proveedor] [vARCHAR](300) NULL,
    -- TOTALES
    [total_sin_impuestos] [DECIMAL](14, 2) NOT NULL,
    [descuento] [DECIMAL](14, 2) NOT NULL,
    [importe_total] [DECIMAL](14, 2) NOT NULL,
    -- REEMBOLSO
    [codigo_documento_reembolso] [VARCHAR](2) NOT NULL,
    [total_comprobante_reembolso] [DECIMAL](14, 2) NOT NULL,
    [total_base_imponible_reembolso] [DECIMAL](14, 2) NOT NULL,
    [total_impuesto_reembolso] [DECIMAL](14, 2) NOT NULL,
)

-- LIQUIDACION: ITEMS
CREATE TABLE [liquidaciones_compra].[item](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [id_liquidacion] bigint NOT NULL FOREIGN KEY REFERENCES [liquidaciones_compra].[liquidacion](id),
    [codigo_principal] [VARCHAR](25) NOT NULL,
    [codigo_auxiliar] [VARCHAR](25)  NULL,
    [descripcion] [VARCHAR](300)  NOT NULL,
    [unidad_medida] [VARCHAR](50) NULL,
    [cantidad] [DECIMAL](14,6)  NOT NULL,
    [precio_unitario] [DECIMAL](18,6)  NOT NULL,
    [descuento] [DECIMAL](14,2)  NULL,
    [precio_total_sin_impuestos] [DECIMAL](14,2)  NOT NULL,
)

-- LIQUIDIACION: DETALLES ADICIONALES DE ITEMS
CREATE TABLE [liquidaciones_compra].[item_detalle_adicional](
    [id_item] [bigint] NOT NULL FOREIGN KEY REFERENCES [liquidaciones_compra].[item](id),
    [nombre] [varchar](100) NOT NULL,
    [valor] [varchar](100) NOT NULL
    CONSTRAINT pk_items_detalles_adicionales PRIMARY KEY (id_item, nombre)
)

-- LIQUIDACION: IMPUESTOS DE ITEMS
CREATE TABLE [liquidaciones_compra].[item_impuesto](
    [id_item] [bigint] NOT NULL FOREIGN KEY REFERENCES [liquidaciones_compra].[item](id),
    [codigo] [VARCHAR](2) NOT NULL,
    [codigo_porcentaje] [VARCHAR](2) NOT NULL,
    [base_imponible] [DECIMAL](14,2) NOT NULL,
    [valor] [DECIMAL](14,2) NOT NULL,
    [tarifa] [DECIMAL](5,2) NOT NULL, -- porcentaje
    CONSTRAINT PK_item_impuesto PRIMARY KEY (id_item, codigo, codigo_porcentaje)
)

-- LIQUIDACION: IMPUESTOS TOTALES
CREATE TABLE [liquidaciones_compra].[total_impuesto](
    [id_liquidacion] bigint NOT NULL FOREIGN KEY REFERENCES [liquidaciones_compra].[liquidacion](id),
    [codigo] [VARCHAR](2) NOT NULL,
    [codigo_porcentaje] [VARCHAR](2) NOT NULL,
    [descuento_adicional] [DECIMAL](14, 2) NULL,
    [base_imponible] [DECIMAL](14,2) NOT NULL,
    [tarifa] [DECIMAL](14, 2) NOT NULL,
    [valor] [DECIMAL](14,2) NOT NULL
    CONSTRAINT PK_total_impuesto PRIMARY KEY (id_liquidacion, codigo, codigo_porcentaje)
)

-- LIQUIDIACION: PAGOS
CREATE TABLE [liquidaciones_compra].[pago](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [id_liquidacion] bigint NOT NULL FOREIGN KEY REFERENCES [liquidaciones_compra].[liquidacion](id),
    [forma_pago] [VARCHAR](2) NOT NULL,
    [total] [DECIMAL](14, 2) NOT NULL,
    [plazo] VARCHAR(50) NOT NULL,
    [unidad_tiempo] VARCHAR(50) NOT NULL
)

-- LIQUIDACION: REEMBOLSOS
CREATE TABLE [liquidaciones_compra].[reembolso](
    [id_reembolso] bigint IDENTITY(1,1) PRIMARY KEY,
    [id_liquidacion] bigint NOT NULL FOREIGN KEY REFERENCES [liquidaciones_compra].[liquidacion](id),
    [tipo_id_proveedor_reembolso] [VARCHAR](2) NOT NULL,
    [id_proveedor_reembolso] [VARCHAR](20) NOT NULL,
    [codigo_pais_pago_proveedor_reembolso] [VARCHAR](2) NOT NULL,
    [tipo_proveedor_reembolso] [VARCHAR](2) NOT NULL,
    [codigo_documento_reembolso] [VARCHAR](3) NOT NULL,
    [codigo_establecimiento_reembolso] [DECIMAL](3) NOT NULL,
    [punto_emision_reembolso] [VARCHAR](3) NOT NULL,
    [secuencial_reembolso] [bigint] NOT NULL,
    [fecha_emision_reembolso] [DATETIME] NOT NULL,
    [numero_autorizacion_reembolso] [VARCHAR](49) NOT NULL
)

-- LIQUIDACION: REEMBOLSO IMPUESTOS
CREATE TABLE [liquidaciones_compra].[reembolso_tax](
    [id_reembolso] [bigint] NOT NULL FOREIGN KEY REFERENCES [liquidaciones_compra].[reembolso](id_reembolso),
    [codigo] [VARCHAR](2) NOT NULL,
    [codigo_porcentaje] [VARCHAR](2) NOT NULL,
    [tarifa] [DECIMAL](14, 2) NOT NULL,
    [base_imponible] [DECIMAL](14,2) NOT NULL,
    [impuesto_reembolso] [DECIMAL](14, 2) NOT NULL
)

-- LIQUIDACION: MAQUINA FISCAL
CREATE TABLE [liquidaciones_compra].[maquina_fiscal](
    [id_liquidacion] bigint NOT NULL FOREIGN KEY REFERENCES [liquidaciones_compra].[liquidacion](id),
    [marca] [VARCHAR](100) NOT NULL,
    [modelo] [VARCHAR](100) NOT NULL,
    [serie] [VARCHAR](100) NOT NULL,
    CONSTRAINT pk_maquina_fiscal PRIMARY KEY (id, marca)
)

-- LIQUIDACION: INFO ADICIONAL
CREATE TABLE [liquidaciones_compra].[info_adicional](
    [id_liquidacion] [bigint] NOT NULL FOREIGN KEY REFERENCES [liquidaciones_compra].[liquidacion](id),
    [nombre] [varchar](100) NOT NULL,
    [valor] [varchar(100)] NOT NULL,
    CONSTRAINT pk_info_adicionales PRIMARY KEY (id_liquidacion, nombre)
)
```
