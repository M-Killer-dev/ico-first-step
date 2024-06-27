const SimpleToken = artifacts.require("SimpleToken");
const TokenSale = artifacts.require("TokenSale");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(SimpleToken, "SimpleToken", "STK").then(function (simpleToken) {
    return deployer.deploy(TokenSale, 4000, simpleToken, 500000000000000000000);
  });
};
