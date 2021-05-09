//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Token is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("Token", "TOK") {
        _mint(msg.sender, initialSupply);
        console.log(
            "Deploying Token token with initial supply of ",
            initialSupply,
            " sent to ",
            msg.sender
        );
    }
}
