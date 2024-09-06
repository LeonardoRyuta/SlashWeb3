require("dotenv").config();

module.exports = {
  async getContractABI(address) {
    const response = await fetch(
      `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${process.env.ETHERSCAN_API_KEY}`
    );
    const data = await response.json();

    if (data.status === "0") {
      throw new Error(data.result);
    } else {
      // console.log(data.result);
      return JSON.parse(data.result);
    }
  },
};
