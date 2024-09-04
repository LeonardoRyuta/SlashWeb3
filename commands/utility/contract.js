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

const modal = new ModalBuilder()
  .setCustomId("contractCreation-modal")
  .setTitle("You are interacting with a smart contract")
  .addComponents([
    new ActionRowBuilder().addComponents(
      new TextInputBuilder()
        .setCustomId("contract-address")
        .setLabel("Contract Address")
        .setStyle(TextInputStyle.Short)
        .setPlaceholder("0x00000")
        .setRequired(true)
    ),
  ]);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("contract")
    .setDescription("Creates a smart contract frontend."),
  async execute(interaction) {
    await interaction.showModal(modal);
  },
};
