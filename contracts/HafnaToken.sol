pragma solidity ^0.6.0; 

import "./Ownable.sol";
// import "./safemath.sol";

contract HafnaToken is Ownable {

    // using SafeMath for uint256;

    event NewHafna(uint id, string name);

    // variables 
    uint public gratitudeCount = 0; // track takk existing 
    bool hafnaDoesExist = false; // see if hafna token exists in wallet 

    struct Hafna {
        uint id; // id of token 
        bool exists; // see if it exists at any moment 
        string name; // name Hafna token 
    }

    // mapping(uint => Hafna) public hafna; // store hafna in blockchain/db 

    // // create a Hafna token
    // function createHafna(string memory _content, uint _id, bool _exists, string _name) public {
    //     uint id = Hafna.push(Hafna(_id, _exists, _name));
    //     emit NewHafna(id, _name);
    // }

    // transfer token to another user
    // function transfer(address from, address to, uint256 tokenId) public {
    //     safeTransferFrom(from, to, tokenId);
    // }






}

/*
Rules for Hafna Token: 
  [ ] Hafna will automatically remove 20% of user's Takk, 
  [ ] Hafna then continues to remain in the user's account for 3 days
  [ ] During the 3 days, if more Takk is recieved while Hafna is present, 
      50% of the Takk will automatically be sent to the user who originally sent the Hafna 
      (i.e. Q received a Hafna from T, now Q pays T 50% of Takk recieved in the following 3 days)
  [ ] Users can exchange x amount of Takk to buy 1 Hafna to send to another user
  [ ] Only 1 Hafna can live in an account at any time 
  [ ] Regardless of who is holding the Hafna (creater or reciever) will suffer consequences
      while they are holding the token during its 3 day lifespan 
*/