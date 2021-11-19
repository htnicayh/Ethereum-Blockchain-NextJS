pragma solidity ^0.4.17;

contract Lottery {
    address public admin;
    address[] public members;
    
    function Lottery() public {
        admin = msg.sender;    // like object contains address of person who deploy contract to network (admin)
    }
    
    function attend() public payable { // someone call this function mind send amout of ether
        require(msg.value > .01 ether);
    
        members.push(msg.sender);
    }
    
    function genarateRandom() private view returns (uint) {
        return uint(keccak256(block.difficulty, now, members)); // RandomNumber with hashing keccak256 
    }
    
    function luckyLottery() public strictAdmin {
        uint randomNumber = genarateRandom() % members.length; // RandomNumber < members.length
        members[randomNumber].transfer(this.balance); // transfer all of ether to the members[randomNumber]
        members = new address[](0); // Reset dynamic array of members attend
    }
    
    modifier strictAdmin() {
        require(msg.sender == admin);
        _;
    }
    
    function allMembers() public view returns (address[]) {
        return members;
    }
}