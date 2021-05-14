//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Rugpull is ReentrancyGuard {
    IERC20 public associatedToken;

    event Entered(address, uint256);

    mapping(address => uint256) private balances;

    constructor(IERC20 _token) {
        associatedToken = _token;
    }

    function getAssociatedToken() public view returns (IERC20) {
        return associatedToken;
    }

    // Enter the rugpull
    // Emit address and amount
    function enter(uint256 amount) public payable nonReentrant {
        //require(associatedToken.balanceOf(msg.sender) >= amount);
        associatedToken.transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += amount;

        emit Entered(msg.sender, amount);
    }

    // Eliminate a random player
    // emit address and amount
    function eliminate(address account) public {}

    // Leave rugpull
    // emit address and amount
    function exit() public {}

    // Get balance of rugpull
    function getBalance() public {}

    // Get how much you have profited
    function getProfit() public {}
}
