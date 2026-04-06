---
title: Guía del primer día
sidebar_position: 2
---

Esta página ordena los pasos para dejar Link funcionando. El detalle de cada punto está en las secciones que enlazamos aquí.

1. **Revisar requisitos**  
   Comprueba que tu equipo cumple lo indicado en [Requisitos](./compatibility/requisitos) y descarga el instalador en [Descarga](./download).

2. **Instalar Link**  
   Sigue [Instalación](./installation). Link queda como servicio de Windows.

3. **Tablas Control y Mensaje**  
   Link necesita esas tablas en la base donde registrará el avance de cada comprobante. Crea la estructura como en [Control y mensaje](./tables/control).

4. **Archivo `receipt.ini`**  
   Ahí van las sentencias con las que Link lee y escribe en Control y Mensaje. Deben coincidir con tus nombres de tablas y esquema. Ver [Consultas a Control y Mensaje](./configuration/receipt-ini).

5. **Archivo `environment.ini`**  
   Zona horaria, conexión a la base de Control/Mensaje, intervalos de las tareas, logs, etc. Ver [Entorno](./configuration/environment).

6. **Archivo de la compañía** (`companies/tu_empresa.ini`)  
   RUC, API Key y ambiente (pruebas o producción), conexión a la base del ERP (donde están tus facturas u otros comprobantes), y qué tipos de documento van encendidos. Si **varias empresas usan la misma base del ERP**, configura además `[Search]` (`field_name` y `field_value`) y los marcadores en los queries de cada comprobante, como se explica en [Compañía](./configuration/company).

7. **Un archivo por tipo de comprobante**  
   En `config/receipts/` configura por ejemplo `invoice.ini`, `credit_note.ini`, etc., con los queries que leen tu ERP. La guía general está en [Configuración avanzada](./advconf/intro).

8. **Iniciar el servicio**  
   Como en [Operación](./operation). Si algo falla, baja el nivel de log a `DEBUG` en `environment.ini` y revisa la carpeta de registros.

Cuando uses **emisión por XML**, además debes poner `issue_receipts_from_xml = yes` en `environment.ini`, encender el tipo en `[IssueFromXml]` del ini de la compañía, y definir `[XmlSource]` y `[XmlSourcePattern]`. Los pasos concretos están en [Compañía](./configuration/company).
