// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity >=0.4.22 <0.9.0;

import "./SimpleToken.sol";
import "./Ownable.sol";
import "./Whitelist.sol";
import "./Pausable.sol";

contract TokenSale is Whitelist, Ownable, Pausable {
    address payable presaleContract;
    address public presaleOwner;
    uint256 private presaleRate;
    uint256 public weiRased;

    SimpleToken public token;

    uint256 public constant minContribLimit = 400000000000000000;
    uint256 public constant maxContribLimit = 10000000000000000000;
    uint256 public constant hardCap = 500000000000000000000;
    uint256 public presaleEndsDate = block.timestamp + 30 days;

    mapping(address => bool) public contractsWhiteList;

    modifier onlyWhitelisted() {
        if (!whitelist()) {
            _;
        } else {
            require(contractsWhiteList[msg.sender], "You are not whitelisted");
            _;
        }
    }

    constructor(uint256 _presaleRate, SimpleToken _token) public {
        require(_presaleRate > 0, "presaleRate must be bigger than zero");

        presaleRate = _presaleRate;
        presaleOwner = payable(msg.sender);
        presaleContract = payable(address(this));
        token = _token;

        _token.setPresaleContractAddress();
        addLiquidityToPresale(presaleRate * hardCap);
    }

    function buyTokens()
        public
        payable
        onlyWhitelisted
        whenNotPaused
        returns (bool)
    {
        require(msg.sender != address(0), "Sender is equal to Owner");
        require(msg.value > 0, "The coin is bigger than zero.");
        require(
            block.timestamp < presaleEndsDate,
            "Presale has already finished"
        );
        require(
            msg.value >= minContribLimit,
            "Insuficient funds. You need to send more BNBs"
        );
        require(
            msg.value <= maxContribLimit,
            "Too much funds. You need to send less BNBs"
        );
        require(
            presaleContractBNBBalance() <= hardCap,
            "You can't buy tokens any more. Hard Cap reached."
        );
        require(
            presaleContractBNBBalance() + msg.value <= hardCap,
            "You can't buy this amount of tokens. Hard Cap will be exceeded."
        );

        uint256 _buyTokenNum = tokenPrice(msg.value);
        require(
            _buyTokenNum <= availableTokens(),
            "Exceed the available tokens."
        );
        weiRased = weiRased + msg.value;

        token.transfer(msg.sender, _buyTokenNum);
        return true;
    }

    function addToWhiteList(address _address) public onlyOwner {
        contractsWhiteList[_address] = true;
    }

    function removeToWhiteList(address _address) public onlyOwner {
        contractsWhiteList[_address] = false;
    }

    function addManyToWhitelist(address[] memory _addresses) public onlyOwner {
        for (uint256 i = 0; i < _addresses.length; i++) {
            contractsWhiteList[_addresses[i]] = true;
        }
    }

    function enableWhitelist() public onlyOwner {
        _enableWhitelist();
    }

    function disableWhitelist() public onlyOwner {
        _disableWhitelist();
    }

    function isWhitelisted(address _address) public view returns (bool) {
        return contractsWhiteList[_address];
    }

    function presaleContractBNBBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function availableTokens() public view returns (uint256) {
        return token.balanceOf(presaleContract);
    }

    function tokenPrice(uint256 _BNBToSell) public payable returns (uint256) {
        return (_BNBToSell * presaleRate);
    }

    function addLiquidityToPresale(uint256 _amount) public returns (bool) {
        token.approvePresaleContract(_amount);
        token.transferFrom(presaleOwner, presaleContract, _amount);
        return true;
    }
}
