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
issue_receipts_from_database<p class="dt-data-param-required">requerido</p> | Habilitar la emisión de documentos desde la base de datos
issue_receipts_from_xml<p class="dt-data-param-required">requerido</p> | Habilitar la emisión de documentos desde archivos en formato xml
update_control_table<p class="dt-data-param-required">requerido</p> | Habilitar el control de los documentos emitidos desde la tabla de Control

### [DatabaseSource]

Revisa la sección de configuración de [base de datos](./database) para más
información

### [Log]
Esta configuración permite el registro de actividades dentro de la aplicación.

Parámetros | &nbsp;
---------- | -----------
level<p class="dt-data-param-required">requerido</p> | Nivel de los registros (En el caso de que se esté configurando por primera vez la aplicación se recomienda mantener el nivel de `DEBUG`) Valores posibles: `INFO`, `DEBUG` y `ERROR`. 
interval<p class="dt-data-param-required">requerido</p> | Intervalo de tiempo en horas que se genera un nuevo archivo de registros
backup_count<p class="dt-data-param-required">requerido</p> | Cantidad de archivos de registros guardados

### [Sync] 
Esta configuración hace referencia a la sincronización de documentos de forma general en la aplicación.

Parámetros | &nbsp;
---------- | -----------
enabled<p class="dt-data-param-required">requerido</p> | Habilitar la sincronización de documentos
update_tables | Habilitar la actualización de tablas cuando se sincronicen los documentos
download_files | Habilitar la descarga de archivos cuando se sincronicen los documentos

### [EventTypeCodes]
Para esta configuración se debe especificar el nombre del documento con el evento y como valor se le asigna el código numérico del evento.
Ejemplo:
`invoice.issued = 21`
`invoice.received = 11`
<p class="dt-data-param-required">requerido</p>

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
