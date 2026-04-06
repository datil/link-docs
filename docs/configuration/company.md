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

### Sincronización y Eventos

Link tiene la habilidad de suscribirse a [eventos](https://datil.dev/next/events)
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
