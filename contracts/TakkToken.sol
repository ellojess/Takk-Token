/*
Smart contract that manages the gratitude for application 
*/

pragma solidity ^0.6.0; 

contract TakkToken {
    // state variable to keep track of number of gratitude 
    uint public gratitudeCount = 0;

    // Gratitude tokens struct 
    struct Gratitude {
        uint id; // id of tokens
        string gratitudeMessage; // message message of gratitude attached to token -- optional

    }

    // store tokens
    mapping(uint => Gratitude) public tokens;

    // populate token to store
    constructor() public {
        createToken("Welcome Takk Token"); // default token when user first joins and opens wallet
    }

    // creates token with id & message 
    function createToken(string memory _content) public {
        gratitudeCount ++; 
        // put token inside mapping 
        tokens[gratitudeCount] = Gratitude(gratitudeCount, _content);
    }

}



