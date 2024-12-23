const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Using deployer account:", deployer.address);

    // Replace with the block number you want to query
    const blockNumber = 1174;  // Example: Block #1058

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
    console.log("Gas Limit:", ethers.utils.formatUnits(block.gasLimit, 'wei'));
    console.log("Gas Used:", ethers.utils.formatUnits(block.gasUsed, 'wei'));
    console.log("Nonce:", block.nonce);
    console.log("Base Fee:", block.baseFeePerGas ? ethers.utils.formatUnits(block.baseFeePerGas, 'wei') : "N/A");
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
                console.log("  Value (in ether):", ethers.utils.formatEther(tx.value));
                console.log("  Gas Price (in Gwei):", tx.gasPrice ? ethers.utils.formatUnits(tx.gasPrice, 'gwei') : "N/A");
                console.log("  Gas Limit:", tx.gasLimit.toString());
                console.log("  Gas Used:", tx.gasUsed ? tx.gasUsed.toString() : "N/A");
                console.log("  Nonce:", tx.nonce);

                // Check if the transaction is a contract creation
                if (tx.to === null) {
                    console.log("  Contract Creation: Contract is being deployed.");

                    // Wait for the transaction receipt to get the contract address
                    const receipt = await deployer.provider.getTransactionReceipt(tx.hash);
                    if (receipt && receipt.contractAddress) {
                        console.log("  Contract Address:", receipt.contractAddress);
                    } else {
                        console.log("  No contract address found.");
                    }
                } else {
                    // Decode the input data if it's a contract call (if input data exists)
                    if (tx.data && tx.data !== '0x') {
                        try {
                            console.log("  Input Data (Decoded):");
                            const parsedData = ethers.utils.defaultAbiCoder.decode(
                                ['address', 'uint256'], // Example: Assuming contract call with address and uint256 input data
                                tx.data
                            );
                            console.log("    Address:", parsedData[0]);
                            console.log("    Value:", parsedData[1].toString());
                        } catch (err) {
                            console.log("    Input Data cannot be decoded:", err.message);
                        }
                    } else {
                        console.log("  Input Data: No contract data");
                    }
                }
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
