---
title: Control y mensaje
sidebar_position: 1
---

Link utiliza dos tablas indispensables para su operación: Control y Mensaje. En la tabla de Control registra los documentos que debe procesar y el estado de cada uno de ellos. Puedes crear estas tablas en la misma base de datos de tu ERP o en una distinta.

Crea la tabla de control y mensaje, y agrega los siguientes índices:


```sql title="Tabla de control"
CREATE TABLE Control (
    id_control bigint IDENTITY(1,1) NOT NULL PRIMARY KEY,
    tipo_comprobante int NOT NULL,
    id_local varchar(100) NOT NULL,
    numero_comprobante varchar(20) NOT NULL,
    estado varchar(13),
    numero_autorizacion varchar(100),
    fecha_autorizacion datetime,
    fecha_emision datetime,
    fecha_ingreso datetime,
    fecha_ultimo_envio datetime,
    clave_acceso varchar(50),
    id_externo varchar(40),
    company_name varchar(40),
    CONSTRAINT ix_tipo_idlocal UNIQUE (tipo_comprobante, id_local, numero_comprobante, company_name)
  )
```

```sql title="Tabla de mensaje"
CREATE TABLE
    Mensaje(
    id_control bigint,
    identificador varchar(5) NOT NULL,
    mensaje TEXT NOT NULL,
    tipo varchar(50) NOT NULL,
    fecha_creacion datetime NOT NULL,
    CONSTRAINT pk_comprobante_identificador PRIMARY KEY (id_control, identificador),
    CONSTRAINT fk_control_id FOREIGN KEY (id_control) REFERENCES Control(id_control)
  );
```
```sql title="Indices"
CREATE NONCLUSTERED INDEX estado ON Control
(
    tipo_comprobante ASC,
    estado ASC,
    company_name ASC
) WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON PRIMARY

ALTER TABLE Control ADD  CONSTRAINT ix_tipo_idlocal UNIQUE NONCLUSTERED
(
    tipo_comprobante ASC,
    id_local ASC,
    numero_comprobante ASC,
    company_name ASC
) WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON PRIMARY

CREATE NONCLUSTERED INDEX IX_Control_tipo_fecha ON Control
(
    tipo_comprobante ASC,
    fecha_emision ASC,
    company_name ASC
) WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON PRIMARY
```
