---
title: Factura
sidebar_position: 2
---
A continuación están detalladas todas las estructuras disponibles para emitir una
factura. Las únicas que deben contener información son:
facturas.factura, facturas.item, facturas.item_impuesto, y facturas.total_impuesto

Consulta [la documentación de nuestro servicio web](https://datil.dev/#emision-de-una-factura)
para obtener más información sobre cada uno de los parámetros.

```sql
CREATE SCHEMA facturas

DROP TABLE [facturas].[pago_propiedad]
DROP TABLE [facturas].[pago]
DROP TABLE [facturas].[item_impuesto]
DROP TABLE [facturas].[item_detalle_adicional]
DROP TABLE [facturas].[item]
DROP TABLE [facturas].[total_impuesto]
DROP TABLE [facturas].[informacion_adicional]
DROP TABLE [facturas].[factura]


CREATE TABLE [facturas].[factura](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [ambiente] [int] NOT NULL, -- (OPCIONAL) el ambiente se toma del archivo de configuración de Link App.
    [tipo_emision] [int] NOT NULL,
    [secuencial] [bigint] NOT NULL,
    [fecha_emision] [datetime] NULL,
    [moneda] [varchar](15) NOT NULL, -- USD para dólares
    [guia_remision] [varchar](17),
    [clave_acceso] [varchar](49) NULL,
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
    [propina] [decimal](14,2) NULL,
    [descuento] [decimal](14,2) NULL,
    [descuento_adicional] [decimal](14,2) NULL,
    -- CREDITO
    [monto_credito] [decimal](14,2) NULL,
    [fecha_vencimiento_credito] [date] NULL,
    -- VALORES RETENIDOS
    [valor_retenido_iva] [decimal](14,2) NULL,
    [valor_retenido_renta] [decimal](14,2) NULL,
)

-- FACTURA: ITEMS
CREATE TABLE [facturas].[item](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [id_factura] bigint NOT NULL FOREIGN KEY REFERENCES [facturas].[factura](id),
    [cantidad] [decimal](14,2)  NOT NULL,
    [codigo_principal] [varchar](50)  NULL,
    [codigo_auxiliar] [varchar](50)  NULL,
    [precio_unitario] [decimal](14,2)  NOT NULL,
    [descripcion] [varchar](300)  NOT NULL,
    [precio_total_sin_impuestos] [decimal](14,2)  NOT NULL,
    [descuento] [decimal](14,2)  NULL,
    [unidad_medida] [varchar](50)  NULL

)

-- FACTURA: IMPUESTOS DE ITEMS
CREATE TABLE [facturas].[item_impuesto](
    [id_item] [bigint] NOT NULL FOREIGN KEY REFERENCES [facturas].[item](id),
    [codigo] [varchar](2) NOT NULL,
    [codigo_porcentaje] [varchar](2) NOT NULL,
    [base_imponible] [decimal](14,2) NOT NULL,
    [valor] [decimal](14,2) NOT NULL,
    [tarifa] [decimal](14,2) NOT NULL, -- porcentaje
    CONSTRAINT PK_item_impuesto PRIMARY KEY (id_item, codigo, codigo_porcentaje)
)

-- FACTURA: DETALLES ADICIONALES DE ITEMS
CREATE TABLE [facturas].[item_detalle_adicional](
    [id_item] [bigint] NOT NULL FOREIGN KEY REFERENCES [facturas].[item](id),
    [nombre] [varchar](100) NOT NULL,
    [valor] [varchar](100) NOT NULL
    CONSTRAINT pk_items_detalles_adicionales PRIMARY KEY (id_item, nombre)
)

-- FACTURA: IMPUESTOS TOTALES
CREATE TABLE [facturas].[total_impuesto](
    [id_factura] bigint NOT NULL FOREIGN KEY REFERENCES [facturas].[factura](id),
    [codigo] [varchar](2) NOT NULL,
    [codigo_porcentaje] [varchar](2) NOT NULL,
    [base_imponible] [decimal](14,2) NOT NULL,
    [valor] [decimal](14,2) NOT NULL
    CONSTRAINT PK_total_impuesto PRIMARY KEY (id_factura, codigo, codigo_porcentaje)
)

-- FACTURA: INFORMACION ADICIONAL DE LA FACTURA
CREATE TABLE [facturas].[informacion_adicional](
    [id_factura] bigint NOT NULL FOREIGN KEY REFERENCES [facturas].[factura](id),
    [nombre] [varchar](100) NOT NULL,
    [valor] [varchar](100) NOT NULL
    CONSTRAINT PK_informacion_adicional PRIMARY KEY (id_factura, nombre)
)

-- FACTURA: PAGOS
CREATE TABLE [facturas].[pago](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [id_factura] bigint NOT NULL FOREIGN KEY REFERENCES [facturas].[factura](id),
    [fecha] [datetime] NOT NULL,
    [medio] [varchar](100) NOT NULL,
    [notas] [varchar](max) NOT NULL,
    [monto] [decimal](14, 2) NOT NULL
)

-- FACTURA: PROPIEDADES DE PAGOS
CREATE TABLE [facturas].[pago_propiedad](
  [id_pago] bigint NOT NULL FOREIGN KEY REFERENCES [facturas].[pago](id),
  [nombre] [varchar](100) NOT NULL,
  [valor] [varchar](100) NOT NULL,
  CONSTRAINT PK_pago_propiedad PRIMARY KEY (id_pago, nombre)
)

-- FACTURA: CREDITO
CREATE TABLE [facturas].[credito](
  [id] bigint IDENTITY(1,1) PRIMARY KEY,
  [id_factura] bigint NOT NULL FOREIGN KEY REFERENCES [facturas].[factura](id),
  [monto] [decimal](14,2) NOT NULL,
  [fecha_vencimiento] [varchar](10) NOT NULL
)

-- FACTURA: COMPENSACION SOLIDARIA
CREATE TABLE [facturas].[compensacion](
  [id] bigint IDENTITY(1,1) PRIMARY KEY,
  [id_factura] bigint NOT NULL FOREIGN KEY REFERENCES [facturas].[factura](id),
  [codigo] [int] NOT NULL,
  [tarifa] [int] NOT NULL,
  [valor] [decimal](14,2) NOT NULL
)

-- FACTURA: EXPORTACION
CREATE TABLE [facturas].[exportacion](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [id_factura] bigint NOT NULL FOREIGN KEY REFERENCES [facturas].[factura](id),
    [incoterm_termino] [varchar](10)  NULL,
    [incoterm_lugar] [varchar](300)  NULL,
    [incoterm_total_sin_impuestos] [varchar](10)  NOT NULL,
    [codigo_pais_origen] [varchar](2)  NULL,
    [codigo_pais_destino] [varchar](2)  NULL,
    [codigo_pais_adquisicion] [varchar](2)  NULL,
    [puerto_origen] [varchar](300)  NULL,
    [puerto_destino] [varchar](300)  NULL,
    [total_flete_internacional] [decimal](14,2)  NOT NULL,
    [total_seguro_internacional] [decimal](14,2)  NOT NULL,
    [total_gastos_aduaneros] [decimal](14,2)  NOT NULL,
    [total_otros_gastos_transporte] [decimal](14,2)  NOT NULL
)
```