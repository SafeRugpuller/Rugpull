//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Rugpull {
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
    function enterRugpull(uint256 lostMoney) public {
        // Assert that caller has the money
        // Assert allowance

        // Call external contract to decrement money

        associatedToken.transferFrom(msg.sender, address(this), lostMoney);
    }

    // Eliminate a random player
    // emit address and amount
    function eliminatePlayer() public {}

    // Leave rugpull
    // emit address and amount
    function leaveRugpull() public {}

    // Get balance of rugpull
    function getBalance() public {}

    // Get how much you have profited
    function getProfit() public {}
}
