---
title: Consulta de documentos
sidebar_position: 7
---


La información que Link consulta cuando un documento ha sido emitido y el query `on_status_update` ha sido definido son los mismos detallados en la [consulta de documentos](https://datil.dev/#envio-sri). Se puede acceder y personalizar la sentencia SQL utilizando las etiquetas [Jinja2](http://jinja.pocoo.org/)

> #### Ejemplo para guardar autorización de facturas

El SQL exacto depende de tus tablas; la idea es usar las variables que expone Link (plantillas [Jinja2](http://jinja.pocoo.org/)) como en la guía de [actualización de estados](../configuration/statuses).

```sql
on_status_update = {% if autorizacion is defined %}
INSERT INTO dbo.RESPUESTA_SRI_FACTURAS (
  id,
  numero_documento,
  clave_acceso,
  fecha_autorizacion
) VALUES (
  {{ id }},
  {{ autorizacion.numero }},
  {{ clave_acceso }},
  {{ autorizacion.fecha }}
)
{% endif %}
```