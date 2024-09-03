const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Events,
  GatewayIntentBits,
  InteractionType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");
const { token } = require("./config.json");

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.on(Events.MessageCreate, (message) => {
  if (message.author.bot) return;

  let button = new ActionRowBuilder();
  button.addComponents(
    new ButtonBuilder()
      .setCustomId("verification-button")
      .setStyle(ButtonStyle.Primary)
      .setLabel("Open modal dialog")
  );
  message.reply({
    components: [button],
  });
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === "verification-button") {
      const modal = new ModalBuilder()
        .setCustomId("verification-modal")
        .setTitle("Verify yourself")
        .addComponents([
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId("verification-input")
              .setLabel("Answer")
              .setStyle(TextInputStyle.Short)
              .setMinLength(4)
              .setMaxLength(12)
              .setPlaceholder("ABCDEF")
              .setRequired(true)
          ),
        ]);

      await interaction.showModal(modal);
    }
  }

  if (interaction.type === InteractionType.ModalSubmit) {
    if (interaction.customId === "verification-modal") {
      const response =
        interaction.fields.getTextInputValue("verification-input");
      interaction.reply(`Yay, your answer is submitted: "${response}"`);
    }
  }
});

client.once("ready", () => {
  console.log("Bot v14 is connected...");
});

client.login(token);
