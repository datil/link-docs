---
title: Consultas a Control y Mensaje
sidebar_label: Control
sidebar_position: 5
---

En el archivo `receipt.ini` (en la carpeta `config` de la instalación) van las sentencias SQL con las que Link trabaja sobre las tablas **Control** y **Mensaje**.

Esas tablas pueden estar en la misma base que tu ERP o en otra; la conexión se define en `[DatabaseSource]` del archivo [Entorno](./environment).

### ¿Para qué sirve?

- Registrar documentos nuevos y cambiar su estado durante la emisión y la consulta al SRI.  
- Guardar y borrar los mensajes de error o avisos asociados a cada registro de Control.

Si los nombres de tablas, esquemas o columnas en tu base no coinciden con el ejemplo del instalador, debes ajustar cada query en `receipt.ini` sin cambiar el **sentido** de lo que hace cada una (insertar en Control, actualizar estado, etc.).

### Relación con los comprobantes

Este archivo es **único** para toda la instalación. Los archivos `invoice.ini`, `credit_note.ini` y demás describen cómo leer los datos del comprobante en tu ERP; `receipt.ini` describe cómo Link habla con Control y Mensaje.

### Ejemplo

En la instalación por defecto viene un `receipt.ini` de referencia (pensado para SQL Server y nombres como `dbo.Control`). Úsalo como punto de partida y adáptalo a tu motor y convenciones.
