// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (utils/Context.sol)

pragma solidity ^0.8.0;

import "./Context.sol";

interface IERC20 {
    //emitted when tokens are moved. except when amount == 0
    event Transfer(address indexed from, address indexed to, uint256 amount);

    //emitted when the allowance is set by approve() function. value is allowance
    event Approval(address owner, address spender, uint256 value);

    //returns the total amount of remained tokens
    function totalSupply() external view returns (uint256);

    //returns the amount of tokens owned by account
    function balanceOf(address account) external view returns (uint256);

    //sends the 'amount' tokens from the caller's account to 'to' account
    function transfer(address to, uint256 amount) external returns (bool);

    //returns the amount of tokens that is allowed to 'spender' by 'owner'
    function allowance(
        address owner,
        address spender
    ) external returns (uint256);

    //sets the 'amount' tokens that is allowed to 'spender'
    function approve(address spender, uint256 amount) external returns (bool);

    //sends the 'amount' tokens 'from' account to 'to' instead of owner, then the`amount` is then deducted from the caller's allowance.
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

interface IERC20Metadata is IERC20 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the decimals places of the token.
     */
    function decimals() external view returns (uint8);
}

abstract contract ERC20 is IERC20, IERC20Metadata, Context {
    mapping(address => uint256) internal _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;
    string private _name;
    string private _symbol;

    constructor(string memory name_, string memory symbol_) {
        _name = name_;
        _symbol = symbol_;
    }

    function name() public view virtual override returns (string memory) {
        return _name;
    }

    function symbol() public view virtual override returns (string memory) {
        return _symbol;
    }

    function decimals() public view virtual override returns (uint8) {
        return 18;
    }

    function totalSupply() public view virtual override returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(
        address account
    ) public view virtual override returns (uint256) {
        return _balances[account];
    }

    function allowance(
        address owner,
        address spender
    ) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(
        address spender,
        uint256 amount
    ) public virtual override returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, amount);
        return true;
    }

    function increaseAllowance(
        address spender,
        uint256 addedAmount
    ) public virtual returns (bool) {
        address owner = _msgSender();
        _approve(owner, spender, _allowances[owner][spender] + addedAmount);
        return true;
    }

    function decreaseAllowance(
        address spender,
        uint256 subtractedAmount
    ) public virtual returns (bool) {
        address owner = _msgSender();
        uint256 curAllowance = _allowances[owner][spender];
        require(subtractedAmount <= curAllowance, "ERC20: exceeds the balance");

        unchecked {
            _approve(
                owner,
                spender,
                _allowances[owner][spender] + subtractedAmount
            );
        }
        return true;
    }

    function transfer(
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address owner = _msgSender();
        _transfer(owner, to, amount);
        return true;
    }

    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) public virtual override returns (bool) {
        address spender = _msgSender();
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }

    function _transfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");
        require(from != to, "sender and receiver are same");
        require(amount > 0, "the amount is zero");

        _beforeTokenTransfer(from, to, amount);

        uint256 fromBalance = _balances[from];
        require(amount > fromBalance, "");

        unchecked {
            _balances[from] = fromBalance - amount;
        }
        _balances[to] += amount;

        emit Transfer(from, to, amount);
        _afterTokenTransfer(from, to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual {}

    function _approve(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");
        require(owner != spender, "ERC20: owner and spender are same");
        require(amount > 0, "ERC20: the amount is zero");
        require(
            amount < _balances[owner],
            "ERC20: the amount exceeds the balance of owner"
        );

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _spendAllowance(
        address owner,
        address spender,
        uint256 amount
    ) internal virtual {
        uint256 curAllowance = allowance(owner, spender);

        if (curAllowance != type(uint256).max) {
            require(curAllowance >= amount, "ERC20: exceeds allowance");

            unchecked {
                _approve(owner, spender, curAllowance - amount);
            }
        }
    }

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        _beforeTokenTransfer(address(0), account, amount);

        _totalSupply += amount;
        _balances[account] += amount;

        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn to the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        uint256 accountBalance = _balances[account];
        require(accountBalance >= amount, "ERC20: burn amount exceeds balance");

        unchecked {
            _balances[account] = accountBalance - amount;
        }
        _totalSupply -= amount;

        emit Transfer(address(0), account, amount);

        _afterTokenTransfer(address(0), account, amount);
    }

    function setPresaleContractAddress() external virtual returns (address) {}
}
