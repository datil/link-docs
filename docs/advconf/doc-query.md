---
title: Consulta de documentos
sidebar_position: 6
---


La información que Link consulta cuando un documento ha sido emitido y el query `on_status_update` ha sido definido son los mismos detallados en la [consulta de documentos](https://datil.dev/#envio-sri). Se puede acceder y personalizar la sentencia SQL utilizando las etiquetas [Jinja2](http://jinja.pocoo.org/)

> #### Ejemplo para guardar autorizacion de facturas

```sql
on_status_update = {% if autorizacion is defined %}
INSERT INTO dbo.RESPUESTA_SRI_FACTURSA (
  id,
  numero,
  clave_acceso,
  codig_estado
) VALUES (
  {{ id_local }},
  {{ autorzacio.numero }},
  {% if autorizacion.numero == 'AUTORIZADO' %} 
    100
  {% else %}
    0
  {% endif %}
)
```