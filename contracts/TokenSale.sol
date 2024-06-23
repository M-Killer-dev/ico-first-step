// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

import "./SimpleToken.sol";

contract TokenSale {
    uint256 public rate;
    uint256 public weiRased;
    address public wallet;
    ERC20 public token;

    mapping(address => bool) public contractsWhiteList;

    modifier onlyWhitelisted() {
        if (!whitelist()) {
            _;
        } else {
            require(contractsWhiteList[msg.sender], "You are not whitelisted");
            _;
        }
    }

    constructor(uint256 _rate, address _wallet, ERC20 _token) public {
        rate = _rate;
        wallet = _wallet;
        token = _token;
    }

    function buyTokens(address _beneficiary) public payable onlyWhitelisted whenNotPaused returns (bool) {
        require(_beneficiary != address(0));
        require(msg.value != 0);

        uint256 tokens = msg.value * rate;
        weiRased = weiRased + msg.value;

        token.transfer(_beneficiary, tokens);
        payable(wallet).transfer(msg.value);
    }
}
