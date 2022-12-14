require("dotenv").config();
const fs = require("fs");

//local imports
const populate = require("./dataManager/populate");
const ioManagerClass = require("./ioManager/ioManager");
const userClass = require("./user/userClass");
const executingCommands = require("./helperFunction/executeCommand");

const filename = process.argv[2];
let inputLines, funds;

fs.readFile(filename, "utf8", (err, data) => {
  if (err) throw err;
  inputLines = data.toString().split("\n");
});

const main = async () => {
  // populating the json file at every run of main function to always have the updated data
  // await populate(); if you want to repopulate your data with updated data then uncomment this

  // creating the ioManager Object(input-output manager)
  ioManager = new ioManagerClass();

  // getting the funds data
  funds = await ioManager.readFundsAsync(process.env.funds_input_source);

  // initializing portfolio of a user
  const user = new userClass();

  // parsing the input command and getting return as an object of commands as key and fund name as value
  inputLines.forEach((input) => {
    const commandsObject = ioManager.getParsedCommand(input);
    executingCommands(user, commandsObject, funds); //executing the commands
  });
};

main();
