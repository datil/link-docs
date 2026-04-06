---
title: Base de datos
sidebar_position: 1
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Cómo lo describimos en la sección de *Introducción* Link utiliza una tabla de
control para mantener un registro de los documentos que ya ha procesado. Este
registro contiene información como el estado, la fecha de registro en la tabla
de control, la fecha y el número de autorización y el ID (id_externo) del
documento en Datil.

En el archivo [environment.ini](./entorno) va la configuración de la
conexión a la base donde se encuentran las tablas de control y mensaje.
En el archivo [companies/my company.ini](./company) debes
configurar la conexión a la base de datos donde están las tablas/vistas desde
las que Link extraerá la información de los documentos.

Esta separación permite a Link funcionar en estos escenarios:
- Emitir documentos de más de una compañía en un sistema ERP que almacena los
documentos de cada compañía en una base de datos diferente.
- Mantener la base de datos en la que puede _escribir_ Link completamente aislada
de la base de datos de la que sólo puede _leer_ Link.

A partir de la versión `6.0.0` existen dos maneras de especificar los
parámetros de conexión a la base de datos:

### Simplificada

Link tiene la capacidad de construir la cadena de conexión para los siguientes
drivers ODBC: SQL Anywhere 11, Microsoft ODBC for Oracle, Oracle in OraClient11g_home1,
Microsoft ODBC Driver for Oracle, SQL Server y Access ODBC Driver. Si utilizas alguno de estos drivers
debes especificar los siguientes parámetros:

Parámetros | &nbsp;
---------- | -----------
driver | Controlador cuando se establece una conexión por ODBC.
server | Dirección o nombre del servidor
name | Nombre de la base de datos
user | Nombre de usuario.
password | Contraseña del usuario de la base de datos
version<p class="dt-data-param-required">requerido</p> | Versión del motor de base de datos que se utiliza para constriur SQL dependiendo de la versión
connection_string | Permite especificar la cadena de conexión ODBC para conectarse a la base. Si especificas este parámetro todos los otros parámetros de conexión como driver, server, name, user y password serán ignorados. Debes especificar este parámetro o el conjunto de parámetros driver, server, name, user, password.
api<p class="dt-data-param-required">requerido</p> | Puede ser `odbc` o `adodb`
data_source<p class="dt-data-param-required">requerido</p> | Utilizado para conexiones tipo `adodb`
provider<p class="dt-data-param-required">requerido</p> | Utilizado para conexiones tipo `adodb`
datetime_format | Formato de la representación literal de un SQL_TIMESTAMP. Por ejemplo en SQL Server el literal de un `DATETIME` es %Y-%m-%d %H:%M:%S


### Cadena de conexión (connection string) explícita

La nueva manera a partir de la versión 6.0.0 de conexión sólo requiere que se
especifique el parámetro `connection_string`. Así es posible utilizar cualquier
motor de base de datos o controlador no soportado por la manera simplificada de
conexión.

Esta es la manera de conexión recomendada a partir de la versión 6.0.0 de Link.

#### Ejemplos

Ejemplos de configuración para sistemas de base de datos más comunes

<Tabs>
    <TabItem value="ini-sqlserver" label="SQL Server">
    ```
    driver = SQL Server
    server = ADMIN\SQLEXPRESS.
    name = DATIL
    user = link
    password = Link007
    version = 2012
    api = odbc
    datasource = None
    provider   = None
    ```
    </TabItem>
    <TabItem value="ini-oracle" label="Oracle">
    ```
    [DatabaseSource]
    driver = Microsoft ODBC for Oracle
    server = mydbserver
    name =
    user = link
    password = datil
    version = 10
    api = odbc
    data_source = None
    provider = None
    datetime_format = %Y-%m-%d %H:%M:%S.%f'
    ```
    </TabItem>
    <TabItem value="ini-mysql" label="MySQL">
    ```
    [DatabaseSource]
    connection_string = DRIVER={MySQL ODBC 8.0 ANSI Driver};SERVER=localhost;DATABASE=datil;USER=link;PASSWORD=Link007;OPTION=3
    driver =
    server =
    name =
    user =
    password =
    version = 8.0
    api = odbc
    data_source = None
    provider = None
    ```
    </TabItem> 

</Tabs>

Consulta la documentación del driver ODBC que utilizas, o busca en la sitio web
[www.connectionstrings.com](https://www.connectionstrings.com) la documentación
del motor de base de datos que utilizas.

