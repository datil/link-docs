---
title: Entorno
sidebar_position: 2
---

La configuración general de la aplicación __Link-App__ se guardan en el archivo de configuración `environment.ini`.
A continuación se describen las configuraciones de ambiente necesarias para el correcto funcionamiento de Link-app.

### [General]

Parámetros | &nbsp;
---------- | -----------
timezone<p class="dt-data-param-required">requerido</p> | Zona horaria 
service_name | Nombre del servicio de Windows. Por defecto suele ser `Datilink`; debe coincidir con el nombre con el que inicias o detienes el servicio (`net start` / `net stop`).
send_email | `yes` o `no`. Activa el envío de correos usando la sección [Notification].
send_status | Reporte de estado del servicio (uso interno o avanzado; en muchas instalaciones se deja en `no`).
sync_resources | Sincronización de recursos con la nube; enciende o apaga esa función a nivel general.
create_tables | Si Link puede crear las tablas Control y Mensaje al iniciar cuando no existen. En producción muchas veces se prefiere crearlas a mano y dejar `no`.
issue_receipts_from_database<p class="dt-data-param-required">requerido</p> | Habilitar la emisión de documentos desde la base de datos
issue_receipts_from_xml<p class="dt-data-param-required">requerido</p> | Habilitar la emisión de documentos desde archivos en formato xml
update_control_table<p class="dt-data-param-required">requerido</p> | Habilitar el control de los documentos emitidos desde la tabla de Control
read_receipts | Habilitar la tarea que consulta el estado de autorización en Dátil.
app_dirname | Nombre de la carpeta de la aplicación en la instalación (por defecto `Link`). Solo hace falta cambiarlo en casos especiales.
encoding | Codificación de textos al leer o escribir archivos, por ejemplo `latin-1` o `utf-8`, según tu entorno.

### [DatabaseSource]

Revisa la sección de configuración de [base de datos](./database) para más
información

### [Log]
Esta configuración permite el registro de actividades dentro de la aplicación.

Parámetros | &nbsp;
---------- | -----------
level<p class="dt-data-param-required">requerido</p> | Nivel de los registros (En el caso de que se esté configurando por primera vez la aplicación se recomienda mantener el nivel de `DEBUG`) Valores posibles: `INFO`, `DEBUG` y `ERROR`. 
when | Tipo de rotación del archivo de log (por ejemplo `H` por horas). Va junto con `interval`.
interval<p class="dt-data-param-required">requerido</p> | Cada cuántas unidades de `when` se abre un archivo de registro nuevo (por ejemplo cada 12 horas si `when = H` e `interval = 12`).
backup_count<p class="dt-data-param-required">requerido</p> | Cantidad de archivos de registros guardados

### [Sync] 
Esta configuración hace referencia a la sincronización de documentos de forma general en la aplicación.

Parámetros | &nbsp;
---------- | -----------
enabled<p class="dt-data-param-required">requerido</p> | Habilitar la sincronización de documentos
update_tables | Habilitar la actualización de tablas cuando se sincronicen los documentos
download_files | Habilitar la descarga de archivos cuando se sincronicen los documentos
formats_to_download | Lista de formatos a descargar cuando aplica (por ejemplo `printable_version`, `electronic_document`), o según lo que uses con eventos.
file_name_encoding | Codificación para nombres de archivo en descargas, por ejemplo `utf-8`.

### [EventTypeCodes]
Para esta configuración se debe especificar el nombre del documento con el evento y como valor se le asigna el código numérico del evento.
Ejemplo:
`invoice.issued = 21`
`invoice.received = 11`
<p class="dt-data-param-required">requerido</p>

### [EventResourceStates]

Etiquetas que Link puede escribir en tu base cuando sincroniza recursos ligados a eventos: por ejemplo estado *en proceso*, *correcto* o *error*. Los valores por defecto suelen bastar; solo cámbialos si tu ERP espera textos distintos en esas columnas.

### [Scheduler]

Las tareas de emisión, consulta y sincronización se ejecutan al iniciar el
servicio y luego esperan el tiempo establecido por estos parámetros antes de
volver a ejecutarse. Todos estos valores se especifican en segundos.

