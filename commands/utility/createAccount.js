// const { Web3AuthNoModal } = require("@web3auth/no-modal");
// const { EthereumPrivateKeyProvider } = require("@web3auth/ethereum-provider");

// const chainConfig = {
//   chainId: "0x1",
//   rpcTarget: "https://rpc.ankr.com/eth",
//   displayName: "Ethereum Mainnet",
//   blockExplorerUrl: "https://etherscan.io/",
//   ticker: "ETH",
//   tickerName: "Ethereum",
//   logo: "https://images.toruswallet.io/eth.svg",
// };

// const privateKeyProvider = new EthereumPrivateKeyProvider({
//   config: { chainConfig },
// });

// const web3auth = new Web3AuthNoModal({
//   clientId:
//     "BK7GsSU2TkxC_U86tlvhgACH5VPyAvmlH6uOjteRlVpZqkkvxOIwL1MHpEfhn4calobJocl7br_oxoyLQurE5nE",
//   web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
//   privateKeyProvider,
// });

const { SlashCommandBuilder } = require("discord.js");
const { Wallet } = require("ethers");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("createaccount")
    .setDescription("Creates a smart wallet account for the user."),
  async execute(interaction) {
    // interaction.user is the object representing the User who ran the command
    // interaction.member is the GuildMember object, which represents the user in the specific guild
    await interaction.user.send("Creating account...");

    // await interaction.reply(
    //   `This command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
    // );
  },
};
