---
title: "Liquidación de compra"
---

A continuación están detalladas todas las estructuras disponibles para emitir una
liquidacion. Las únicas que deben contener información son:
liquidaciones_compra.liquidacion, liquidaciones_compra.item,
liquidaciones_compra.item_impuesto, liquidaciones_compra.pago,
y liquidaciones_compra.total_impuesto


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

Consulta [la documentación de nuestro servicio web](https://datil.dev/#emision-de-una-liquidacion-de-compras)
para obtener más información sobre cada uno de los parámetros.

