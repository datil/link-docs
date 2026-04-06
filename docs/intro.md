---
title: Introducción
sidebar_position: 1
---

# Introducción

Integra tu sistema contable o ERP con Facturación Electrónica. La aplicación
**Link** de Dátil te permite emitir todos los tipos de comprobantes
electrónicos: facturas, retenciones, notas de crédito, notas de débito,
guías de remisión y liquidaciones de compra.

**Link** se instala como un servicio del sistema operativo. De esta manera se mantiene
en ejecución permanente para revisar periódicamente la base de datos en busca de
comprobantes a emitir.


**¿Cómo funciona?**

- Link consulta los documentos utilizando las sentencias SQL de los archivos de
configuración.
- Registra los nuevos documentos detectados en una tabla de Control.
- La *tarea de emisión* de Link toma de la tabla de Control el ID del documento
(id_local) en las tablas o vistas del ERP y consulta toda la información de
todas las tablas/vistas relacionadas establecidas en la configuración.
- Si el intento de emisión del documento fue exitoso, Link actualiza la tabla
de Control con el estado _RECIBIDO_
- La *tarea de consulta de resultado* consulta al [servicio de Dátil](https://datil.dev)
el estado de autorización del documento hasta obtener un estado final (AUTORIZADO,
NO AUTORIZADO o DEVUELTO).

