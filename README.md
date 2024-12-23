# Private-Besu-Network-Hardhat-SmartContract

This project demonstrates how to deploy and interact with a smart contract on a **Besu private network** using **Hardhat**.

## Requirements

- **Node.js** (>= v16.x.x)
- **Hardhat** (for developing, testing, and deploying smart contracts)
- **Besu** (for running a private Ethereum-compatible network)

## Getting Started

### 1. Clone the Repository

First, clone the repository:

```bash
git clone https://github.com/your-username/Private-Besu-Network-Hardhat-SmartContract.git
cd Private-Besu-Network-Hardhat-SmartContract
```

### 2. Install Dependencies

Install the required dependencies:

```bash
npm install
```

### 3. Setup Besu Node

Ensure you have a **Besu private network** running. You can either use a local node or connect to a remote Besu node. Refer to the [official Besu documentation](https://besu.hyperledger.org/en/stable/) if needed.

### 4. Configure Hardhat for Besu

In the `hardhat.config.js` file, update the network configuration to point to your Besu node:

```javascript
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    besu: {
      url: "http://127.0.0.1:8545", // Besu node's JSON-RPC URL
      accounts: [process.env.PRIVATE_KEY], // Private key from .env file
    },
  },
};
```

### 5. Add `.env` File

Create a `.env` file at the root of your project and add your private key for deploying contracts:

```bash
PRIVATE_KEY=your_private_key_here
```

## Deploy the Smart Contract

### 1. Smart Contract Code

In the `contracts` directory, create a contract (`MyContract.sol`) as shown below:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    string public message;
    uint public number;
    address public owner;

    event MessageUpdated(string oldMessage, string newMessage);

    constructor(string memory _message, uint _number) {
        message = _message;
        number = _number;
        owner = msg.sender;
    }

    function setMessage(string memory _newMessage) public {
        string memory oldMessage = message;
        message = _newMessage;
        emit MessageUpdated(oldMessage, message);
    }

    function setNumber(uint _newNumber) public {
        number = _newNumber;
    }

    function getOwner() public view returns (address) {
        return owner;
    }

    function resetMessage() public {
        require(msg.sender == owner, "Only the owner can reset the message");
        message = "Default Message";
    }

    function incrementNumber(uint _increment) public {
        number += _increment;
    }

    function checkBalance() public view returns (uint) {
        return address(this).balance;
    }

    receive() external payable {}
}
```

### 2. Deployment Script

In the `scripts` directory, create a deployment script (`deploy.js`):

```javascript
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MyContract = await ethers.getContractFactory("MyContract");
  const myContract = await MyContract.deploy("Hello, Besu!", 100);

  console.log("Contract deployed to:", myContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### 3. Run the Deployment

Deploy the contract to the Besu private network using the following command:

```bash
npx hardhat run scripts/deploy.js --network besu
```

### 4. Verify Deployment

After the deployment, you can verify that the contract was deployed correctly by checking the contract address.

### 5. Interact with the Contract

Open the Hardhat console and interact with your contract:

```bash
npx hardhat console --network besu
```

In the console, use the following commands to interact with the contract:

```javascript
const contract = await ethers.getContractAt("MyContract", "deployed_contract_address");

// Check the current message
console.log(await contract.message());

// Set a new message
await contract.setMessage("New Message");
console.log(await contract.message());
```

## Available Commands

Here are some commands you can use with Hardhat:

- **Start Hardhat node**: `npx hardhat node`
- **Run tests**: `npx hardhat test`
- **Run a script**: `npx hardhat run <script_path>`
- **Interact with deployed contracts in the Hardhat console**: `npx hardhat console --network besu`

## Troubleshooting

- **Besu node connection**: Ensure that your Besu node is running and that the RPC URL in `hardhat.config.js` is correct.
- **Private key**: Make sure the private key in your `.env` file has enough funds for deploying the contract.
- **Smart contract issues**: Check your contract code for errors in the console output.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

### Save this as `README.md` in your project root.

This README provides a clear and concise guide for setting up and using the project. Let me know if you need further adjustments!
