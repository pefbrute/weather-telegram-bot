const translate = require("translate"); // Old school

module.exports = async (townName) => {
  if (townName === "Йошкар-Ола") {
    townName = "Yoshkar-Ola";
  } else {
    translate.engine = "libre";
    translate.from = "ru";
    townName = await translate(townName, "en");
  }

  return await townName;
};
