require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
})

const PRIVATE_KEY = process.env.POLYGON_PRIVATE_KEY
const RPC_URL = process.env.POLYGON_RPC_URL

// Helper function to validate private key format
function isValidPrivateKey(key) {
  if (!key) return false
  // Remove 0x prefix if present
  const cleanKey = key.startsWith('0x') ? key.slice(2) : key
  // Private key should be exactly 64 hex characters (32 bytes)
  return /^[0-9a-fA-F]{64}$/.test(cleanKey)
}

const networks = {
  hardhat: {}
}

// Only add polygon network if private key is valid
if (PRIVATE_KEY && isValidPrivateKey(PRIVATE_KEY)) {
  networks.polygon = {
    url: RPC_URL || "https://polygon-rpc.com",
    accounts: [PRIVATE_KEY]
  }
}

module.exports = {
  solidity: "0.8.10",
  defaultNetwork: "hardhat",
  networks: networks
};