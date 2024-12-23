const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    // Get contract factory and deploy contract
    const MyContract = await ethers.getContractFactory("MyContract");

    // Specify constructor arguments
    const constructorArg1 = "Hello, Besu!";
    const constructorArg2 = 1;

    console.log("\nContract Parameters:");
    console.log("Constructor Argument 1 (string):", constructorArg1);
    console.log("Constructor Argument 2 (number):", constructorArg2);

    const myContract = await MyContract.deploy(constructorArg1, constructorArg2);  // Pass constructor arguments

    console.log("\nContract deployed to:", myContract.address);

    // Wait for the contract to be mined
    const receipt = await myContract.deployTransaction.wait();

    // Deployment transaction data and details
    console.log("\nDeployment Transaction Details:");
    console.log("Transaction Hash:", myContract.deployTransaction.hash);
    console.log("Block Number:", receipt.blockNumber);
    console.log("Gas Used:", receipt.gasUsed.toString());
    console.log("Gas Price:", receipt.effectiveGasPrice.toString());
    console.log("Block Hash:", receipt.blockHash);
    console.log("Contract Address:", myContract.address);
    console.log("Deployed By:", deployer.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
