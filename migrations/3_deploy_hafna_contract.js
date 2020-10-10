const HafnaToken = artifacts.require("./HafnaToken.sol");

module.exports = function(deployer) {
  deployer.deploy(HafnaToken);
};