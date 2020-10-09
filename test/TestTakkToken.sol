pragma solidity ^0.6.0; 

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/TakkToken.sol";

contract TestContract {

  // Truffle will send the TestContract one Ether after deploying the contract.
  uint public initialBalance = 1 ether;
  
  function testInitialBalanceUsingDeployedContract() {

    TakkToken takk = TakkToken(DeployedAddresses.TakkToken());

    uint expected = 1;
    
    Assert.equal(takk.getBalance(tx.origin), expected, "Owner should have 1 TakkToken initially");
    
    }

}