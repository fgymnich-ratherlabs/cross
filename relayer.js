const { ethers } = require('ethers');
require('dotenv').config();

const RPC_URL = process.env.RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const SOURCE_CONTRACT_ADDRESS = process.env.SOURCE_CONTRACT_ADDRESS;
const DESTINATION_CONTRACT_ADDRESS = process.env.DESTINATION_CONTRACT_ADDRESS;
const ABI_SOURCE = /* ABI of source contract */;
const ABI_DESTINATION = /* ABI of destination contract */;

// Initialize provider
const provider = new ethers.JsonRpcProvider(RPC_URL);

// Initialize wallet and signer
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// Initialize contracts
const sourceContract = new ethers.Contract(SOURCE_CONTRACT_ADDRESS, ABI_SOURCE, provider);
const destinationContract = new ethers.Contract(DESTINATION_CONTRACT_ADDRESS, ABI_DESTINATION, wallet);

// Function to handle the event and relay the message
const relayMessage = async (sender, message, receiver, event, proof) => {
  try {
    // Verify proof of event
    if (!verify(proof)) throw new Error("invalid proof");

    console.log(`Relaying message from ${sender} to ${receiver}: ${message}`);

    // Call the destination contract's method to relay the message
    const tx = await destinationContract.relayMessage(receiver, message, {
      gasLimit: 500000, // Adjust gas limit as needed
    });

    console.log("Relaying message... Waiting for confirmation.");
    await tx.wait();
    console.log("Message relayed successfully with transaction hash:", tx.hash);

  } catch (error) {
    console.error("Error relaying message:", error);
  }
};

const verify = (proof) => {
    return true;
}

// Listen for the event on the source contract
sourceContract.on("MessageEvent", (sender, message, receiver, event, proof) => {
  console.log(`Received MessageEvent from ${sender} to ${receiver}: ${message}`);
  
  // Relay the message to the destination contract
  relayMessage(sender, message, receiver, event, proof);
});

console.log("Relayer is listening for events...");

