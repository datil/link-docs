---
title: Guía de remisión
sidebar_position: 4
---

Los queries para la emisión electrónica de __guías de remisión__ se guardan en el archivo de configuración `waybill.ini`.

[Ejemplo de archivo waybill.ini](../../static/config/receipts/waybill.ini)

### Cabecera

Obtiene información de la cabecera de la guía de remisión

```sql
headers = SELECT
  id_guia_remision             id_local,
  secuencial,
  fecha_inicio_transporte,
  fecha_fin_transporte,
  direccion_partida,
  clave_acceso,
  tipo_emision
  FROM
  DocElectronicoGuiaRemision.cabecera
  WHERE
  id_guia_remision in (:sequence)
  ORDER BY id_guia_remision :order
```

Campo |  Descripción | Valor de ejemplo
--------- | -----------| ---------
id_local | int o string | Identifica de manera única la guía de remisión. __Requerido__
secuencial | string  | Número de secuencia de la retención. __Requerido__
fecha_inicio_transporte | datetime  | Fecha en la que inicia el transporte dada la guía de remisión __Requerido__
fecha_fin_transporte | datetime  | Fecha en la que termina el transporte dada la guía de remisión __Requerido__
direccion_partida | string | Dirección de partida
clave_acceso | string | La clave de acceso representa un identificador único del comprobante. Si esta información no es provista, Dátil la generará. ¿Cómo [generar](https://datil.dev/#clave-de-acceso) la clave de acceso?
tipo_emision | integer | Emisión normal: `1`. Emisión por indisponibilidad: `2` __Requerido__

### Vendedor

Obtiene información del vendedor en la guía de remisión

```sql
waybill_seller  = SELECT
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
  DocElectronicoGuiaRemision.cabecera
  WHERE
  id_guia_remision = ?
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


### Transportista

Obtiene información del transportista en la guía de remisión

```sql
waybill_shipper  = SELECT
  identificacion,
  tipo_identificacion,
  razon_social,
  direccion,
  email,
  telefono
  FROM
  DocElectronicoGuiaRemision.cabecera
  WHERE
  id_guia_remision = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
identificacion | string | De 5 a 20 caracteres. __Requerido__
tipo_identificacion | string | Ver [tabla](https://datil.dev/#tipo-de-identificacion) de tipos de identificación __Requerido__
razon_social | string | Razón social. Máximo 300 caracteres. __Requerido__
direccion | string | Dirección
email | string | Correo electrónico. Máximo 300 caracteres.
telefono | string | Teléfono


### Destinatarios

Obtiene información de los destinatarios en la guía de remisión

```sql
waybill_receivers  = SELECT
    id_destinatario     receiver_id,
    razon_social,
    identificacion,
    tipo_identificacion,
    email,
    telefono,
    direccion,
    ruta,
    documento_aduanero_unico,
    codigo_establecimiento_destino,
    fecha_emision_documento_sustento,
    numero_documento_sustento,
    tipo_documento_sustento,
    motivo_traslado,
    numero_autorizacion_documento_sustento
    FROM
    DocElectronicoGuiaRemision.destinatario
    WHERE
    id_guia_remision = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
receiver_id | string | Identifica de manera única al destinatario en la guía de remisión. __Requerido__
razon_social | string | Razón social del destinatario. Máximo 300 caracteres __Requerido__
identificacion | string | De 5 a 20 caracteres. __Requerido__
tipo_identificacion | string | Ver [tabla](https://datil.dev/#tipo-de-identificacion) de tipos de identificación __Requerido__
email | string | Correo electrónico del destinatario. Máximo 300 caracteres.
telefono | string | Teléfono del destinatario
direccion | string | Dirección del destinatario
ruta | string | Ruta de transporte. Máximo 300 caracteres.
documento_aduanero_unico | string |  Máximo 20 caracteres.
fecha_emision_documento_sustento | datetime  | Fecha de emisión del documento sustento de la guía de remisión, usualmente una factura.  __Requerido__
numero_documento_sustento | string | Número completo del documento que detalla la mercadería a transportar. Normalmente facturas. Ejm: 001-002-010023098
codigo_establecimiento_destino | string | Número establecimiento que recibe la entrega.  __Requerido__
numero_documento_sustento | string | Número completo del documento que detalla la mercadería a transportar. Normalmente facturas. Ejm: 001-002-010023098 __Requerido__
tipo_documento_sustento | string | tipo_documento_sustento | string | Códigos de [tipos de documentos](https://datil.dev/#tipos-de-documentos). __Requerido__
motivo_traslado | string | Motivo del traslado. Ejm: Entrega de mercadería. __Requerido__
numero_autorizacion_documento_sustento | string | Autorización del documento de sustento.

### Items del destinatario

Obtiene la información de los items que recibirá el destinatario

```sql
waybill_receiver_items = SELECT
    id_detalle,
    descripcion,
    codigo_principal,
    codigo_auxiliar,
    cantidad
    FROM
    DocElectronicoGuiaRemision.detalle
    WHERE
    id_destinatario = ?

```


Campo | Tipo | Descripción
--------- | ------- | -----------
id_detalle | string | Identifica de manera única el ítem o detalle de la factura. Si no hay un solo campo que lo identifique de manera única se debe usar la concatenación de varios.__Requerido__
descripcion | string | Descripción del ítem. __Requerido__
codigo_principal | string | Código alfanumérico de uso del comercio. Máximo 25 caracteres. __Requerido__
codigo_auxiliar | string | Código alfanumérico de uso del comercio. Máximo 25 caracteres.
cantidad | float | Cantidad de items. __Requerido__


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
  DocElectronicoGuiaRemision.items_detalles_adicionales
  WHERE
  id_detalle = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
nombre | string | Nombre del detalle adicional del ítem
valor | string | Valor del detalle adicional del ítem


### Información adicional

Obtiene la información adicional de la guía de remisión.

La información adicional de la guía de remisión se maneja de la forma 'Clave':'Valor'. Ejemplo: 'Tipo de pago':'Cheque'

Se asume que en la tabla consultada
una columna tiene los nombres y otra los valores.

Ejemplo de columnas con información adicional de la guía de remisión:



columna_de_nombres  |  columna_de_valores
-------------------- | --------------
Tipo de servicio        |   Avanzado
Forma de pago           |   Cheque
Periodo                 |   3 meses

```sql
waybill_additional_information = SELECT
  columna_de_nombres    _nombre_,
  columna_de_valores     _valor_
  FROM
  DocElectronicoRetencion.informacion_adicional
  WHERE
  id_retencion = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
`_nombre_` | string | Nombre de la información adicional de la rentención
`_valor_` | string | Valor de la información adicional de la retención

### Tablas recomendadas

Estructura recomendada para las tablas o vistas con información de la guía de remisión.

Ejemplo en SQL Server:

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

