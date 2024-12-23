require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0", // Use the Solidity version your contracts require
  networks: {
    besu: {
      url: "http://127.0.0.1:8546", // Besu JSON-RPC endpoint
      accounts: [
        "ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f" // Replace with the private key of an account on your Besu network
      ],
      chainId: 1337 // Replace with your Besu chain ID if different
    }
  }
};
