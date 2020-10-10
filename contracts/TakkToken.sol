/*
Smart contract that manages the gratitude for application 
*/
pragma solidity ^0.6.0; 

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Ownable.sol";

contract TakkToken is ERC721, Ownable {
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
    // constructor() public {
    //     createToken("Welcome Takk Token"); // default token when user first joins and opens wallet
    // }

    // this contructor is needed for the ERC721 inheritance to work
    constructor() ERC721("GameItem", "ITM") public { 
        // createToken("Welcome Takk Token");
    }

    // creates token with id & message 
    function createToken(address _to, string memory _content) public  {
        gratitudeCount ++; 
        // put token inside mapping 
        tokens[gratitudeCount] = Gratitude(gratitudeCount, _content);

        super._mint(_to, gratitudeCount);
    }

}



