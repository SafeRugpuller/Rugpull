//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IGAMBLE {

    /** MONEY */
    /**
     * @dev Returns the current balance of the account with winnings
     */
    function balanceOf(address account) external view return (uint256);

    /**
     * @dev Returns profit of a given address
     */
    function profitsOf(address account) external view returns (uint256);

    /**
     * @dev Returns initial balance of address
     */
    function initialBalanceOf(address account) external view returns (uint256);

    /** GAME */
    /**
     * @dev Returns the id of the game
     */
    function id() external view returns (uint256);

    /**
     * @dev Returns the game number
     */
    function roundNo() external view returns (uint256);

    /**
     * @dev Enters the account in the game. Returns true if succeded
     */
    function enter(address account, uint256 amount) external returns (bool);

    /**
     * @dev Removes the account of the game. Returns true if succeded
     */
    function exit(address account, uint256 amount) external returns (bool);

    /**
     * @dev Emitted when an in-game occurence happened
     */
    event Action(address affected, string explanation);

    /**
     * @dev Emitted when an account enters the game
     */
    event Entered(address account) external view returns (uint256);

    /**
     * @dev Emitted when an account exits the game
     */
    event Exits(address account) external view returns (uint256);
}
