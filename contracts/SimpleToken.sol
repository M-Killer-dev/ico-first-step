// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

import "./ERC20.sol";

contract SimpleToken is ERC20 {
    uint256 private lockEndsDate = 548 days; // Lock time is 1 year and a half
    uint256 public lockDate;
    address private presaleContractAddress;

    constructor() payable ERC20("SimpleToken", "STN") {
        mint(msg.sender, 100000000000 * (10 ** uint256(decimals())));
    }

    function mint(address _to, uint256 _amount) private {
        _mint(_to, _amount);
    }

    function burn(uint256 _value) public returns (address) {
        _burn(_msgSender(), _value);
        return _msgSender();
    }

    function balance() public view returns (uint256) {
        return address(this).balance;
    }

    function setPresaleContractAddress() external override returns (address) {
        require(
            presaleContractAddress == address(0),
            "Address already initialized"
        );
        presaleContractAddress = msg.sender;
        return presaleContractAddress;
    }
}
