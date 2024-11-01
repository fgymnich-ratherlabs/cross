// Imports the Alchemy SDK
// Github: https://github.com/alchemyplatform/alchemy-sdk-js
const { Alchemy, Network } = require("alchemy-sdk");

// Configures the Alchemy SDK
const config = {
  apiKey: process.env.MAINNET_ALCHEMY_URL, // Replace with your API key
  network: Network.ETH_MAINNET, // Replace with your network
};

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);
const main = async () => {
  //Define the params object
  const params = {
    // Define the blockNumber of the transaction
    blockNumber: "0x18760312114f3fdf11f9d5846245995835aa59994d5fc4203faee52d2f7eaabe"
  };

  //The response returns the transaction receipts of the `blockNumber`
  console.log('Getting All Recepits:')
  let response = await alchemy.core.getTransactionReceipts(params);

  //Logging the response to the console
  console.log(response)
};

main();
