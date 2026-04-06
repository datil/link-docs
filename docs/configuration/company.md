---
title: Archivo ini de la compañía
sidebar_label: Compañía
sidebar_position: 3
---

Recomendamos renombrar este archivo con un nombre
corto de tu empresa, sobretodo si vas a utilizar una instalación de Link para
varias empresas. Link utiliza el nombre de este archivo para garantizar que los
registros en la tabla de *control* sean únicos para cada compañía, esto es lo
que verás en el campo `company_name` una vez que Link empiece a funcionar e
inserte registros en la tabla de control.
Utiliza sólo letras, números, guiones o sub-guiones para el nombre del archivo.
Ejemplo: `acme_inc`

### Varias empresas en la misma instalación

Puedes tener varios archivos en `companies/`, por ejemplo `acme_inc.ini` y `otra_empresa.ini`. Cada uno lleva su RUC, su sección `[Api]` y su conexión `[DatabaseSource]`. En la tabla **Control**, el campo `company_name` coincide con el nombre del archivo (sin `.ini`) para que los documentos de una empresa no se mezclen con los de otra.

Cuando **varias empresas comparten la misma base de datos del ERP** (las mismas tablas de facturas, notas, etc.), además debes usar la sección `[Search]` para que Link solo lea los documentos de esa compañía.

### [Search]

Va en el mismo archivo ini de la compañía (`companies/tu_empresa.ini`).

Parámetros | &nbsp;
---------- | -----------
field_name | Nombre de la columna en tus tablas (o vistas) que identifica a la empresa. Ejemplo: `codigo_empresa`, `id_compania`.
field_value | Valor que corresponde a **esta** compañía en esa columna. Si en SQL debe ir entre comillas, inclúyelas aquí. Ejemplo numérico: `1`. Ejemplo texto: `'ACME'`.

Si en tu base solo hay una empresa o cada empresa tiene su propia base, deja los dos en `None`.

Link arma un fragmento de condición (` AND ` + columna + ` = ` + valor) y lo coloca donde en los queries del comprobante hayas puesto el marcador `:company_search`. También puede sustituir los marcadores `:company_field_name` y `:company_field_value` en las sentencias de `invoice.ini`, `credit_note.ini`, etc., según las necesite cada consulta.

Ejemplo: dos empresas en la misma tabla `facturas.factura`. En `acme.ini` pones `field_name = codigo_empresa` y `field_value = 1`. En `contoso.ini` los mismos nombres de campo con `field_value = 2`. En los `SELECT` que buscan documentos nuevos (`all_stored_locally`, `not_controlled`, `not_controlled_first_time`, etc.) debes añadir en el `WHERE` el marcador `:company_search` (u otros que uses) para que el filtro se aplique.

### [General]
En la sección `[General]` configura el parámetro `ruc` con el ruc de la empresa.

Parámetros | &nbsp;
-------------------  | ----------
enabled<p class="dt-data-param-required">requerido</p> | Habilitar la emisión de documentos para la compañía
ruc<p class="dt-data-param-required">requerido</p> | RUC de la compañía que emitirá los documentos

### [Api]

En la sección `[Api]` configuran los siguientes parámetros:

Parámetro           | Tipo                    | Descripción
------------------- | ----------------------- | ----------
xkey<p class="dt-data-param-required">requerido</p> | string | API Key para emitir documentos. Esta información se encuentra en la configuración de la compañía en el portal web
xpassword<p class="dt-data-param-required">requerido</p> | string | Contraseña del certificado de firma electrónica
environment<p class="dt-data-param-required">requerido</p> | integer | Pruebas: `1`. Producción `2`.

La API Key y la contraseña del certificado las obtienes en el portal de Dátil, en la configuración de la compañía. **`xpassword`** es la contraseña del archivo de firma electrónica que subiste; debe ser la misma que figura aquí. Mientras pruebas dejas `environment = 1`; cuando pases a facturar en real cambias a `2`.

### [IssueFromDatabase]

Los parámetros de esta sección te permiten encender o apagar la *tarea de emisión*
desde la base de datos para cada tipo de comprobante para esta compañía. Los
posibles valores para estos parámetros son `yes` o `no`. El valor `yes` le
indica a Link que debe encender la tarea y `no` que debe apagarla.
Ejemplo: `credit_note = yes`

### [IssueFromXml]

Estos parámetros permiten encender o apagar la *tarea de emisión por xml* desde archivos con el formato XML para cada tipo de comprobante para esta compañía. Los posibles valores para estos parámetros son `yes` o `no`. El valor `yes` le
indica a Link que debe encender la tarea y `no` que debe apagarla.
Ejemplo: `invoice = yes`

### [Read]
Estos parámetros permiten encender o apagar la *tarea de consulta* de
autorización.

### [DatabaseSource]

