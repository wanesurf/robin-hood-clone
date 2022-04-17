pragma solidity ^0.8.4;

//standard ERC20
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Dodge is ERC20, Ownable {
    constructor() ERC20("Dodgecoin","DOGE"){

    }
    function mint (address to, uint256 amount) public payable {
        _mint(to, amount);
    }

    receive () external payable {

    }

}