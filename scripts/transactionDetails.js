const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Using deployer account:", deployer.address);

    const txHash = "0xffe7fdab1594bfc87bdeacc58978466bb22bcb6a9b22c51c163e42f9d703b543";  // Replace with your tx hash

    // Fetch the transaction data
    const tx = await ethers.provider.getTransaction(txHash);
    if (!tx) {
        console.log("Transaction not found");
        return;
    }

    console.log("\nTransaction Details:");
    console.log("Transaction Hash:", tx.hash);
    console.log("From:", tx.from);
    console.log("To:", tx.to);
    console.log("Value (in wei):", tx.value.toString());
    console.log("Gas Limit:", tx.gasLimit.toString());
    console.log("Gas Price:", tx.gasPrice ? tx.gasPrice.toString() : "N/A"); // Gas price might not be available
    console.log("Nonce:", tx.nonce);
    console.log("Block Number:", tx.blockNumber);
    console.log("Data (Payload):", tx.data);

    // Fetch the transaction receipt for more details like gas used and status
    const receipt = await ethers.provider.getTransactionReceipt(txHash);
    if (!receipt) {
        console.log("Receipt not found");
        return;
    }

    console.log("\nTransaction Receipt Details:");
    console.log("Block Number:", receipt.blockNumber);
    console.log("Block Hash:", receipt.blockHash);
    console.log("Gas Used:", receipt.gasUsed.toString());
    console.log("Status:", receipt.status ? "Success" : "Failed");
    console.log("Logs:", receipt.logs);  // If logs are emitted during the transaction

    // Get Network Information
    const network = await ethers.provider.getNetwork();
    console.log("\nNetwork Information:");
    console.log("Network Name:", network.name);
    console.log("Network Chain ID:", network.chainId);

    // Get Node Information (Peer Info)
    const nodeInfo = await ethers.provider.send("web3_clientVersion", []);
    console.log("\nNode Information:");
    console.log("Node Version:", nodeInfo);

    // Get Latest Block Information
    const latestBlock = await ethers.provider.getBlock("latest");
    console.log("\nLatest Block Information:");
    console.log("Block Number:", latestBlock.number);
    console.log("Block Hash:", latestBlock.hash);
    console.log("Block Timestamp:", new Date(latestBlock.timestamp * 1000).toISOString());
    console.log("Miner:", latestBlock.miner);
    console.log("Transactions in Block:", latestBlock.transactions.length);

    // Get Node Peer Count (Number of peers connected to the node)
    const peerCount = await ethers.provider.send("net_peerCount", []);
    console.log("\nNode Peer Count:", peerCount);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
