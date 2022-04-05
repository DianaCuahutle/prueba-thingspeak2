// INICIO DE MONITOREO Y WIFI
let VELOCIDAD = 0
let HUMEDAD = 0
let TEMPERATURA = 0
let DIRECCION = ""
weatherbit.startWeatherMonitoring()
// IDENTIFICA EN TIEMPO REAL LA DIRECCION DEL VIENTO REPRESENTADO EN FLECHAS
basic.forever(function () {
    if (DIRECCION == "N") {
        basic.showArrow(ArrowNames.North)
    } else if (DIRECCION == "NE") {
        basic.showArrow(ArrowNames.NorthEast)
    } else if (DIRECCION == "NW") {
        basic.showArrow(ArrowNames.NorthWest)
    } else if (DIRECCION == "E") {
        basic.showArrow(ArrowNames.East)
    } else if (DIRECCION == "W") {
        basic.showArrow(ArrowNames.West)
    } else if (DIRECCION == "S") {
        basic.showArrow(ArrowNames.South)
    } else if (DIRECCION == "SE") {
        basic.showArrow(ArrowNames.SouthEast)
    } else {
        basic.showArrow(ArrowNames.SouthWest)
    }
})
basic.forever(function () {
    ESP8266_IoT.connectThingSpeak()
    ESP8266_IoT.connectWifi("WiFi_CCAI", "Tese2022")
    ESP8266_IoT.setData(
    "UJSZ2C9SEIBCK00U",
    TEMPERATURA,
    HUMEDAD,
    VELOCIDAD
    )
    ESP8266_IoT.uploadData()
})
// CALCULO Y ENVIO DE DATOS
basic.forever(function () {
    DIRECCION = weatherbit.windDirection()
    HUMEDAD = weatherbit.humidity()
    TEMPERATURA = weatherbit.temperature()
    VELOCIDAD = weatherbit.windSpeed()
    serial.writeValue("T", Math.idiv(TEMPERATURA, 100))
    basic.pause(100)
    serial.writeValue("H", Math.idiv(HUMEDAD, 100))
    basic.pause(100)
    serial.writeValue("V", VELOCIDAD)
    basic.pause(100)
    serial.writeLine(DIRECCION)
    basic.pause(100)
})