Parámetros | &nbsp;
---------- | -----------
issue_receipts_interval<p class="dt-data-param-required">requerido</p> | Intervalo para la tarea de *emisión* de documentos.
read_receipts_interval<p class="dt-data-param-required">requerido</p> | Intervalo para la tarea de *consulta de estado* de documentos.
issue_receipts_from_xml_interval<p class="dt-data-param-required">requerido</p> | Intervalo para la tarea de *emisión por xml*.
send_status_interval<p class="dt-data-param-required">requerido</p> | Intervalo para la tarea de reporte de estado (aun no utilizada)
sync_resources_interval<p class="dt-data-param-required">requerido</p> | Intervalo para la tarea de *sincronización de recursos*.


### [Constraints]

Restricciones para la consulta de documentos.

Parámetros | &nbsp;
---------- | -----------
issue_limit<p class="dt-data-param-required">requerido</p> | Número máximo de documentos que la tarea de *emisión* de documentos toma cada vez que se ejecuta. Existe un problema conocido en bases de datos ORACLE que impide establecer este parámetro en un valor diferente a uno.
issue_order<p class="dt-data-param-required">requerido</p> | Determina el ordenamiento de los documentos consultados para emitir. Puede ser `ASC` o `DESC`
get_info_limit<p class="dt-data-param-required">requerido</p> | Número máximo de documentos que la tarea de *consulta de estado* de documentos toma cada vez que se ejecuta.
get_info_order<p class="dt-data-param-required">requerido</p> | Determina el ordenamiento de los documentos consultados para obtener su estado. Puede ser `ASC` o `DESC`
first_receipt_date<p class="dt-data-param-required">requerido</p> | Establece la fecha a partir de la cual necesitas emitir documentos. La fecha debe tener el formato `YYYY-mm-dd hh:MM:SS` ejemplo: `2002-09-12 13:40:00` para el 12 de septiembre del año 2002 a las trece horas con cuarenta minutos y cero segundos.
max_days_to_query<p class="dt-data-param-required">requerido</p> | El número máximo de días previos a consultar a partir de la fecha actual. Normalmente se configura con 30 puesto que es el límite de fecha de emisión establecido por el SRI para emitir un documento electrónico.
new_receipts_limit<p class="dt-data-param-required">requerido</p> | Número máximo de documentos que la tarea de *control* inserta a la tabla de Control cada vez que se ejecuta.

### [Api]

Ajustes de tiempo de espera y reintentos hacia los servicios de Dátil. Las URLs (`host`, `sync_url`, `ack_url`, etc.) en una instalación normal **no se modifican** salvo indicación de soporte.

Parámetros | &nbsp;
---------- | -----------
timeout | Segundos máximos de espera por petición.
max_attemps | Número de reintentos ante fallos de red o servidor.
host | URL base del servicio de emisión.
status_url, commands_url, sri_auth_url, sync_url, ack_url | Endpoints usados por el conector; no los cambies si no sabes el impacto.

### [ApiPaths]

Rutas relativas de cada operación (factura, nota de crédito, guía, etc.). En prácticamente todas las instalaciones se dejan los valores que vienen con el programa.

### [Notification]

Correo para avisos (alertas del servicio). Debes indicar correo de destino, remitente y la clave del proveedor de envío que use Link.

Parámetros | &nbsp;
---------- | -----------
dest_email | Correo que recibe las notificaciones.
sender_email | Correo que aparece como remitente.
email_api_key | Clave del API de correo. Trátala como un secreto: no la compartas ni la subas a repositorios públicos.

### [Gui]

Si tu instalación incluye panel gráfico, `update_panel_interval` indica cada cuántos segundos se refresca la información en pantalla.

### [States]

Lista de estados internos que Link reconoce para los comprobantes (separados por coma). Solo interviene en configuraciones avanzadas o personalizadas.

### [Errors]

Mensajes o fragmentos de texto que Link usa para decidir si debe reintentar emisión, pasar a consulta de estado, marcar duplicado, etc. También incluye errores “suaves” de base de datos y cuántas veces pueden repetirse antes de aplicar una pausa.

Parámetros | &nbsp;
---------- | -----------
solve_with_issue | Errores ante los que conviene intentar emitir de nuevo.
solve_with_reading | Errores ante los que conviene consultar estado en el SRI.
solve_with_reading_if_issued | Caso especial si el documento ya fue emitido.
solve_with_sri_authorize | Mensajes que llevan a otro flujo de autorización.
solve_with_set_duplicated | Texto que identifica duplicados.
database_soft_errors | Errores de conexión o bloqueos que no detienen el servicio de golpe.
database_soft_errors_threshold | Cuántas veces puede repetirse ese tipo de error antes de actuar con más cautela.
throttle_time_seconds | Segundos de espera cuando se aplica un freno temporal tras errores repetidos de base de datos.
