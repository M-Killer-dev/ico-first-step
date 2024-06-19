// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

interface IERC20 {
    //emitted when tokens are moved. except when amount == 0
    event Transfer(address indexed from, address indexed to, uint256 amount);

    //emitted when the allowance is set by approve() function. value is allowance
    event Approval(address owner, address spender, uint256 value);

    //returns the total amount of remained tokens
    function totalSupply() external view returns (uint256);

    //returns the amount of tokens owned by account
    function balanceOf(address account) external view returns(uint256);

    //sends the 'amount' tokens from the caller's account to 'to' account
    function tranfer(address to, uint256 amount) external returns (bool);

    //returns the amount of tokens that is allowed to 'spender'
    function allowance(address owner, uint256 amount) external returns (uint256);

    //sets the 'amount' tokens that is allowed to 'spender'
    function approve(address spender, uint256 amount) external returns (bool);

    //sends the 'amount' tokens 'from' account to 'to' instead of owner, then the`amount` is then deducted from the caller's allowance.
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
}
