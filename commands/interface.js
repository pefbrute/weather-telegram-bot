module.exports = function init(languageCode) {
  switch (languageCode) {
    case "ru":
      return {
        inlineLanguageButton: {
          reply_markup: {
            inline_keyboard: [
              [
                // { text: "Погода по картам", callback_data: "WM" },
                { text: "Русский", callback_data: "ru" },
                { text: "Английский", callback_data: "en" },
              ],
            ],
          },
        },

        inlineMessage: "Выберите нужную опцию",
        inlineButton: {
          reply_markup: {
            inline_keyboard: [
              [
                // { text: "Погода по картам", callback_data: "WM" },
                { text: "Погода по названию города", callback_data: "CN" },
                {
                  text: "Выберите язык",
                  callback_data: "Language",
                },
              ],
            ],
          },
        },

        inlineLanguageMessage: "Выберите язык",
        townChoice: "Введите название города",

        pressureLanguage: "Давление",
        temperatureLanguage: "Температура",
        humidityLanguage: "Влажность",
        descriptionLanguage: "Описание",
      };

    case "en":
      return {
        inlineLanguageButton: {
          reply_markup: {
            inline_keyboard: [
              [
                // { text: "Погода по картам", callback_data: "WM" },
                { text: "Russian", callback_data: "ru" },
                { text: "English", callback_data: "en" },
              ],
            ],
          },
        },

        inlineMessage: "Select needed option",
        inlineButton: {
          reply_markup: {
            inline_keyboard: [
              [
                // { text: "Погода по картам", callback_data: "WM" },
                { text: "Weather by town name", callback_data: "CN" },
                { text: "Language", callback_data: "Language" },
              ],
            ],
          },
        },

        inlineLanguageMessage: "Select language",
        townChoice: "Enter town name",

        pressureLanguage: "Pressure",
        temperatureLanguage: "Temperature",
        humidityLanguage: "Humidity",
        descriptionLanguage: "Description",
      };
  }
};
