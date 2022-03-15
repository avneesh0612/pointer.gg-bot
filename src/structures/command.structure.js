/**
 *
 * @param {Discord.Message | Discord.Interaction} msg
 * @param {string[]} args
 * @param {Client} client
 */

function RunFunction() {}

class Command {
  name() {
    return "";
  }
  aliases() {
    return [];
  }
  description() {
    return "";
  }
  run(msg, args, client) {
    RunFunction(msg, args, client);
  }

  constructor(options) {
    this.name = options.name;
    this.aliases = options.aliases;
    this.description = options.description;
    this.run = options.run;
  }
}

module.exports = Command;
