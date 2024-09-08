const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");
const { getContractABI } = require("./contractsWizard");
const fs = require("fs");
const { Wallet, providers } = require("ethers");
require("dotenv").config();

module.exports = {
  async modalResponse(interaction) {
    let response;
    switch (interaction.customId) {
      case "contractCreation-modal":
        response = interaction.fields.getTextInputValue("contract-address");

        const ABI = await getContractABI(response);

        fs.writeFileSync(`${response}.json`, JSON.stringify(ABI, null, 2));

        const methods = ABI.filter((item) => item.type === "function");

        const options = methods
          .slice(0, 24) //find a way to be able to display more than 25 options
          .map((method) =>
            new StringSelectMenuOptionBuilder()
              .setLabel(method.name)
              .setValue(method.name)
          );

        const selectMenu = new StringSelectMenuBuilder()
          .setCustomId("contractMethod-select-" + response)
          .setPlaceholder("Select a method")
          .addOptions(options);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        await interaction.reply({
          content: `Choose a method from the contract (${response}) below:`,
          components: [row],
        });
        break;
      case "verification-modal":
        response = interaction.fields.getTextInputValue("verification-input");
        interaction.reply(`Yay, your answer is submitted: "${response}"`);
        break;
      case interaction.customId.startsWith("contractInteract-modal-")
        ? interaction.customId
        : "":
        const address = interaction.customId.split("-")[2];
        const methodName = interaction.customId.split("-")[3];

        const abi = JSON.parse(fs.readFileSync(address + ".json", "utf-8"));

        const method = abi.filter((item) => item.name === method);

        const inputs = method[0].inputs.map((input) =>
          interaction.fields.getTextInputValue(input.name)
        );

        console.log("menmonic", process.env.MNEMONIC);
        const wallet = Wallet.fromPhrase(process.env.MNEMONIC);

        const provider = new providers.JSONRPCProvider(
          "https://rpc2.sepolia.org"
        );

        break;
      default:
        break;
    }
  },
};
