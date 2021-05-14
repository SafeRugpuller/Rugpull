//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    // Implement constructor where you have an array of addresses and amounts that get transferred on init
    constructor(uint256 initialSupply) ERC20("Rugpull", "RUG") {
        _mint(msg.sender, initialSupply);
    }
}
