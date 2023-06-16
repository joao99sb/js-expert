import database from "./../database.json" assert { type: "json" };
import { Person } from "./person.js";
import { save } from "./repository.js";
import TerminalController from "./terminalController.js";

const DEFAULT_LANG = "pt-br";
const STOP_TERMINAL = ":q";

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function main() {
  try {
    const answer = await terminalController.question("");

    if (answer === STOP_TERMINAL) {
      terminalController.closeTerminal();
      console.log("Process finished!");
      return;
    }

    const person = Person.generateInstanceFromString(answer);
    terminalController.updateTable(person.fromatted(DEFAULT_LANG));
    save(person);
    return main();
  } catch (error) {
    console.error("Error: ", error);
    return main();
  }
}

await main();
