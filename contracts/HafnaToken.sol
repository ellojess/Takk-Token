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

    // create a Hafna token
    function createHafna(string memory _content, address _to, uint _id, bool _exists, string _name) public {
        uint id = Hafna.push(Hafna(_id, _exists, _name));
        emit NewHafna(id, _name);
    }

    // transfer token to another user
    function transfer(address from, address to, uint256 tokenId) public {
        safeTransferFrom(from, to, tokenId);
    }






}