A continuación están detalladas todas las estructuras disponibles para emitir un
comprobante de retención ATS. Las únicas que deben contener información son:
retenciones_ats.retencion_ats, retenciones_ats.documentos_soporte

```sql

CREATE SCHEMA retenciones_ats

DROP TABLE [retenciones_ats].[info_adicional]
DROP TABLE [retenciones_ats].[documentos_soporte]
DROP TABLE [retenciones_ats].[impuestos_documentos_soporte]
DROP TABLE [retenciones_ats].[retenciones_documentos_soporte]
DROP TABLE [retenciones_ats].[dividendos_retenciones]
DROP TABLE [retenciones_ats].[reembolsos_documentos_soporte]
DROP TABLE [retenciones_ats].[impuestos_reembolsos]
DROP TABLE [retenciones_ats].[pagos_documentos_soporte]
DROP TABLE [retenciones_ats].[retencion_ats]

CREATE TABLE [retenciones_ats].[retencion_ats](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [ambiente] [int] NOT NULL, -- (OPCIONAL) el ambiente se toma del archivo de configuración de Link App.
    [tipo_emision] [int] NOT NULL,
    [secuencial] [bigint] NOT NULL,
    [fecha_emision] [datetime] NULL,
    [clave_acceso] [varchar](49) NULL,
    [periodo_fiscal] [varchar](7),
    [tipo_sujeto_retenido] [varchar](2) NULL,
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
    -- SUJETO RETENIDO
    [email_sujeto] [varchar](254) NULL,
    [identificacion_sujeto] [varchar](20) NULL,
    [tipo_identificacion_sujeto] [varchar](2) NULL,
    [razon_social_sujeto] [varchar](200) NULL,
    [direccion_sujeto] [varchar](200) NULL,
    [telefono_sujeto] [varchar](200) NULL,
)

-- RETENCION ATS: INFORMACION ADICIONAL
CREATE TABLE [retenciones_ats].[info_adicional](
    [id_retencion_ats] bigint NOT NULL FOREIGN KEY REFERENCES [retenciones_ats].[retencion_ats](id),
    [nombre] [varchar](100) NOT NULL,
    [valor] [varchar](100) NOT NULL
    CONSTRAINT PK_informacion_adicional_retencion_ats PRIMARY KEY (id_retencion_ats, nombre)
)

-- RETENCION ATS: DOCUMENTOS_SOPORTE
CREATE TABLE [retenciones_ats].[documentos_soporte](
    -- DOCUMENTO SOPORTE
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [id_retencion_ats] bigint NOT NULL FOREIGN KEY REFERENCES [retenciones_ats].[retencion_ats](id),
    [codigo_sustento] [varchar](2) NULL,
    [tipo_documento] [varchar](2) NULL,
    [numero] [varchar](17) NULL,
    [fecha_emision] [DATETIME] NULL,
    [fecha_registro_contable] [DATETIME] NULL,
    [numero_autorizacion] [varchar](300) NULL,
    [tipo_pago] [varchar](2) NULL,
    [total_sin_impuestos] [DECIMAL](14,2) NOT NULL,
    [total] [DECIMAL](14,2) NOT NULL,
    [tipo_regimen_fiscal] [varchar](2) NULL,
    [pais] [varchar](2) NULL,
    [aplica_convenio] [varchar](2) NULL,
    [pago_exterior] [varchar](2) NULL,
    [pago_regimen_fiscal] [varchar](2) NULL,
    -- DATOS REEMBOLSO
    [codigo] [varchar](2) NULL,
    [subtotal] [DECIMAL](14,2) NOT NULL,
    [total_reembolso] [DECIMAL](14,2) NOT NULL,
    [total_impuestos] [DECIMAL](14,2) NOT NULL
)

-- RETENCION ATS: IMPUESTOS DOCUMENTOS SOPORTE
CREATE TABLE [retenciones_ats].[impuestos_documentos_soporte](
    [id_documento_soporte] [bigint] NOT NULL FOREIGN KEY REFERENCES [retenciones_ats].[documentos_soporte](id),
    [codigo] [varchar](2) NOT NULL,
    [codigo_porcentaje] [varchar](2) NOT NULL,
    [base_imponible] [decimal](14,2) NOT NULL,
    [valor] [decimal](14,2) NOT NULL,
    [tarifa] [decimal](14,2) NOT NULL,
    CONSTRAINT PK_impuesto_documento_soporte PRIMARY KEY (id_documento_soporte, codigo, codigo_porcentaje)
)

-- RETENCION ATS: RETENCIONES DOCUMENTOS SOPORTE
CREATE TABLE [retenciones_ats].[retenciones_documentos_soporte](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [id_documento_soporte] [bigint] NOT NULL FOREIGN KEY REFERENCES [retenciones_ats].[documentos_soporte](id),
    [codigo] [varchar](2) NOT NULL,
    [codigo_porcentaje] [varchar](3) NOT NULL,
    [base_imponible] [DECIMAL](14,2) NOT NULL,
    [tarifa] [DECIMAL](14,2) NOT NULL,
    [valor_retenido] [DECIMAL](14,2) NOT NULL 
)

-- RETENCION ATS: DIVIDENDOS RETENCIONES
CREATE TABLE [retenciones_ats].[dividendos_retenciones](
    [id_retencion_documento_soporte] [bigint] NOT NULL FOREIGN KEY REFERENCES [retenciones_ats].[retenciones_documentos_soporte](id),
    [fecha_pago] [DATETIME] NOT NULL,
    [impuesto_renta] [DECIMAL](14,2) NOT NULL,
    [annio_fiscal] [bigint] NOT NULL,
    CONTRAINT PK_dividendo_retencion PRIMARY KEY
    (id_retencion_documento_soporte, fecha_pago, annio_fiscal)
)

-- RETENCION ATS: REEMBOLSO DOCUMENTOS SOPORTE
CREATE TABLE [retenciones_ats].[documentos_reembolso](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [id_documento_soporte] [bigint] NOT NULL FOREIGN KEY REFERENCES [retenciones_ats].[documentos_soporte](id),
    [codigo_establecimiento] [varchar](3) NOT NULL,
    [codigo_punto_emision] [varchar](3) NOT NULL,
    [fecha_emision] [DATETIME] NOT NULL,
    [identificacion_proveedor] [varchar](13) NOT NULL,
    [numero_autorizacion] [varchar](300) NOT NULL,
    [pais_origen_proveedor] [varchar](2) NOT NULL,
    [secuencia] [bigint] NOT NULL,
    [tipo] [varchar](2) NOT NULL,
    [tipo_identificacion_proveedor] [varchar](2) NOT NULL,
    [tipo_proveedor] [varchar](2) NOT NULL
)

-- RETENCION ATS: IMPUESTOS REEMBOLSO
CREATE TABLE [retenciones_ats].[impuestos_reembolsos](
    [id_documento_reembolso] [bigint] NOT NULL FOREIGN KEY REFERENCES [retenciones_ats].[documentos_reembolso](id),
    [codigo] [varchar](2) NOT NULL,
    [codigo_porcentaje] [varchar](2) NOT NULL,
    [base_imponible] [decimal](14,2) NOT NULL,
    [valor] [decimal](14,2) NOT NULL,
    [tarifa] [decimal](14,2) NOT NULL,
    CONSTRAINT PK_impuesto_reembolso PRIMARY KEY (id_documento_reembolso, codigo, codigo_porcentaje)
)

-- RETENCION ATS: PAGOS DOCUMENTOS SOPORTE
CREATE TABLE [retenciones_ats].[pagos_documentos_soporte](
    [id_documento_soporte] [bigint] NOT NULL FOREIGN KEY REFERENCES [retenciones_ats].[documentos_soporte](id),
    [tipo_pago] [varchar](2) NOT NULL,
    [total] [DECIMAL](14,2) NOT NULL,
    CONSTRAINT PK_pagos_documento_soporte PRIMARY KEY (id_documento_soporte, tipo_pago)
)
```

Consulta [la documentación de nuestro servicio web](https://datil.dev/#emision-de-una-retencion-ats)
para obtener más información sobre cada uno de los parámetros.
