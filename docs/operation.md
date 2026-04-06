---
title: Operación
sidebar_position: 7
---


En el menú `Inicio` buscar el `Simbolo del Sistema` , darle click derecho y escoger la opción `Ejecutar como administrador`.

Luego para iniciar el servicio ejecutar el comando:

`net start datilink`

Enter.

Si desea detener el servicio, ejecutar:

`net stop datilink`

### Registros (logs)

Los archivos de registro se guardan en la carpeta `logs` dentro del directorio de instalación de Link (junto a `config`). El nivel de detalle se controla con `level` en la sección `[Log]` del archivo `environment.ini`. Para ver por qué un comprobante no avanza, conviene dejar `DEBUG` mientras afinas la configuración y luego pasar a `INFO` o `ERROR`.

### Si algo no emite

Revisa en la tabla **Control** el `estado` del documento y los mensajes en la tabla **Mensaje** para esa misma fila. Con eso suele bastar para saber si el problema fue antes del SRI, en la respuesta del SRI o en los datos que salen de tu base.

### Respaldo

Antes de actualizar Link conviene copiar toda la carpeta `config`. Los logs no suelen ser obligatorios de respaldar salvo que soporte te pida un historial concreto.
