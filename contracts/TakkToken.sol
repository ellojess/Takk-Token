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
        string gratitudeMessage; // message of gratitude attached to token -- optional

    }

    // store tok ens
    mapping(uint => Gratitude) public tokens;
    // mapping
    mapping(address => uint[]) public owners;

    // owner's tokens array
    uint[] ownersTokens;
    // New user tokens array
    uint[] newUserTokens;

    // populate token to store
    // constructor() public {
    //     createToken("Welcome Takk Token"); // default token when user first joins and opens wallet
    // }

    // this contructor is needed for the ERC721 inheritance to work
    constructor() ERC721("TakkToken", "TT") public { 
        // createToken("Welcome Takk Token");
    }
    
    // Function to show current number of gratitude a user has**

    // similar to show tokens, just get their address (msg.sender), check if anything is in their wallet => wallet is their address
    // create mapping holding a list of tokens they own, add to the mapping in the create token function 
    // (Key is the person's address, value is array of tokens they have) 
    // may have to create a temporary memory of the tokens they hold, create new array, make that array the new value for the address (MAY HAVE TO DO)
    // 

    // // Show the owner's gratitude tokens
    // function showTokens(uint tokenId) public view returns address {
    //     // pass in token id => return address of the owner
    //     require (msg.sender == ownerOf(tokenId))
    //     return ownerOf(tokenId)
    // }

    // function checkOwnership(uint tokenId) {
    //     if msg.sender == ownerOf(tokenId) {
    //     }
    // }

    // Show the owner's gratitude tokens
    function showTokensOfOwner() public view returns (uint [] memory) {
        // pass in token id => return address of the owner
        // might be .length
        // require (owners[msg.sender].length != 0, "Testing");
        if (owners[msg.sender].length != 0) {
            return owners[msg.sender];
        }
        // return owners[msg.sender];
    }

     // Show anyone's gratitude tokens
    function showTokensOfAnyone(address _to) public view returns (uint [] memory) {
        // pass in token id => return address of the owner
        // might be .length
        if (owners[_to].length != 0) {
            return owners[_to];
        }
    }
    // transfer token to another user
    function transfer(address from, address to, uint256 tokenId) public {
        safeTransferFrom(from, to, tokenId);
    }

    // creates token with id & message 
    function createToken(address _to, string memory _content) public {
        gratitudeCount ++; 

        // put token inside mapping 
        tokens[gratitudeCount] = Gratitude(gratitudeCount, _content);
        // return show token, set it, then add it
        // uint[] memory ownersTokens = new uint[](100);
        ownersTokens = showTokensOfAnyone(_to);
        // uint[] memory ownersTokens = showTokens(_to);

        // add token to the owner's array of tokens
        if (ownersTokens.length != 0) {
            ownersTokens.push(gratitudeCount);
            // updating the mapping
            owners[_to] = ownersTokens;
        }
        // if the array length = 0 anything, create new array
        else {
            // uint gratCount[] = [gratitudeCount];
            newUserTokens = [gratitudeCount];
            // creating new mapping
            owners[_to] = newUserTokens;
        }

        // creates token with the receiving user's address
        super._mint(_to, gratitudeCount);

    }

    // extra function to transfer an existing token to another user.
    // IF we deploy, Rinkeby (least buggy), Kovan


}



