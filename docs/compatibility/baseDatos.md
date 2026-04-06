---
title: Bases de datos
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Link utiliza ODBC para interactuar con la base de datos, por lo que si el
sistema de base de datos que utiliza tu sistema tiene un controlador ODBC Link
debería funcionar sin problemas.

Consulta la documentación del driver ODBC que utilizas para construir la cadena
de conexión (connection string). El sitio web [www.connectionstrings.com](https://www.connectionstrings.com/) también puede ser de utilidad. Este sitio tiene documentación sobre varios motores de base de datos y drivers ODBC.

Link ha sido probado y es utilizado en producción en estos motores de base de
datos.

### SQL Server

* SQL Server 2000
* SQL Server 2005
* SQL Server 2008
* SQL Server 2012
* SQL Server 2014


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