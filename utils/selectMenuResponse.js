const {
  SlashCommandBuilder,
  ActionRowBuilder,
  Events,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const fs = require("fs");

module.exports = {
  async selectMenuResponse(interaction) {
    if (!interaction.customId.startsWith("contractMethod-select-")) return;

    const address = interaction.customId.split("-")[2];
    console.log(address);
    let response = interaction.values[0];

    const abi = JSON.parse(fs.readFileSync(address + ".json", "utf-8"));

    const method = abi.filter((item) => item.name === response);

    const interact = new ButtonBuilder()
      .setCustomId(`contractInteract-button-${address}-${response}`)
      .setLabel(response)
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(interact);

    await interaction.reply({
      content: `Interact with the smart contract (${response}) below:`,
      components: [row],
    });

    //create a modal to allow the user to fill in any arguments for the selected method, then submit the contract

    // const modal = new ModalBuilder()
    //   .setCustomId("contractInteract-modal")
    //   .setTitle("You are interacting with a smart contract")
    //   .addComponents(
    //     method[0].inputs.map((input) =>
    //       new ActionRowBuilder().addComponents(
    //         new TextInputBuilder()
    //           .setCustomId(input.name)
    //           .setLabel(input.name)
    //           .setStyle(TextInputStyle.Short)
    //           .setPlaceholder(input.type)
    //           .setRequired(true)
    //       )
    //     )
    //   );

    // await interaction.showModal(modal);
  },
};
