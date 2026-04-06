A continuación están detalladas todas las estructuras disponibles para emitir una
guía de remisión. Las únicas que deben contener información son:
guia_remision.guia_remision, guia_remision.destinatario, guia_remision.item

```sql
CREATE SCHEMA guias_de_remision

DROP TABLE [guias_de_remision].[guia_remision]
DROP TABLE [guias_de_remision].[destinatario]
DROP TABLE [guias_de_remision].[item]
DROP TABLE [guias_de_remision].[item_detalle_adicional]
DROP TABLE [guias_de_remision].[informacion_adicional]

CREATE TABLE [guias_de_remision].[guia_remision](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [ambiente] [int] NOT NULL,
    [tipo_emision] [int] NOT NULL,
    [secuencial] [bigint] NOT NULL,
    [fecha_inicio_transporte] [datetime] NULL,
    [fecha_fin_transporte] [datetime] NULL,
    [direccion_partida] [varchar](200) NULL,
    [clave_acceso] [varchar](49),
    -- EMISOR
    [ruc] [varchar](13) NULL,
    [obligado_contabilidad] [varchar](2) NULL,
    [contribuyente_especial] [int] NULL,
    [nombre_comercial] [varchar](300) NULL,
    [razon_social] [varchar](300) NULL,
    [direccion] [varchar](300) NULL,
    [codigo_establecimiento] [varchar](3) NULL,
    [punto_emision] [varchar](3) NULL,
    [direccion_establecimiento] [varchar](300) NULL,
    -- TRANSPORTISTA
    [email_comprador] [varchar](254) NULL,
    [identificacion_comprador] [varchar](20) NULL,
    [tipo_identificacion_comprador] [varchar](2) NULL,
    [razon_social_comprador] [varchar](200) NULL,
    [direccion_comprador] [varchar](200) NULL,
    [telefono_comprador] [varchar](200) NULL,
    [placa] [varchar](200) NULL
)

-- GUIA DE REMISION: DESTINATARIOS
CREATE TABLE [guias_de_remision].[destinatario](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [id_destinatario] bigint NOT NULL FOREIGN KEY REFERENCES [guias_de_remision].[guia_remision](id),
    [email] [varchar](254) NULL,
    [identificacion] [varchar](20) NULL,
    [tipo_identificacion] [varchar](2) NULL,
    [razon_social] [varchar](200) NULL,
    [direccion] [varchar](200) NULL,
    [telefono] [varchar](200) NULL,
    [fecha_emision_documento_sustento] [datetime] NULL,
    [numero_documento_sustento] [varchar](17) NULL,
    [tipo_documento_sustento] [varchar](2) NULL,
    [numero_autorizacion_documento_sustento] [varchar](300) NULL,
    [ruta] [varchar](300) NULL,
    [motivo_traslado] [varchar](300) NULL,
    [documento_aduanero_unico] [varchar](300) NULL,
    [codigo_establecimiento_destino] [varchar](3) NULL
)

-- GUIA DE REMISION: ITEMS
CREATE TABLE [guias_de_remision].[item](
    [id] bigint IDENTITY(1,1) PRIMARY KEY,
    [id_destinatario] bigint NOT NULL FOREIGN KEY REFERENCES [guias_de_remision].[destinatario](id),
    [cantidad] [decimal](14,2)  NOT NULL,
    [codigo_principal] [varchar](50)  NULL,
    [codigo_auxiliar] [varchar](50)  NULL,
    [descripcion] [varchar](300)  NOT NULL
)

-- GUIA DE REMISION: DETALLES ADICIONALES DE ITEMS
CREATE TABLE [guias_de_remision].[item_detalle_adicional](
    [id_item] [bigint] NOT NULL FOREIGN KEY REFERENCES [guias_de_remision].[item](id),
    [nombre] [varchar](100) NOT NULL,
    [valor] [varchar](100) NOT NULL
    CONSTRAINT pk_items_detalles_adicionales PRIMARY KEY(id_item, nombre)
)

-- GUIA DE REMISION: INFORMACION ADICIONAL DE LA GUIA DE REMISION
CREATE TABLE [guias_de_remision].[informacion_adicional](
    [id_guia_remision] bigint NOT NULL FOREIGN KEY REFERENCES [guias_de_remision].[guia_remision](id),
    [nombre] [varchar](100) NOT NULL,
    [valor] [varchar](100) NOT NULL
    CONSTRAINT PK_informacion_adicional PRIMARY KEY (id_guia_remision, nombre)
)

```

Consulta [la documentación de nuestro servicio web](https://datil.dev/#emision-de-una-guia-de-remision)
para obtener más información sobre cada uno de los parámetros.

