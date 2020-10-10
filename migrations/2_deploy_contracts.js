const TakkToken = artifacts.require("./TakkToken.sol");

module.exports = function(deployer) {
  deployer.deploy(TakkToken);
};