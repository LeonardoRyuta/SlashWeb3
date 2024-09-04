const {
  Events,
  InteractionType,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const fs = require("fs");
const { modalResponse } = require("../utils/modalResponse");
const { selectMenuResponse } = require("../utils/selectMenuResponse");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (interaction.isButton()) {
      const modal = new ModalBuilder();

      if (interaction.customId === "contractInteract-button") {
        modal
          .setCustomId("contractInteract-modal")
          .setTitle("You are interacting with a smart contract")
          .addComponents([
            new ActionRowBuilder().addComponents(
              new TextInputBuilder()
                .setCustomId("verification-input")
                .setLabel("Answer")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder("ABCDEF")
                .setRequired(true)
            ),
          ]);
        await interaction.showModal(modal);
      } else if (interaction.customId.startsWith("contractInteract-button-")) {
        const address = interaction.customId.split("-")[2];
        const response = interaction.customId.split("-")[3];

        const abi = JSON.parse(fs.readFileSync(address + ".json", "utf-8"));

        const method = abi.filter((item) => item.name === response);

        if (method[0].inputs.length > 0) {
          modal
            .setCustomId("contractInteract-modal")
            .setTitle("You are interacting with a smart contract")
            .addComponents(
              method[0].inputs.map((input) =>
                new ActionRowBuilder().addComponents(
                  new TextInputBuilder()
                    .setCustomId(input.name)
                    .setLabel(input.name)
                    .setStyle(TextInputStyle.Short)
                    .setPlaceholder(input.type)
                    .setRequired(true)
                )
              )
            );
          await interaction.showModal(modal);
        }
      }
    }

    if (interaction.type === InteractionType.ModalSubmit) {
      await modalResponse(interaction);
    }

    if (interaction.isStringSelectMenu()) {
      await selectMenuResponse(interaction);
    }

    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    }
  },
};
