const fs = require("fs");
const { Telegraf } = require("telegraf");
const dotenv = require("dotenv").config();
// const translate = require("translate"); // Old school

const commandsFolder = "./commands/";
const commandsCollection = {};
const API_TOKEN = process.env.API_TOKEN;
let pressureLanguage = "";
let temperatureLanguage = "";
let humidityLanguage = "";
let descriptionLanguage = "";
let inlineLanguageMessage = "";
let inlineMessage = "";
let townChoice = "";
let answerText = "";
let languageCode = "en";
let answerCounter = 0;
let inlineButton = {};
let inlineLanguageButton = {};
let interfaceObject = {};
let fileName = "";
let townName = "";

fs.readdir(commandsFolder, (err, files) => {
  files.forEach((file) => {
    fileName = file.substring(0, file.length - 3);
    commandsCollection[fileName] = require("." + commandsFolder + fileName);
  });
});

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.command("start", (ctx) => {
  languageCode = ctx.message.from.language_code;

  if (languageCode !== "en" && languageCode !== "ru") {
    languageCode = "en";
  }

  languageCode = "ru";

  try {
    interfaceObject = commandsCollection["interface"](languageCode);

    inlineLanguageButton = interfaceObject.inlineLanguageButton;
    inlineMessage = interfaceObject.inlineMessage;
    inlineButton = interfaceObject.inlineButton;
    inlineLanguageMessage = interfaceObject.inlineLanguageMessage;
    townChoice = interfaceObject.townChoice;
    pressureLanguage = interfaceObject.pressureLanguage;
    temperatureLanguage = interfaceObject.temperatureLanguage;
    humidityLanguage = interfaceObject.humidityLanguage;
    descriptionLanguage = interfaceObject.descriptionLanguage;

    ctx.reply(inlineMessage, inlineButton);
  } catch {
    console.log("Something is wrong");
  }
});

bot.action("Language", (ctx) => {
  ctx.reply(inlineLanguageMessage, inlineLanguageButton);
});

bot.action("ru", (ctx) => {
  languageCode = "ru";

  interfaceObject = commandsCollection["interface"](languageCode);

  inlineLanguageButton = interfaceObject.inlineLanguageButton;
  inlineMessage = interfaceObject.inlineMessage;
  inlineButton = interfaceObject.inlineButton;
  inlineLanguageMessage = interfaceObject.inlineLanguageMessage;
  townChoice = interfaceObject.townChoice;
  pressureLanguage = interfaceObject.pressureLanguage;
  temperatureLanguage = interfaceObject.temperatureLanguage;
  humidityLanguage = interfaceObject.humidityLanguage;
  descriptionLanguage = interfaceObject.descriptionLanguage;

  ctx.reply(inlineMessage, inlineButton);
});

bot.action("en", (ctx) => {
  languageCode = "en";
  interfaceObject = commandsCollection["interface"](languageCode);

  inlineLanguageButton = interfaceObject.inlineLanguageButton;
  inlineMessage = interfaceObject.inlineMessage;
  inlineButton = interfaceObject.inlineButton;
  inlineLanguageMessage = interfaceObject.inlineLanguageMessage;
  townChoice = interfaceObject.townChoice;
  pressureLanguage = interfaceObject.pressureLanguage;
  temperatureLanguage = interfaceObject.temperatureLanguage;
  humidityLanguage = interfaceObject.humidityLanguage;
  descriptionLanguage = interfaceObject.descriptionLanguage;

  ctx.reply(inlineMessage, inlineButton);
});

bot.action("CN", (ctx) => {
  ctx.reply(townChoice);

  answerCounter = 1;
});

bot.on("message", async (msg) => {
  if (answerCounter === 1) {
    try {
      townName = msg.update.message.text;
      townName = await commandsCollection["translation"](townName);

      answerText = commandsCollection["weatherReport"](
        languageCode,
        townName,
        API_TOKEN,
        pressureLanguage,
        temperatureLanguage,
        humidityLanguage,
        descriptionLanguage
      );

      msg.reply(answerText);

      msg.reply(inlineMessage, inlineButton);
      answerCounter = 0;
    } catch {
      console.log("Something is wrong");
    }
  }
});

bot.launch();

process.on("uncaughtException", (err) => {
  console.log(err);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
});
