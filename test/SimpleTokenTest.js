var SimpleToken = artifacts.require("./SimpleToken.sol");

contract("SimpleToken", function (accounts) {
  var tokenInstance;

  it("initializes the contract with the correct values", function () {
    return SimpleToken.deployed()
      .then((instance) => {
        tokenInstance = instance;
        return tokenInstance.name();
      })
      .then((name) => {
        assert.equal(name, "SimpleToken", "has the correct name");
        return tokenInstance.symbol();
      })
      .then((symbol) => {
        assert.equal(symbol, "STK", "has the correct symbol");
        return tokenInstance.balanceOf(accounts[0]);
      })
      .then((balance0) => {
        assert.equal(!!balance0, true, "failed mint in constructor");
        return tokenInstance.burn(1000, { from: accounts[0] });
      })
      .then((sender) => {
        assert.equal(!sender, false, "error when burn");
        return tokenInstance.balance();
      });
    // .then((balance) => {
    //   assert.equal(!balance, false, "error when balance");
    //   return tokenInstance.setPresaleContractAddress({ from: accounts[1] });
    // })
    // .then(() => {
    //   return tokenInstance.approvePresaleContract(1000, {
    //     from: accounts[1],
    //   });
    // })
    // .then(() => {
    //   return tokenInstance.getPresaleContractAddress();
    // })
    // .then((presaleContractAddress) => {
    //   assert.equal(!presaleContractAddress, false, "error when balance");
    // });
  });
});
