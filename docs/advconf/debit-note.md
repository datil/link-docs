---
title: Nota de débito
sidebar_position: 6
---

Los queries para la emisión electrónica de __notas de débito__ se guardan en el archivo de configuración `debit_note.ini`.

[Ejemplo de archivo debit_note.ini](../../static/config/receipts/debit_note.ini)

La forma de los datos es parecida a la de la nota de crédito (cabecera, emisor, comprador, totales, impuestos, ítems o motivos, información adicional). Los nombres de tablas y columnas en tu sistema los defines tú en cada `SELECT`; lo importante es que el resultado use los **nombres de campo** que espera el servicio, igual que en los demás comprobantes.

Para el detalle de campos puedes apoyarte en la [documentación del API de Dátil](https://datil.dev/#emision-de-una-nota-de-debito) y, para un modelo de tablas de ejemplo, en la sección de notas de débito dentro de [Tablas de nota de crédito / débito](../tables/credit-note).

### Cabecera

Obtiene la información principal de la nota de débito.

```sql
headers = SELECT TOP :limit
  id         id_local,
  secuencial,
  fecha_emision,
  moneda,
  clave_acceso,
  tipo_emision,
  fecha_emision_documento_modificado,
  numero_documento_modificado,
  tipo_documento_modificado
  FROM
  notas_de_debito.cabecera
  WHERE
  id in (:sequence)
  ORDER BY id :order
```

Campo | Descripción
--------- | -----------
id_local | Identificador único del documento en tu base. __Requerido__
secuencial | Secuencial del comprobante. __Requerido__
fecha_emision | Fecha de emisión. __Requerido__
moneda | Código ISO de la moneda. __Requerido__
clave_acceso | Opcional; si no envías valor, Dátil puede generarla.
tipo_emision | Normal `1`, indisponibilidad `2`. __Requerido__
fecha_emision_documento_modificado | Del documento que se afecta. __Requerido__
numero_documento_modificado | Número del documento modificado. __Requerido__
tipo_documento_modificado | Código de tipo de documento según el estándar. __Requerido__

### Emisor y comprador

Usa consultas análogas a las de [nota de crédito](./credit-note) (`debit_note_seller`, `debit_note_buyer`), apuntando a tus tablas o vistas.

### Totales e impuestos

- `debit_note_totals`: totales generales.  
- `debit_note_totals_taxes`: desglose de impuestos por línea de totales.

### Motivos o ítems

`debit_note_causes` (o equivalente en tu modelo) lista el motivo y el valor de cada cargo.

### Información adicional

`debit_note_additional_information` para pares nombre / valor, si aplica.

### Queries de control en el ERP

Si guardas estado o mensajes en tablas propias del ERP, configura también las sentencias de actualización e inserción que correspondan (por ejemplo actualizar estado, clave de acceso, autorización), siguiendo el mismo criterio que en los otros `receipts/*.ini`.
