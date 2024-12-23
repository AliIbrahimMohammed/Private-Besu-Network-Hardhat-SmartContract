const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Using deployer account:", deployer.address);

    // Replace with the block number you want to query
    const blockNumber = 1058;  // Example: Block #1058

    // Fetch the full block with transactions
    const block = await deployer.provider.getBlock(blockNumber, true);  // 'true' fetches full block data

    if (!block) {
        console.log("Block not found");
        return;
    }

    console.log("\nBlock Details (Block #", blockNumber, "):");
    console.log("Block Number:", block.number);
    console.log("Block Hash:", block.hash);
    console.log("Block Timestamp:", new Date(block.timestamp * 1000).toLocaleString());
    console.log("Miner:", block.miner);
    console.log("Gas Limit:", block.gasLimit.toString());
    console.log("Gas Used:", block.gasUsed.toString());
    console.log("Nonce:", block.nonce);
    console.log("Base Fee:", block.baseFeePerGas ? block.baseFeePerGas.toString() : "N/A");
    console.log("Difficulty:", block.difficulty ? block.difficulty.toString() : "N/A");

    // Check if there are transactions in the block
    if (!block.transactions || block.transactions.length === 0) {
        console.log("No transactions in this block.");
    } else {
        console.log("\nTransactions in this Block:");
        
        // Loop through the transactions and fetch each transaction's details
        let transactionNumber = 1;  // Start counting transactions
        for (const txHash of block.transactions) {
            console.log(`\nFetching details for transaction ${transactionNumber} (hash: ${txHash})`);
            
            // Fetch the transaction details by hash
            const tx = await deployer.provider.getTransaction(txHash);
            if (tx) {
                console.log(`Transaction Details (Hash: ${tx.hash}):`);
                console.log("  From:", tx.from);
                console.log("  To:", tx.to);
                console.log("  Value (in wei):", tx.value ? tx.value.toString() : "N/A");
                console.log("  Gas Price:", tx.gasPrice ? tx.gasPrice.toString() : "N/A");
                console.log("  Gas Limit:", tx.gasLimit ? tx.gasLimit.toString() : "N/A");
                console.log("  Gas Used:", tx.gasUsed ? tx.gasUsed.toString() : "N/A");
                console.log("  Input Data:", tx.data || "N/A");
                console.log("  Nonce:", tx.nonce);
            } else {
                console.log(`Transaction with hash ${txHash} not found.`);
            }
            transactionNumber++;  // Increment the transaction counter
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
