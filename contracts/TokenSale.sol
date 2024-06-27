// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

import "./SimpleToken.sol";
import "./Whitelist.sol";

contract TokenSale is Whitelist {
    uint256 public rate;
    uint256 public weiRased;
    address public wallet;
    SimpleToken public token;
    uint256 immutable hardcap;

    mapping(address => bool) public contractsWhiteList;

    modifier onlyWhitelisted() {
        if (!whitelist()) {
            _;
        } else {
            require(contractsWhiteList[msg.sender], "You are not whitelisted");
            _;
        }
    }

    constructor(
        uint256 _rate,
        address _wallet,
        SimpleToken _token,
        uint256 _hardcap
    ) {
        require(_hardcap > 0);
        require(_rate > 0);

        rate = _rate;
        wallet = _wallet;
        token = _token;
        hardcap = _hardcap;
    }

    function buyTokens(
        address _beneficiary
    ) public payable onlyWhitelisted returns (bool) {
        require(_beneficiary != address(0));
        require(msg.value != 0);
        require(presaleContractBNBBalance() <= hardcap, "You can't buy tokens any more. Hard Cap reached.");
        require(presaleContractBNBBalance() + msg.value <= hardcap, "You can't buy this amount of tokens. Hard Cap will be exceeded.");
        uint256 tokens = msg.value * rate;
        weiRased = weiRased + msg.value;

        token.transfer(_beneficiary, tokens);
        payable(wallet).transfer(msg.value);
        return true;
    }

    function addToWhiteList(address _address) public {
        contractsWhiteList[_address] = true;
    }

    function removeToWhiteList(address _address) public {
        contractsWhiteList[_address] = false;
    }

    function addManyToWhitelist(address[] memory _addresses) public {
        for (uint256 i = 0; i < _addresses.length; i++) {
            contractsWhiteList[_addresses[i]] = true;
        }
    }

    function enableWhitelist() public {
        _enableWhitelist();
    }

    function disableWhitelist() public {
        _disableWhitelist();
    }

    function isWhitelisted(address _address) public view returns (bool) {
        return contractsWhiteList[_address];
    }

    function presaleContractBNBBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
