# Configuración avanzada

__Tablas o Vistas__

Para que la aplicación **Link** se conecte a su ERP o sistema contable se deben configurar
los *queries* para extraer información directamente de las tablas  de su base de datos.

Si no desea que **Link** consulte directamente sus tablas puede crear vistas con la información
de los comprobantes a emitir.

__Formato__

Los queries se guardan siguiendo el formato de archivos `.ini`. en el directorio
*C:/Archivos de Programa/Datil/Link/config/*.

En cada archivo `.ini` cada _query_ está asignado a una variable.

Si aún no ha instalado __Link__, puede crear un archivo `.ini` de respaldo con los queries configurados.

[Ver ejemplos de archivos de configuración](#ejemplos-de-archivos-de-configuracion)

__Nombres de tablas y columnas__

Sea directamente o por medio de vistas, dependiendo de su sistema, deberá cambiar los nombres de las tablas  al configurar los _queries_.

Los nombres de las columnas en las tablas
de su sistema pueden ser distintos pero el resultado de cada _query_ debe tener los nombres establecidos en esta documentación.

__Queries opcionales__

Algunos queries son opcionales porque la información que extraen no es obligatoria para el SRI, en este caso la variable que se configura en el archivo `.ini` debe tener asignada el valor de `None`.

Ejemplo:

`invoice_additional_information = None`

`item_details = None`

