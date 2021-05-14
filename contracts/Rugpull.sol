//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Rugpull is ReentrancyGuard {
    IERC20 public _associatedToken;

    event Entered(address, uint256);
    event Exitted(address, uint256);

    mapping(address => uint256) private balances;

    constructor(IERC20 _token) {
        _associatedToken = _token;
        _associatedToken.approve(address(this), 9999999999999);
    }

    function associatedToken() public view returns (IERC20) {
        return _associatedToken;
    }

    // Enter the rugpull
    // Emit address and amount
    function enter(uint256 amount) public nonReentrant {
        _associatedToken.transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += amount;

        emit Entered(msg.sender, amount);
    }

    // Eliminate a random player
    // emit address and amount
    function eliminate(address account) public {}

    // Leave rugpull
    // emit address and amount
    function exit(uint256 amount) public nonReentrant {
        require(balances[msg.sender] >= amount, "Insufficient funds");
        _associatedToken.transferFrom(address(this), msg.sender, amount);
        balances[msg.sender] -= amount;

        emit Exitted(msg.sender, amount);
    }

    // Get balance of rugpull
    function getBalance() public {}

    // Get how much you have profited
    function getProfit() public {}
}
