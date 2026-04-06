---
title: Nota de crédito
sidebar_position: 3
---

Los queries para la emisión electrónica de __notas de crédito__ se guardan en el archivo de configuración `credit_note.ini`.

[Ejemplo de archivo credit_note.ini](/link-app#credit_note-ini)

### Cabecera

Obtiene información de la cabecera de la nota de crédito

```sql
headers = SELECT
  id_nota_credito             id_local,
  secuencial,
  fecha_emision,
  moneda,
  clave_acceso,
  tipo_emision,
  fecha_emision_documento_modificado,
  numero_documento_modificado,
  tipo_documento_modificado,
  motivo
  FROM
  DocElectronicoNotaCredito.cabecera
  WHERE
  id_nota_credito in (:sequence)
  ORDER BY id_nota_credito :order
```

Campo |  Descripción | Valor de ejemplo
--------- | -----------| ---------
id_local | int o string | Identifica de manera única la nota de crédito. __Requerido__
secuencial | string  | Número de secuencia de la nota de crédito. __Requerido__
fecha_emision | datetime  | Fecha de emisión   __Requerido__
moneda | string | Código [ISO](https://en.wikipedia.org/wiki/ISO_4217) de la moneda. __Requerido__
clave_acceso | string | La clave de acceso representa un identificador único del comprobante. Si esta información no es provista, Dátil la generará. ¿Cómo [generar](#clave-de-acceso) la clave de acceso?
tipo_emision | integer | Emisión normal: `1`. Emisión por indisponibilidad: `2` __Requerido__
fecha_emision_documento_modificado | datetime | Fecha de emisión en formato AAAA-MM-DDHoraZonaHoraria del documento modificado, definido en el estándar [ISO8601](http://tools.ietf.org/html/rfc3339#section-5.6).  __Requerido__
numero_documento_modificado | string | Número completo del documento que se está afectando. Normalmente facturas. Ejm: 001-002-010023098 __Requerido__
tipo_documento_modificado | string | Códigos de [tipos de documentos](#tipos-de-documentos). __Requerido__
motivo | string | Motivo de la operación. Ejm: Devolución de producto. __Requerido__


### Vendedor

Obtiene información del vendedor en la nota de crédito

```sql
credit_note_seller  = SELECT
  ruc,
  obligado_contabilidad,
  contribuyente_especial,
  nombre_comercial,
  razon_social,
  direccion_establecimiento,
  direccion_emisor,
  codigo,
  punto_emision
  FROM
  DocElectronicoNotaCredito.cabecera
  WHERE
  id_nota_credito = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
ruc | string | Número de RUC de 13 caracteres. __Requerido__
obligado_contabilidad | string | `'SI'` si está obligado a llevar contabilidad. `'NO'` si no lo está.
contribuyente_especial | string | Número de resolución. En blanco `''` si no es contribuyente especial.
nombre_comercial | string| Nombre comercial. Máximo 300 caracteres __Requerido__
razon_social | string | Razón social. Máximo 300 caracteres __Requerido__
direccion_establecimiento | string | Dirección registrada en el SRI. Máximo 300 caracteres. __Requerido__
direccion_emisor | string | Dirección del punto de emisión. Máximo 300 caracteres. __Requerido__
codigo | string | Código numérico de 3 caracteres que representa al establecimiento. Ejemplo: `001` __Requerido__
punto_emision | string | Código numérico de 3 caracteres que representa al punto de emisión, o punto de venta. Ejemplo: `001`. __Requerido__


### Comprador

Obtiene información del comprador en la nota de crédito

```sql
credit_note_buyer  = SELECT
  identificacion,
  tipo_identificacion,
  razon_social,
  direccion,
  email,
  telefono
  FROM
  DocElectronicoNotaCredito.cabecera
  WHERE
  id_nota_credito = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
razon_social | string | Razón social. Máximo 300 caracteres. __Requerido__
identificacion | string | De 5 a 20 caracteres. __Requerido__
tipo_identificacion | string | Ver [tabla](#tipo-de-identificacion) de tipos de identificación __Requerido__
email | string | Correo electrónico. Máximo 300 caracteres.
telefono | string | Teléfono
direccion | string | Dirección


### Totales

Obtiene información de los valores totales de la nota de crédito

```sql
credit_note_totals  = SELECT
  total_sin_impuestos,
  importe_total
  FROM
  DocElectronicoNotaCredito.cabecera
  WHERE
  id_nota_credito = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
total_sin_impuestos | float | Total antes de los impuestos. __Requerido__
importe_total       | float | Total incluyendo impuestos. __Requerido__

### Impuestos de totales

Obtiene información de los impuestos de los totales de la nota de crédito

```sql
credit_note_totals_taxes  = SELECT
  codigo,
  codigo_porcentaje,
  base_imponible,
  valor
  FROM
  DocElectronicoNotaCredito.totales_impuestos
  WHERE
  id_nota_credito = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
codigo | string | Código del [tipo de impuesto](#tipos-de-impuesto) __Requerido__
codigo_porcentaje | string | Código del [porcentaje](#codigo-de-porcentaje-de-iva). __Requerido__
base_imponible | float | Base imponible. __Requerido__
valor | float | Valor del total. __Requerido__


### Items

Obtiene todos los items de una nota de crédito

```sql
items  = SELECT
  id_detalle,
  codigo_principal,
  codigo_auxiliar,
  descripcion,
  cantidad,
  precio_unitario,
  descuento,
  precio_total_sin_impuestos
  FROM
  DocElectronicoNotaCredito.items
  WHERE
  id_nota_credito = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
id_detalle | string | Identifica de manera única el ítem o detalle de la nota de crédito. Si no hay un solo campo que lo identifique de manera única se debe usar la concatenación de varios.__Requerido__
codigo_principal | string | Código alfanumérico de uso del comercio. Máximo 25 caracteres. __Requerido__
codigo_auxiliar | string | Código alfanumérico de uso del comercio. Máximo 25 caracteres.
descripcion | string | Descripción del ítem. __Requerido__
cantidad | float | Cantidad de items. __Requerido__
precio_unitario | float | Precio unitario. __Requerido__
descuento | float | El descuento es aplicado por cada producto. __Requerido__
precio_total_sin_impuestos | float | Precio antes de los impuestos. Se obtiene multiplicando la `cantidad` por el `precio_unitario` __Requerido__

### Impuestos de items

Obtiene los impuestos de un item

```sql
item_taxes  = SELECT
  base_imponible,
  valor,
  tarifa,
  codigo,
  codigo_porcentaje
  FROM
  DocElectronicoNotaCredito.items_impuestos
  WHERE
  id_detalle = ?
```


Campo | Tipo | Descripción
--------- | ------- | -----------
base_imponible | float | Base imponible. __Requerido__
valor | float | Valor del total. __Requerido__
tarifa | float | Porcentaje actual del impuesto expresado por un número entre 0.0 y 100.0 __Requerido__
codigo | string | Código del [tipo de impuesto](#tipos-de-impuesto) __Requerido__
codigo_porcentaje | string | Código del [porcentaje](#codigo-de-porcentaje-de-iva). __Requerido__

### Detalles adicionales de items

Obtiene los detalles adicionales de un ítem. Este query es opcional.

Los detalles adicionales de un ítem se manejan de la forma 'Clave':'Valor'. Ejemplo: 'Peso':'Kg'

Se asume que en la tabla consultada
una columna tiene los nombres y otra los valores.

Ejemplo de columnas con detalles adicionales del ítem:

columna_de_nombres  |  columna_de_valores
-------------------- | --------------
Peso        |   KG
Color           |   Rojo
Caducidad                 |   10 días

```sql
item_details = SELECT
  columna_de_nombres    _nombre_,
  columna_de_valores   _valor_
  FROM
  DocElectronicoNotaCredito.items_detalles_adicionales
  WHERE
  id_detalle = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
nombre | string | Nombre del detalle adicional del ítem
valor | string | Valor del detalle adicional del ítem

### Información adicional

Obtiene la información adicional de la nota de crédito.

La información adicional de la nota de crédito se maneja de la forma 'Clave':'Valor'. Ejemplo: 'Tipo de pago':'Cheque'

Se asume que en la tabla consultada
una columna tiene los nombres y otra los valores.

Ejemplo de columnas con información adicional de la nota de crédito:

columna_de_nombres  |  columna_de_valores
-------------------- | --------------
Tipo de servicio        |   Avanzado
Forma de pago           |   Cheque
Periodo                 |   3 meses

```sql
credit_note_additional_information = SELECT
  columna_de_nombres    _nombre_,
  columna_de_valores     _valor_
  FROM
  DocElectronicoNotaCredito.informacion_adicional
  WHERE
  id_nota_credito = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
`_nombre_` | string | Nombre de la información adicional de la nota de crédito
`_valor_` | string | Valor de la información adicional de la nota de crédito


### Detalles adicionales de items

Obtiene los detalles adicionales de un ítem. Este query es opcional.

Los detalles adicionales de un ítem se manejan de la forma 'Clave':'Valor'. Ejemplo: 'Peso':'Kg'

Se asume que en la tabla consultada
una columna tiene los nombres y otra los valores.

Ejemplo de columnas con detalles adicionales del ítem:

columna_de_nombres  |  columna_de_valores
-------------------- | --------------
Peso        |   KG
Color           |   Rojo
Caducidad                 |   10 días

```sql
item_details = SELECT
  columna_de_nombres    _nombre_,
  columna_de_valores   _valor_
  FROM
  DocElectronicoNotaCredito.items_detalles_adicionales
  WHERE
  id_detalle = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
nombre | string | Nombre del detalle adicional del ítem
valor | string | Valor del detalle adicional del ítem


### Tablas recomendadas

Estructura recomendada para las tablas o vistas con información de la nota de crédito.

Ejemplo en SQL Server:

```sql

CREATE SCHEMA notas_de_credito

DROP TABLE [notas_de_credito].[item_impuesto]
DROP TABLE [notas_de_credito].[item_detalle_adicional]
DROP TABLE [notas_de_credito].[item]
DROP TABLE [notas_de_credito].[total_impuesto]
DROP TABLE [notas_de_credito].[informacion_adicional]
DROP TABLE [notas_de_credito].[nota_de_credito]


CREATE TABLE [notas_de_credito].[nota_de_credito](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [ambiente] [int] NOT NULL,
    [tipo_emision] [int] NOT NULL,
    [secuencial] [bigint] NOT NULL,
    [fecha_emision] [datetime] NULL,
    [moneda] [varchar](15) NOT NULL,
    [clave_acceso] [varchar](49),
    -- DOCUMENTO MODIFICADO
    [fecha_emision_documento_modificado] [datetime] NULL,
    [numero_documento_sustento] [varchar](17) NULL,
    [tipo_documento_modificado] [varchar](2) NULL,
    [motivo] [varchar](300) NULL,
    -- EMISOR
    [ruc] [varchar](13) NULL,
    [obligado_contabilidad] [varchar](2) NULL,
    [contribuyente_especial] [varchar](10) NULL,
    [nombre_comercial] [varchar](300) NULL,
    [razon_social] [varchar](300) NULL,
    [direccion_matriz] [varchar](300) NULL,
    [codigo_establecimiento] [varchar](3) NULL,
    [punto_emision] [varchar](3) NULL,
    [direccion_establecimiento] [varchar](300) NULL,
    -- COMPRADOR
    [email_comprador] [varchar](254) NULL,
    [identificacion_comprador] [varchar](20) NULL,
    [tipo_identificacion_comprador] [varchar](2) NULL,
    [razon_social_comprador] [varchar](200) NULL,
    [direccion_comprador] [varchar](200) NULL,
    [telefono_comprador] [varchar](200) NULL,
    -- TOTALES
    [total_sin_impuestos] [decimal](14,2) NULL,
    [importe_total] [decimal](14,2) NULL,
)

-- NOTA DE CRÉDITO: ITEMS
CREATE TABLE [notas_de_credito].[item](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [id_nota_credito] bigint NOT NULL FOREIGN KEY REFERENCES [notas_de_credito].[nota_de_credito](id),
    [cantidad] [decimal](14,2)  NOT NULL,
    [codigo_principal] [varchar](50)  NULL,
    [codigo_auxiliar] [varchar](50)  NULL,
    [precio_unitario] [decimal](14,2)  NOT NULL,
    [descripcion] [varchar](300)  NOT NULL,
    [precio_total_sin_impuestos] [decimal](14,2)  NOT NULL,
    [descuento] [decimal](14,2)  NULL
)

-- NOTA DE CRÉDITO: IMPUESTOS DE ITEMS
CREATE TABLE [notas_de_credito].[item_impuesto](
    [id_item] [bigint] NOT NULL FOREIGN KEY REFERENCES [notas_de_credito].[item](id),
    [codigo] [varchar](2) NOT NULL,
    [codigo_porcentaje] [varchar](2) NOT NULL,
    [base_imponible] [decimal](14,2) NOT NULL,
    [valor] [decimal](14,2) NOT NULL,
    [tarifa] [decimal](14,2) NOT NULL, -- porcentaje
    CONSTRAINT PK_item_impuesto PRIMARY KEY (id_item, codigo, codigo_porcentaje)
)

-- NOTA DE CRÉDITO: DETALLES ADICIONALES DE ITEMS
CREATE TABLE [notas_de_credito].[item_detalle_adicional](
    [id_item] [bigint] NOT NULL FOREIGN KEY REFERENCES [notas_de_credito].[item](id),
    [nombre] [varchar](100) NOT NULL,
    [valor] [varchar](100) NOT NULL
    CONSTRAINT pk_items_detalles_adicionales PRIMARY KEY (id_item, nombre)
)

-- NOTA DE CRÉDITO: IMPUESTOS TOTALES
CREATE TABLE [notas_de_credito].[total_impuesto](
    [id_nota_credito] bigint NOT NULL FOREIGN KEY REFERENCES [notas_de_credito].[nota_de_credito](id),
    [codigo] [varchar](2) NOT NULL,
    [codigo_porcentaje] [varchar](2) NOT NULL,
    [base_imponible] [decimal](14,2) NOT NULL,
    [valor] [decimal](14,2) NOT NULL
    CONSTRAINT PK_total_impuesto PRIMARY KEY (id_nota_credito, codigo, codigo_porcentaje)
)

-- NOTA DE CRÉDITO: INFORMACION ADICIONAL DE LA NOTA DE CRÉDITO
CREATE TABLE [notas_de_credito].[informacion_adicional](
    [id_nota_credito] bigint NOT NULL FOREIGN KEY REFERENCES [notas_de_credito].[nota_de_credito](id),
    [nombre] [varchar](100) NOT NULL,
    [valor] [varchar](100) NOT NULL
    CONSTRAINT PK_informacion_adicional PRIMARY KEY (id_nota_credito, nombre)
)

```


