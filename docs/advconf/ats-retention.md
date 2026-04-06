---
title: Comprobante de retención ATS
sidebar_position: 2
---

Los queries para la emisión electrónica de __comprobantes de retención ats__ se guardan en el archivo de configuración
`ats_retention.ini`.

[Ejemplo de archivo ats_retention.ini](/link-app#credit_note-ini)

### Retención ATS

Obtiene información de la información principal de la retención ats.

```sql
headers = SELECT
  id id_local,
  tipo_emision,
  secuencial,
  fecha_emision,
  clave_acceso,
  periodo_fiscal
  FROM
  retenciones_ats.retencion_ats
  WHERE retenciones_ats.retencion_ats.id in (:sequence)
  ORDER BY fecha_emision :order

```

Campo |  Descripción | Valor de ejemplo
--------- | -----------| ---------
id_local | integer | Identifica de manera única la retención ats. __Requerido__
secuencial | string  | Número de secuencia de la retención ats. __Requerido__
fecha_emision | datetime  | Fecha de emisión   __Requerido__
clave_acceso | string | La clave de acceso representa un identificador único del comprobante. Si esta información no es provista, Dátil la generará. ¿Cómo [generar](#clave-de-acceso) la clave de acceso?
tipo_emision | integer | Emisión normal: `1`. Emisión por indisponibilidad: `2` __Requerido__
periodo_fiscal | string | Mes y año en el siguiente formato MM/AAAA. Ejm: 12/2015 __Requerido__

### Emisor

Obtiene la información del vendedor de la retención ats

```sql
issuer = SELECT
  ruc,
  obligado_contabilidad,
  contribuyente_especial,
  nombre_comercial,
  razon_social,
  direccion_establecimiento,
  direccion_matriz,
  codigo_establecimiento,
  punto_emision
  FROM
  retenciones_ats.retencion_ats
  WHERE
  id = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
ruc | string | Número de RUC de 13 caracteres. __Requerido__
obligado_contabilidad | string | `'SI'` si está obligado a llevar contabilidad. `'NO'` si no lo está.
contribuyente_especial | string | Número de resolución. En blanco `''` si no es contribuyente especial.
nombre_comercial | string| Nombre comercial. Máximo 300 caracteres __Requerido__
razon_social | string | Razón social. Máximo 300 caracteres __Requerido__
direccion_establecimiento | string | Dirección registrada en el SRI. Máximo 300 caracteres. __Requerido__
direccion_matriz | string | Dirección del punto de emisión. Máximo 300 caracteres. __Requerido__
codigo_establecimiento | string | Código numérico de 3 caracteres que representa al establecimiento. Ejemplo: `001` __Requerido__
punto_emision | string | Código numérico de 3 caracteres que representa al punto de emisión, o punto de venta. Ejemplo: `001`. __Requerido__

### Sujeto

Obtiene información del sujeto retenido en la retención

```sql
retention_recipient  = SELECT
  identificacion_sujeto,
  tipo_identificacion,
  razon_social,
  direccion_sujeto,
  email_sujeto,
  telefono_sujeto
  FROM
  retenciones_ats.retencion_ats
  WHERE
  id = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
identificacion_sujeto | string | De 5 a 20 caracteres. __Requerido__
tipo_identificacion | string | Ver [tabla](#tipo-de-identificacion) de tipos de identificación __Requerido__
razon_social | string | Razón social. Máximo 300 caracteres. __Requerido__
direccion_sujeto | string | Dirección
email_sujeto | string | Correo electrónico. Máximo 300 caracteres.
telefono_sujeto | string | Teléfono

### Información Adicional de la Retención ATS

Información adicional adjunta al documento. Es utilizada para especificar cualquier detalle
que no pueda ser descrito con los elementos que son parte del documento.

```sql
additional_information = SELECT
  nombre,
  valor
  FROM
  retenciones_ats.info_adicional
  WHERE
  id_retencion_ats = ?
```

Parámetro | Tipo | Descripción
--------- | ---- |-----------
nombre | string | Máximo 300 caracteres. __Requerido__
valor | string | Máximo 300 caracteres. __Requerido__

### Documentos Soporte

Obtiene toda la información de los documentos de soporte de una retención ats

```sql
support_documents = SELECT
  codigo_sustento,
  tipo_documento,
  numero,
  fecha_emision,
  numero_autorizacion,
  total_sin_impuestos,
  total
  FROM
  retenciones_ats.documentos_soporte
  WHERE
  id_retencion_ats = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
codigo_sustento | string | Ver (tabla)(#tipos-de-sustento-de-comprobantes) de tipos de sustento de los comprobantes. Máximo 2 caracteres. __Requerido__
tipo_documento | string | Ver códigos de [tipos de documentos](#tipos-de-documentos). Máximo 2 caracteres. __Requerido__
numero | string | Número completo del documento asociado a la retención ATS. Máximo 17 caracteres. __Requerido__
fecha_emision | string |  Fecha de emisión en formato AAAA-MM-DDHoraZonaHoraria, definido en el estándar [ISO8601](http://tools.ietf.org/html/rfc3339#section-5.6). __Requerido__
numero_autorización | string | Número de autorización del comprobante de venta. Máximo 300 caracteres. __Requerido__
total_sin_impuestos | string | Total antes de los impuestos. __Requerido__
total | string | Total incluyendo impuestos. __Requerido__

### Impuestos de Documentos de Soporte

Obtiene la información de los impuestos de un documento de soporte. Este query es __opcional__

```sql
taxes = SELECT
  codigo,
  codigo_porcentaje,
  base_imponible,
  valor,
  tarifa
  FROM
  retenciones_ats.impuestos_documentos_soporte
  WHERE
  id_documento_soporte = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
base_imponible | float | Base imponible. __Requerido__
valor | float | Valor del total. __Requerido__
tarifa | float | Porcentaje actual del impuesto expresado por un número entre 0.0 y 100.0 __Requerido__
codigo | string | Código del [tipo de impuesto](#tipos-de-impuesto) __Requerido__
codigo_porcentaje | string | Código del [porcentaje](#codigo-de-porcentaje-de-iva). __Requerido__

### Retenciones de Documentos de Soporte

Obtiene la información de los impuestos retenidos de un documento de soporte.

```sql
taxes_support_documents = SELECT
  codigo,
  codigo_porcentaje,
  base_imponible,
  tarifa,
  valor_retenido
  FROM
  retenciones_ats.retenciones_documentos_soporte
  WHERE
  id_documento_soporte = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
base_imponible | float | Suma de las bases imponibles de cada item para el tipo de impuesto y porcentaje. __Requerido__
valor_retenido | float (hasta 2 cifras decimales) | Valor del impuesto.  __Requerido__
tarifa | float (hasta 2 cifras decimales) | Porcentaje actual del impuesto.  __Requerido__
codigo | string | Código del [tipo de impuesto para la retención en la factura](#tipos-de-impuesto-para-la-retencion-en-la-factura).  __Requerido__
codigo_porcentaje | string | Código del [porcentaje del impuesto](#retencion-de-iva-presuntivo-y-renta). __Requerido__

### Dividendos de Documentos de Soporte

Obtiene la información de los dividendos asociados a un documento de soporte.

```sql
dividends = SELECT
  impuesto_renta,
  fecha_pago,
  annio_fiscal
  FROM
  retenciones_ats.dividendos_retenciones
  WHERE
  id_documento_soporte = ?
```

Campo | Tipo | Descripción
--------- | ---- |-----------
fecha_pago | string | Fecha de pago en formato AAAA-MM-DDHoraZonaHoraria, definido en el estándar [ISO8601](http://tools.ietf.org/html/rfc3339#section-5.6). __Requerido__
impuesto_renta | string | Impuesto a la Renta pagado por la sociedad correspondiente al dividendo __Requerido__
annio_fiscal | integer | Año en que se generaron las utilidades atribuibles al dividendo. __Requerido__

### Reembolso de Documentos de Soportes

Información del reembolso de un documento de soporte

```sql
reimbursement = SELECT
  codigo,
  subtotal,
  total,
  total_impuestos
  FROM
  retenciones_ats.documentos_soporte
  WHERE
  id_retencion_ats = ?
```

Campo | Tipo | Descripción
--------- | ---- |-----------
codigo | string | Código del tipo de documento de reembolso equivalente a 41. __Requerido__
subtotal | float | Sumatoria de los subtotales de los documentos. __Requerido__
total_impuestos | float | Sumatoria de los totales de impuestos de los documentos. __Requerido__
total | float | Subtotal más total de impuestos. __Requerido__


### Documentos de Reembolso

Información de los documentos de reembolso

```sql
reimbursement_documents = SELECT
  codigo_establecimiento,
  codigo_punto_emision,
  secuencia,
  fecha_emision,
  identificacion_proveedor,
  tipo_identificacion_proveedor,
  numero_autorizacion,
  pais_origen_proveedor,
  tipo,
  tipo_proveedor
  FROM
  retenciones_ats.reembolsos_documentos_soporte
  WHERE
  id_reembolso = ?
```

Parámetro | Tipo | Descripción
--------- | ---- |-----------
codigo_establecimiento  | string |  Código numérico de 3 caracteres que representa al establecimiento. Ejemplo: 001. __Requerido__
codigo_punto_emision  | string |  Código numérico de 3 caracteres que representa al punto de emisión, o punto de venta. Ejemplo: 001.. __Requerido__
secuencia  | integer (min. 1 - max. 999999999 ) | Número de secuencia del documento. __Requerido__
fecha_emision  | string |  Fecha de emisión en formato AAAA-MM-DDHoraZonaHoraria, definido en el estándar [ISO8601](http://tools.ietf.org/html/rfc3339#section-5.6). __Requerido__
identificacion_proveedor | string | Identificación del proveedor. De 5 a 20 caracteres. __Requerido__
tipo_identificacion_proveedor | string | Ver [tabla](#tipo-de-identificacion) de tipos de identificación __Requerido__
numero_autorizacion  | string | Número de autorización del documento. 10, 37 o 49 caracteres. __Requerido__
pais_origen_proveedor | string | Código  de dos caracteres del país origen según [ISO_3166](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements). __Requerido__
tipo  | string |  Código de [tipos de documentos](#tipos-de-documentos). __Requerido__
tipo_proveedor  | string | Código de [tipo de proveedor](#tipo-de-proveedor) de reembolso. __Requerido__


### Impuestos de Reembolsos de los Documentos de Soporte

Información de los impuestos de los reembolsos de un documento de soporte.

```sql
reimbursement_taxes = SELECT
  codigo,
  codigo_porcentaje,
  base_imponible,
  valor,
  tarifa
  FROM
  retenciones_ats.impuestos_reembolsos
  WHERE
  id_reembolso_documentos = ?
```

Campo | Tipo | Descripción
--------- | ------- | -----------
base_imponible | float | Base imponible. __Requerido__
valor | float | Valor del total. __Requerido__
tarifa | float | Porcentaje actual del impuesto expresado por un número entre 0.0 y 100.0 __Requerido__
codigo | string | Código del [tipo de impuesto](#tipos-de-impuesto) __Requerido__
codigo_porcentaje | string | Código del [porcentaje](#codigo-de-porcentaje-de-iva). __Requerido__

### Pagos de Documentos de Soporte

Información de los pagos asociados a un documento de soporte.

```sql
support_documents_payments = SELECT
  tipo_pago,
  total
  FROM
  retenciones_ats.pagos_documentos_soporte
  WHERE
  id_documento_soporte = ?
```
