const SimpleToken = artifacts.require("SimpleToken");
const TokenSale = artifacts.require("TokenSale");

module.exports = function (deployer) {
    deployer.deploy(SimpleToken, "SimpleToken", "STK").then(function (simpleToken) {
      return deployer.deploy(TokenSale, 4000, simpleToken.address, 5000000000000000);
    });
};
