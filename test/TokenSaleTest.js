var TokenSale = artifacts.require("./TokenSale.sol");

contract("TokenSale", function (accounts) {
  var tokenInstance;

  it("initializes the contract with the correct values", async function () {
    tokenInstance = await TokenSale.deployed();

    let available_tokens = await tokenInstance.availableTokens();
    assert.equal(!!available_tokens, true, "availabelTokens func error");

    await tokenInstance.buyTokens({
      from: accounts[1],
      value: 400000000000000000,
    });

    await tokenInstance.addToWhiteList(accounts[1]);
    let isWhiteListed = await tokenInstance.isWhitelisted(accounts[1]);
    assert.equal(isWhiteListed, true, "error in addToWhiteList or is WhiteListed func");

    await tokenInstance.enableWhitelist();
    let isWhiteListStatus = await tokenInstance.whitelist();
    assert.equal(isWhiteListStatus, true, "error in enableWhitelist or whitelist func")

    await tokenInstance.disableWhitelist();
    isWhiteListStatus = await tokenInstance.whitelist();
    assert.equal(isWhiteListStatus, false, "error in disableWhitelist func")

    let presaleBalance = await tokenInstance.presaleContractBNBBalance();
    assert.equal(!!presaleBalance, true, "error in presaleContractBNBBalance func");

    let a_tokens = await tokenInstance.availableTokens();
    assert.equal(a_tokens > 0, true, "error in availableTokens func");

    let t_price = await tokenInstance.tokenPrice(1000);
    ssert.equal(t_price.words[0] > 0, true, "error in tokenPrice func");

    tokenInstance.addLiquidityToPresale(1000);

  });
});
