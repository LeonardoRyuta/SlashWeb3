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

const modal = new ModalBuilder().setCustomId("myModal").setTitle("My Modal");

const favoriteColorInput = new TextInputBuilder()
  .setCustomId("favoriteColorInput")
  .setLabel("What's your favorite color?")
  .setStyle(TextInputStyle.Short);

const hobbiesInput = new TextInputBuilder()
  .setCustomId("hobbiesInput")
  .setLabel("What's some of your favorite hobbies?")
  .setStyle(TextInputStyle.Paragraph);

const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

modal.addComponents(firstActionRow, secondActionRow);

const interact = new ButtonBuilder()
  .setCustomId("interact")
  .setLabel("Interact")
  .setStyle(ButtonStyle.Primary);

const row = new ActionRowBuilder().addComponents(interact);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("contract")
    .setDescription("Creates a smart contract frontend."),
  async execute(interaction) {
    const response = await interaction.reply({
      content: "Interact with the smart contract (0x0000) below:",
      components: [row],
    });

    const collectorFilter = (i) => i.user.id === interaction.user.id;
    try {
      const confirmation = await response.awaitMessageComponent({
        filter: collectorFilter,
        time: 60_000,
      });

      if (confirmation.customId === "interact") {
        // await confirmation.update({
        //   content: `Interacting with the smart contract (0x0000)...`,
        //   components: [],
        // });
        await interact.showModal(modal);
      }
    } catch (e) {
      await interaction.editReply({
        content: "Confirmation not received within 1 minute, cancelling",
        components: [],
      });
    }
  },
};
