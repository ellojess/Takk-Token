pragma solidity ^0.6.0; 

import "./Ownable.sol";
import "./safemath.sol";

contract HafnaToken is Ownable {

    using SafeMath for uint256;

    event NewHafna(uint id, string name);

    // variables 
    uint public gratitudeCount = 0; // track takk existing 
    bool hafnaDoesExist = false; // see if hafna token exists in wallet 

    struct Hafna {
        uint id; // id of token 
        bool exists; // see if it exists at any moment 
        string name; // name Hafna token 
    }

    mapping(uint => Hafna) public hafna; // store hafna in blockchain/db 

    function createHafna(string memory uint _id, bool _exists, string _name) public {
        // this function creates a Hafna token
        uint id = Hafna.push(Hafna(_id, _exists, _name));
        emit NewHafna(id, _name);
    }






}