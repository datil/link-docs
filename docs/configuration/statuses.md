---
title: Actualización de estados
sidebar_label: Estados
sidebar_position: 4
---


Link es capaz de ejecutar sentencias SQL basado en el estado de autorización del comprobante. Se puede de configurar el query `on_status_update` dentro del archivo de configuración del comprobante para almacenar información de autorización u otra información que se desee del documento en la base de datos. Este query se ejecutará cada vez que el comprobante esté en estado `POR AUTORIZAR` y `RECIBIDO`.

Ejemplo para guardar información de autorización para facturas

```sql
  on_status_update=INSERT INTO dbo.RESPUESTA_SRI_FACTURAS (
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
```

