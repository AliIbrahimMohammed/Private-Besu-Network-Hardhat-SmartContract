// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyContract {
    string public message;
    uint public number;
    address public owner;

    // Event to log message changes
    event MessageUpdated(string oldMessage, string newMessage);

    constructor(string memory _message, uint _number) {
        message = _message;
        number = _number;
        owner = msg.sender;  // Assign the contract deployer as the owner
    }

    // Set a new message
    function setMessage(string memory _newMessage) public {
        string memory oldMessage = message;
        message = _newMessage;
        emit MessageUpdated(oldMessage, message);
    }

    // Set a new number
    function setNumber(uint _newNumber) public {
        number = _newNumber;
    }

    // Get the contract owner's address
    function getOwner() public view returns (address) {
        return owner;
    }

    // Reset the message to its default
    function resetMessage() public {
        require(msg.sender == owner, "Only the owner can reset the message");
        message = "Default Message";
    }

    // Example of interacting with the contract
    function incrementNumber(uint _increment) public {
        number += _increment;
    }

    // Function to check contract balance (useful if you want to send ETH to the contract)
    function checkBalance() public view returns (uint) {
        return address(this).balance;
    }

    // Receive ETH into contract
    receive() external payable {}
}