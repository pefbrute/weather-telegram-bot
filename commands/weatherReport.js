const weather = require("openweather-apis");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require("node-fetch");
const https = require("https");

let reportText = "";
let pressure = "";
let temperature = "";
let humidity = "";
let jsonDescription = "";
let description = "";
let url = "";

module.exports = function weatherReport(
  languageCode,
  town,
  token,
  pressureLanguage,
  temperatureLanguage,
  humidityLanguage,
  descriptionLanguage
) {
  url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    town +
    "&appid=" +
    token +
    "&lang=" +
    languageCode;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send();
  let json = JSON.parse(xhr.responseText);

  pressure = json.main.pressure;
  temperature = (json.main.temp - 273).toFixed(1);
  humidity = json.main.humidity;
  jsonDescription = json.weather[0].description;
  description = jsonDescription[0].toUpperCase() + jsonDescription.slice(1);

  reportText =
    pressureLanguage +
    ": " +
    pressure +
    "hPa" +
    "\n" +
    temperatureLanguage +
    ": " +
    temperature +
    "℃" +
    "\n" +
    humidityLanguage +
    ": " +
    humidity +
    "%" +
    "\n" +
    descriptionLanguage +
    ": " +
    description +
    "\n";

  return reportText;
};
