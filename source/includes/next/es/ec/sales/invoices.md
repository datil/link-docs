## Facturas

Una factura está representada por un objeto _Invoice_.


### El objeto Invoice

Atributos |  &nbsp;
--------- | -----------
number<p class="dt-data-type">string</p> | Número completo de la factura. Es un número secuencial que se forma a partir de {código establecimiento}-{código pto. emisión}-{secuencia}
currency<p class="dt-data-type">string</p> | Código [ISO](https://en.wikipedia.org/wiki/ISO_4217) de la moneda.
issue_date<p class="dt-data-type">string</p> | Fecha de emisión en formato AAAA-MM-DDHoraZonaHoraria, definido en el estándar [ISO8601](http://tools.ietf.org/html/rfc3339#section-5.6).
totals<p class="dt-data-type">objeto [totals](#invoice-totals)</p> | Totales de la factura
customer<p class="dt-data-type">objeto [contact](#contact) | Información del comprador.
items<p class="dt-data-type">lista de [items](#invoice-item)</p> | Bienes o servicios facturados.
uuid<p class="dt-data-type">string</p> | La clave de acceso de la factura. La clave de acceso es un identificador único del comprobante. Si esta información no es provista, Dátil la generará.<br>¿Cómo [generar](#clave-de-acceso) la clave de acceso?
properties<p class="dt-data-type">objeto</p> | Información adicional adjunta al comprobante en forma de diccionario. Ejemplo:<br>` {"plan": "Inicial", "vigencia": "1 mes"}`
payments<p class="dt-data-type">lista de [payments](#payment)</p> | Pagos realizados a la factura.
payment_methods<p class="dt-data-type">lista de [payment_methods](#payment-method)</p> | Listado de formas de pago aplicables a la factura.
payment_terms | Objeto de [payment_terms](#payment-terms) | Información del crédito directo otorgado al cliente.
electronic_document<p class="dt-data-type">string</p> | Documento electrónico, el XML.
electronic_document_url<p class="dt-data-type">string</p> | URL de descarga del documento electrónico, el XML.
printable_version_url<p class="dt-data-type">string</p> | URL de descarga del RIDE.


<h4 id="invoice-totals">Totals</h4>

Atributos | &nbsp;
--------- | -------
total_discount_amount<p class="dt-data-type">string</p> | Subtotal sin impuestos
subtotal_amount<p class="dt-data-type">string</p> | Subtotal sin impuestos
total_tax_amount<p class="dt-data-type">string</p> | Total de impuestos recaudados
total_amount<p class="dt-data-type">string</p> | Total final.

<h4 id="invoice-item">Item</h4>

Atributos | &nbsp;
--------- | -------
description<p class="dt-data-type">string</p> | Descripción del ítem.
sku<p class="dt-data-type">string</p> | Código alfanumérico de uso del comercio. Máximo 25 caracteres.
quantity<p class="dt-data-type">string</p> | Cantidad de items.
unit_price<p class="dt-data-type">string</p> | Precio unitario.
unit_discount<p class="dt-data-type">string</p> | El descuento aplicado para este item, expresado en valor monetario.
discount<p class="dt-data-type">string</p> | El descuento aplicado para este item, expresado en valor monetario.
subtotal_amount<p class="dt-data-type">string</p> | Subtotal antes de impuestos. Se obtiene multiplicando `quantity` por `unit_price` menos `discount`
unit_of_measurement<p class="dt-data-type">string</p> | Unidad de medida, ejemplos: l, kg, cm
taxes | listado de [impuestos](#item-taxes) | Impuestos grabados sobre el producto.
properties | hash | Diccionario de datos de carácter adicional. Ejemplo:<br><code>{"marca": "Ferrari", "chasis": "UANEI832-NAU101"}</code>


#### Payment

Atributos | &nbsp;
--------- | -------
date<p class="dt-data-type">string</p> | Fecha de recepción del pago en formato AAAA-MM-DDHoraZonaHoraria, definido en el estándar [ISO8601](http://tools.ietf.org/html/rfc3339#section-5.6).
method <p class="dt-data-type">string</p> | Código del método de pago según [4461 UN/CEFACT standard v06B](http://www.unece.org/trade/untdid/d16a/tred/tred4461.htm)
amount <p class="dt-data-type">string</p> | Valor pagado
properties<p class="dt-data-type">object</p> | Información adicional adjunta al pago en forma de diccionario. Ejemplo:<br>` {"bank": "Safe Bank", "account_number": "1020304050"}`


#### Payment method

Atributos | &nbsp;
--------- | -------
due_date<p class="dt-data-type">string</p> | Fecha de vencimiento en formato AAAA-MM-DDHoraZonaHoraria, definido en el estándar [ISO8601](http://tools.ietf.org/html/rfc3339#section-5.6).
method <p class="dt-data-type">string</p> | Código del método de pago según [4461 UN/CEFACT standard v06B](http://www.unece.org/trade/untdid/d16a/tred/tred4461.htm)
amount <p class="dt-data-type">string</p> | Valor a pagar por este medio.
properties<p class="dt-data-type">object</p> | Información adicional. Ejemplo:<br>` {"bank": "Safe Bank", "account_number": "1020304050"}`


### Emisión de una factura

#### Operación

`POST /locations/:location-id/sales/invoices/issue`
#### Requerimiento

> ##### Requerimiento de ejemplo

```shell
curl -v https://link.datil.co/location/31a8edd4-cf56-4435-a387-7bf1d2eb94e1/invoices/issue \
-H "Content-Type: application/json" \
-H "X-Api-Key: <API-key>" \
-H "X-Password: <clave-certificado-firma>" \
-d '{
      "country": "EC",
      "device_id": "9008edd4-cf56-4435-a387-7bf1d2eb9aef",
      "sequence": 2,
      "uuid": "2211201601099022690300110010030000011701993241014",
      "issue_date": "2016-11-22 23:00:00",
      "customer": {
        "tax_identification_type": "31",
        "properties": [],
        "address": "Carrera 10 Calle 1",
        "email": "w@datil.co",
        "phone": "57122222222222",
        "locality": "Bogota DC",
        "sublocality": "Centro",
        "tax_identification": "1050320-1",
        "tax_level_code": "2",
        "person": {
          "first_name": "Juan",
          "middle_name": "A.",
          "last_name": "Argüello"
        },
        "administrative_district_level_1": "Guayas",
        "country": "EC"
      },
      "taxes": [
        {
          "amount": 419046.82,
          "tax_code": "03",
          "tax_rate": 4.14,
          "rate_code": "3",
          "taxable_amount": 10121904.00
        },
        {
          "amount": 1619504.64,
          "tax_code": "01",
          "tax_rate": 16.00,
          "rate_code": "3",
          "taxable_amount": 10121904.00
        }
      ],
      "totals": {
        "subtotal_amount": 10121904.00,
        "total_tax_amount": 2038551.46,
        "total_amount": 12160455.46,
      }
      "currency": "USD",
      "items": [
        {
          "description": "Apple",
          "properties": {
            "key": "size",
            "value": "M"
          },
          "unit_discount": "1.00",
          "unit_code": "units",
          "unit_price": "4.3256",
          "id": "afb0110982731abc",
          "subtotal_amount": "6.65",
          "quantity": "2"
        }
      ],
      "properties": [
         {
           "key": "Contract Number",
           "value": "420420"
         }
       ],
       "payments": [
         {
           "properties": {
             "account_number": "2223XXXX23",
             "bank": "Bancolombia"
           },
           "amount": 1.09,
           "method": "42"
         }
       ],
  }'
```

```python
import requests, json

invoice = {
      "country": "EC",
      "location_code": "001",
      "device_id": "9008edd4-cf56-4435-a387-7bf1d2eb9aef",
      "sequence": 2,
      "uuid": "12345-12345-12345-12345-12345",
      "issue_date": "2016-11-22 23:00:00",
      "customer": {
        "tax_identification_type": "31",
        "properties": [],
        "address": "Carrera 10 Calle 1",
        "email": "w@datil.co",
        "phone": "57122222222222",
        "locality": "Bogota DC",
        "sublocality": "Centro",
        "tax_identification": "1050320-1",
        "tax_level_code": "2",
        "person": {"first_name": "Juan",
                   "middle_name": "A.",
                   "last_name": "Argüello"},
        "administrative_district_level_1": "Guayas",
        "country": "EC"
      },
      "taxes": [
        {
          "amount": 419046.82,
          "tax_code": "03",
          "tax_rate": 4.14,
          "rate_code": "3",
          "taxable_amount": 10121904.00
        },
        {
          "amount": 1619504.64,
          "tax_code": "01",
          "tax_rate": 16.00,
          "rate_code": "3",
          "taxable_amount": 10121904.00
        }
      ],
      "totals": {
        "subtotal_amount": 10121904.00,
        "total_tax_amount": 2038551.46,
        "total_amount": 12160455.46,
      }
      "currency": "USD",
      "items": [
        {
          "description": "Apple",
          "properties": {
            "key": "size",
            "value": "M"
          },
          "unit_discount": 0.00,
          "unit_code": "units",
          "unit_price": 43256.00,
          "id": "ABC",
          "subtotal_amount": 10121904.00,
          "total_amount": 1.15,
          "quantity": 234
        }
      ],
      "properties": [
         {
           "key": "Contract Number",
           "value": "420420"
         }
       ],
       "payments": [
         {
           "properties": {
             "account_number": "2223XXXX23",
             "bank": "Bancolombia"
           },
           "amount": 1.09,
           "method": "42"
         }
       ],
  }
headers = {
    'x-api-key': '<clave-del-api>',
    'x-password': '<clave-certificado-firma>',
    'content-type': 'application/json'}
response = requests.post(
<<<<<<< HEAD
    "https://api.datil.co/locations/31a8edd4-cf56-4435-a387-7bf1d2eb94e1/sales/invoices/issue",
=======
    "https://api.datil.co/locations/31a8edd4-cf56-4435-a387-7bf1d2eb94e1/invoices/issue",
>>>>>>> 368399f08433ab5ea8b8df2f12f4cb8b35995f3d
    headers = headers,
    data = json.dumps(invoice))
```


Para la emisión de una factura se debe enviar la información completa de la
venta. Las facturas emitidas con un API key de pruebas, serán enviadas al
ambiente de pruebas del SRI.

Parámetros | &nbsp;
---------- | -----------
sequence<p class="dt-data-type">opcional</p> | Número entero positivo mayor a cero
currency<br>__requerido__ | Código [ISO](https://en.wikipedia.org/wiki/ISO_4217) de la moneda.
issue_date<p class="dt-data-type">opcional</p> | Fecha de emisión en formato AAAA-MM-DDHoraZonaHoraria, definido en el estándar [ISO8601](http://tools.ietf.org/html/rfc3339#section-5.6).
totals<p class="dt-data-type">objeto tipo [totals](#invoice-totals)</p> | Totales de la factura
customer<p class="dt-data-type">objeto tipo [contact](#contact) | Información del comprador.
items<p class="dt-data-type">arreglo de [items](#invoice-item)</p> | Bienes o servicios vendidos.
uuid<p class="dt-data-type">string</p> | La clave de acceso de la factura. La clave de acceso es un identificador único del comprobante. Si esta información no es provista, Dátil la generará.<br>¿Cómo [generar](#clave-de-acceso) la clave de acceso?
properties<p class="dt-data-type">objeto</p> | Información adicional adjunta al comprobante en forma de diccionario. Ejemplo:<br>` {"plan": "Inicial", "vigencia": "1 mes"}`
payments<p class="dt-data-type">arreglo [payment](#payment)</p> | Pagos realizados a la factura.
payment_methods<p class="dt-data-type">arreglo [payment_method](#payment_method)</p> | Listado de formas de pago aplicables a la factura.
payment_terms | Objeto de tipo [credito](#cr-dito) | Información del crédito directo otorgado al cliente.


##### Totals

Parámetro           | Tipo                    | Descripción
------------------- | ----------------------- |-----------
total_sin_impuestos | float | Total antes de los impuestos. __Requerido__
descuento_adicional | float | Descuento aplicado al subtotal de la factura expresado en valor monetario.
descuento           | float | Suma de los descuentos de cada ítem y del descuento adicional. __Requerido__
propina             | float | Propina total, llamado también servicio. __Requerido__
importe_total       | float | Total incluyendo impuestos. __Requerido__
impuestos           | listado de objetos [total impuesto](#total-impuesto) | Listado de impuesto totalizados. __Requerido__

##### Payments

Parámetro   | Tipo         | Descripción
----------- | ------------ | ----------
fecha       | string       | Fecha de recepción del pago en formato AAAA-MM-DDHoraZonaHoraria, definido en el estándar [ISO8601](http://tools.ietf.org/html/rfc3339#section-5.6). Si no es especificado se utiliza la fecha y hora actual.
medio       | string       | Código del [tipo de forma de pago](#tipos-de-forma-de-pago). __Requerido__
total       | float        | Total aplicable a la forma de pago especificada. __Requerido__
propiedades | objeto       | Información adicional adjunta al pago en forma de diccionario. Ejemplo:<br>` {"plazo": "30", "unidad_tiempo": "dias"}`

##### Payment terms

Parámetro           | Tipo    | Descripción
------------------- | ------- | ----------
fecha_vencimiento   | string  | Fecha de vencimiento en formato AAAA-MM-DD, definido en el estándar [ISO8601](http://tools.ietf.org/html/rfc3339#section-5.6). __Requerido__
monto               | float   | Monto otorgado de crédito. __Requerido__


Retorna un objeto **[invoice](#el-objeto-invoice)** que incluye un nuevo parámetro `id`,
el cual identifica de manera única a la factura. El campo `clave_acceso` generado
también se incluirá como parte de la respuesta.

### Consulta de una factura

Consulta una factura para obtener toda la información del comprobante,
incluyendo el estado de autorización del mismo.
El atributo `status` de la respuesta obtenida al invocar esta operación, indica
el estado actual del comprobante.

Si es necesario conocer en detalle el estado del [proceso de emisión](#proceso-de-emisión),
se debe examinar el atributos `authorization` de la factura.

#### Operación

`GET /locations/:location-id/sales/invoices/:invoice-id`

#### Requerimiento

> ##### Requerimiento de ejemplo

```shell
curl -v https://link.datil.co/invoices/<invoice-id> \
-H "Content-Type: application/json" \
-H "X-Api-Key: <clave-del-api>" \
-H "X-Password: <clave-certificado-firma>" \
```

```python
import requests
cabeceras = {'x-key': '<clave-del-api>'}
respuesta = requests.get(
    'https://link.datil.co/invoices/<id-factura>',
    headers = cabeceras)
```

```c#
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace DatilClient {
  class InvoicingServiceClient {
    static void Main(string[] args) {

      var client = new RestClient("https://link.datil.co/");
      var idFactura = "<id-factura>";
      var request = new RestRequest("invoices/" + idFactura, Method.GET);
      request.AddHeader("X-Key", "<clave-del-api>");

      IRestResponse response = client.Execute(request);

      Console.WriteLine(response.Content);
    }
  }
}
```

Reemplaza en la ruta `<invoice-ID>` por el `id` de la factura que necesitas consultar.


#### Respuesta

> ##### Respuesta de ejemplo

```json
{
    "id": "abcf12343faad06785",
    "secuencial": "16",
    "fecha_emision": "2016-05-15",
    "version": "1.0.0",
    "clave_acceso": "1505201501099271255400110011000000000162092727615",
    "emisor": {
        "ruc": "0992712554001",
        "razon_social": "DATILMEDIA S.A.",
        "nombre_comercial": "Dátil",
        "direccion": null,
        "obligado_contabilidad": true,
        "contribuyente_especial": "",
        "establecimiento": {
            "codigo": "001",
            "direccion": "V.E. 112 Y CIRCUNVALACION NORTE",
            "punto_emision": "100"
        }
    },
    "estado": "AUTORIZADO",
    "correos_enviados": [
        {
            "fecha_envio": "2015-05-15T16:36:48.274604",
            "destinatarios": "juanantonioplaza@datilmedia.com"
        }
    ],
    "guia_remision": "",
    "moneda": "USD",
    "informacion_adicional": [],
    "ambiente": "1",
    "totales": {
        "total_sin_impuestos": "150.00",
        "descuento": "0.00",
        "propina": "0.00",
        "impuestos": [
            {
                "codigo": 2,
                "codigo_porcentaje": "2",
                "base_imponible": "150.00",
                "valor": "18.00"
            }
        ],
        "importe_total": "168.00"
    },
    "comprador": {
        "razon_social": "Carlos L. Plaza",
        "identificacion": "0900102222",
        "tipo_identificacion": 1,
        "email": "cplaza@gye593.com",
        "direccion": "Calle Uno y Calle Dos",
        "telefono": "043334445"
    },
    "envio_sri": {
        "mensajes": [],
        "estado": "RECIBIDA",
        "fecha": ""
    },
    "tipo_emision": "1",
    "items": [
        {
            "detalles_adicionales": {
                "Estadía": "2 noches",
                "Habitación": "203"
            },
            "cantidad": "1.000000",
            "codigo_principal": "HAB",
            "codigo_auxiliar": "DOB",
            "descripcion": "Habitación doble",
            "precio_unitario": "150.000000",
            "descuento": "0.00",
            "precio_total_sin_impuestos": "",
            "impuestos": [
                {
                    "tarifa": "12.00",
                    "codigo": "2",
                    "codigo_porcentaje": "2",
                    "base_imponible": "150.00",
                    "valor": "18.00"
                }
            ],
            "unidad_medida": "Kilos"
        }
    ],
    "valor_retenido_iva": 70.40,
    "valor_retenido_renta": 29.60,
    "credito": {
        "fecha_vencimiento": "2016-06-28",
        "monto": 34.21
    },
    "pagos": [
      {
        "medio": "cheque",
        "total": 4882.68,
        "propiedades": {
          "numero": "1234567890",
          "banco": "Banco Pacífico"
        }
      }
    ],
    "compensaciones": [
      {
        "codigo": 1,
        "tarifa": 2,
        "valor": 2.00
      }
    ],
    "exportacion": {
      "incoterm": {
        "termino": "CIF",
        "lugar": "Guayaquil",
        "total_sin_impuestos": "CIF"
      },
      "origen": {
        "codigo_pais":"EC",
        "puerto": "Guayaquil"
      },
      "destino": {
        "codigo_pais":"CN",
        "puerto": "China"
      },
      "codigo_pais_adquisicion": "EC",
      "totales": {
        "flete_internacional": 1000.00,
        "seguro_internacional": 200.00,
        "gastos_aduaneros": 800,
        "otros_gastos_transporte": 350.00
      }
    }
    "autorizacion": {
        "estado": "AUTORIZADO",
        "mensajes": [
            {
                "identificador": "60",
                "mensaje": "ESTE PROCESO FUE REALIZADO EN EL AMBIENTE DE PRUEBAS",
                "tipo": "INFORMATIVO",
                "informacion_adicional": ""
            }
        ],
        "numero": "1505201516323509927125540010266935227",
        "fecha": "2015-05-15T16:32:35.000380"
    }
}
```

Parámetro | Tipo | Descripción
--------- | ------- | -----------
secuencial | string | Número de secuencia de la factura.
estado | string | Posibles valores: `AUTORIZADO`, `NO AUTORIZADO`, `ENVIADO`, `DEVUELTO`, `RECIBIDO`
fecha_emision | string | Fecha de emisión en formato AAAA-MM-DDHoraZonaHoraria, definido en el estándar [ISO8601](http://tools.ietf).
clave_acceso | string | La clave de acceso representa un identificador único del comprobante. Si esta información no es provista, Dátil la generará.<br>¿Cómo [generar](#clave-de-acceso) la clave de acceso?
envio_sri | objeto tipo [envio sri](#envío-sri) | Información luego de enviar el comprobante.
autorizacion | objeto tipo [autorizacion sri](#autorización-sri) | Información de la autorización.org/html/rfc3339#section-5.6).
emisor | objeto tipo [emisor](#emisor) | Información completa del emisor.
moneda | string | Código [ISO](https://en.wikipedia.org/wiki/ISO_4217) de la moneda.
ambiente | integer | Pruebas: `1`.<br>Producción `2`.<br>
totales | objeto tipo [totales](#totales) | Listado de totales.
comprador | objeto [persona](#persona) | Información del comprador.
tipo_emision | integer | Emisión normal: `1`.<br>Emisión por indisponibilidad: `2`<br>
items | listado de objetos tipo [item](#item-de-factura) | Items incluídos en la factura.
pagos | listado de objetos tipo [pagos](#pagos) | Listado de formas de pago aplicables a la factura.
credito | Objeto de tipo [credito](#cr-dito) | Información del crédito directo otorgado al cliente.
version | string | Versión de la especificación, opciones válidas: `1.0.0`, `1.1.0`

### Re-emisión de una factura

#### Operación

`POST /invoices/:id/reissue`

#### Requerimiento

Esta operación debe ser utilizada para corregir comprobantes NO AUTORIZADOS o
DEVUELTOS por el Servicio de Rentas Internas.

En la URL de esta opción se debe incluir el `id` de la factura recibida al
momento de emitirla.

El cuerpo del requerimiento es un objeto [factura](#requerimiento) con los
datos corregidos para que pueda ser procesado y autorizado.

#### Respuesta

Retornará un error si el comprobante se encuentra autorizado.