Revisa la sección de configuración de [base de datos](#base-de-datos) para más
información.

### [XmlSource]

Configuración de las rutas de los directorios donde se encuentran los archivos
XML. Esto aplica para la emisión por XML. Para esta configuración se debe especificar el nombre del documento y como valor se le asigna la ruta en la que se encuentra el tipo de documento.
Ejemplo: `invoice = C:\\Program Files\Facturas`

### [XmlSourcePattern]

Configuración del patrón del nombre de los archivos XML que contienen la información de los documentos a emitirse. Para esta configuración se debe especificar el nombre del documento y como valor la asignación del prefijo asociado al archivo XML.
Ejemplo: `invoice = FA`

### Emisión por XML en la práctica

1. En `environment.ini` activa `issue_receipts_from_xml = yes` y revisa `issue_receipts_from_xml_interval` en `[Scheduler]`.
2. En el ini de la compañía, en `[IssueFromXml]`, pon `yes` solo en los comprobantes que quieras tomar desde archivos.
3. En `[XmlSource]` define la carpeta de cada tipo. En `[XmlSourcePattern]` el prefijo o patrón del nombre del archivo.
4. Reinicia el servicio para aplicar cambios.

Si un XML tiene errores o no coincide con el patrón, revisa la carpeta `logs` y, si aplica, los mensajes en tu base.

### Sincronización y Eventos

Link tiene la habilidad de suscribirse a [eventos](https://datil.dev/#eventos)
emitidos por Datil y ejecutar sentencias SQL y descargar archivos. Cualquier
atributo del evento que contenga la dirección a un recurso (URI) válido puede
ser descargado y almacenado en un directorio del sistema.

El nombre de la sección para cada configuración es el nombre del evento, de
esta manera podrás tener configuraciones diferentes para cada evento.

Estos son los parámetros de configuración para cada evento:

Parámetros | &nbsp;
---------- | -----------
download_files<p class="dt-data-param-required">requerido</p> | Activa o inactiva el proceso de descarga de archivos. Puede ser _yes_ o _no_
update_tables<p class="dt-data-param-required">requerido</p> | Activa o inactiva el proceso de ejecución de SQL. Puede ser _yes_ o _no_
formats_to_download<p class="dt-data-param-required">requerido</p> | Especifica este valor si `download_files` está activo. Puede ser una lista de valores separados por coma o la palabra reservada *all*. Si utilizas la palabra *all* intentará descargar los archivos detallados en este mismo parámetro en la sección [Sync] del archivo environment.ini
download_path | Ruta del directorio donde se descargará los archivos. Requerido si `download_files` está activo.
download_path_[ATRIBUTO] | Ruta del directorio donde se descargarán los archivos para el atributo _"ATRIBUTO"_. Puedes personalizar esta ruta utilizando condicionales, lazos, macros, bloques, variables, etiquetas disponibles en [Jinja2](http://jinja.pocoo.org/).
update_tables_sentences | Sentencias SQL a ejecutar cuando el evento sea recibido. Puedes personalizar este SQL utilizando condicionales, lazos, macros, bloques, variables disponibles en [Jinja2](http://jinja.pocoo.org/). Requerido si `update_tables` está activo.

<h4 class="dt-section">Ejemplo de descarga en un solo directorio</h4>

```ini
[invoice.received]
download_files = yes
update_tables = yes
formats_to_download = printable_version_url, electronic_document_url
download_path = C:/Documentos Recibidos/
update_tables_sentences = UPDATE factura
  SET numero_autorizacion = '{{ authorization.number }}'
  WHERE numero = '{{ number }}'
```

De esta manera podrías, por ejemplo, actualizar información en una tabla de tu
base de datos y descargar el PDF (`printable_version_url`) y el documento
electrónico XML (`electronic_document_url`) cada vez que en tu cuenta Dátil
recibas una factura de compra (invoice.received). La configuración luciría así:

<h4 class="dt-section">Ejemplo de descarga con un directorio diferente para cada archivo</h4>

```ini
[invoice.received]
download_files = yes
update_tables = yes
formats_to_download = printable_version_url, electronic_document_url
download_path_printable_version_url = C:/Documentos Recibidos/{{ issue_date_date.year }}/{{ issue_date_month_name }}/pdf/
download_path_electronic_document_url = C:/Documentos Recibidos/{{ issue_date_date.year }}/{{ issue_date_month_name }}/xml/
update_tables_sentences = UPDATE factura
  SET numero_autorizacion = '{{ authorization.number }}'
  WHERE numero = '{{ number }}'
```

Si quisieras almacenar los archivos en directorios separados podrías configurar
el evento de esta manera.

<aside class="notice">
El nombre del archivo tomará el nombre establecido por el servidor del
archivo a través de la cabecera HTTP Content-Disposition. Si esta cabecera no
está presente, se utilizará el ID del recurso contenido en el evento para dar
nombre al archivo.
</aside>



:::note Nota
El nombre del archivo tomará el nombre establecido por el servidor del archivo a través de la cabecera HTTP Content-Disposition. Si esta cabecera no está presente, se utilizará el ID del recurso contenido en el evento para dar nombre al archivo.
:::
