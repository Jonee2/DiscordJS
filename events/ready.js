const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("../config.json");
const rest = new REST({ version: "10" }).setToken(token);

async function clientReadyHandler(client) {
  console.log(`Ready! Logged in as ${client.user.tag}`);

  try {
    console.log(`Started refreshing ${client.commands.length} commands`);

    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      {
        body: client.commands.map((command) => {
          return command.data.toJSON();
        }),
      }
    );
    console.log(`Successfully reloaded ${data.length} commands!`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  clientReadyHandler,
};
