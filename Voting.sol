pragma solidity ^0.4.11;
// specifies what version of compiler this code will be compiled with

contract Voting {
  /* the mapping field below is equivalent to an associative array or hash.
  */

  mapping (int => int) public votesReceived;
  mapping (int => int) public userId;
  mapping (int => bytes32) public user;
  mapping (int => int) public addressedUserId;
  mapping (int => bytes32) public addressedUser;
  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */

  bytes32[] public candidateList;

  /* This is the constructor which will be called once and only once - when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function Voting(bytes32[] candidateNames)  public {
    candidateList = candidateNames;
    userId[0] = 0;
    userId[1] = 0;
    userId[2] = 1;
    addressedUserId[0] = 0;
    addressedUserId[1] = 2;
    addressedUserId[2] = 0;
    addressedUser[0] = bytes32("tony");
    addressedUser[1] = bytes32("bhartiya");
    addressedUser[2] = bytes32("tony");
    user[0] = bytes32("tony");
    user[1] = bytes32("tony");
    user[2] = bytes32("hritvi");
  }

  // This function returns the total votes a candidate has received so far
  function totalVotesFor(int id) returns (int) {
    assert(int256(candidateList.length) > id);
    return votesReceived[id];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForCandidate(int id)  public {
    assert(int256(candidateList.length) > id);
    votesReceived[id] += 1;
  }

  function validCandidate(bytes32 candidate) returns (bool) {
    for(uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }

  function getIssueCount() returns (uint256) {
    return candidateList.length;
  }

  function addIssue(bytes32 candidate, int userIdin, int userAddressedId) public {
    candidateList.push(candidate);
    userId[int(candidateList.length) - 1] = int(userIdin);
    addressedUserId[int(candidateList.length) - 1] = userAddressedId;
  }

  function addUsers(bytes32 username, bytes32 addressedUsername) public {
    addressedUser[int(candidateList.length) - 1] = addressedUsername;
    user[int(candidateList.length) - 1] = username;
  }

  function bytes32ToString(bytes32 x) constant returns (string) {
      bytes memory bytesString = new bytes(32);
      uint charCount = 0;
      for (uint j = 0; j < 32; j++) {
          byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
          if (char != 0) {
              bytesString[charCount] = char;
              charCount++;
          }
      }
      bytes memory bytesStringTrimmed = new bytes(charCount);
      for (j = 0; j < charCount; j++) {
          bytesStringTrimmed[j] = bytesString[j];
      }
      return string(bytesStringTrimmed);
  }

  function getIssue(uint id) returns (string) {
    assert((candidateList.length) > id);
    return bytes32ToString(candidateList[id]);
  }

  function getUserId(int id) returns (int) {
    return userId[id];
  }

  function getAddressedUserId(int id) returns (int) {
    return addressedUserId[id];
  }

  function getAddressedUser(int id) returns (string) {
    return bytes32ToString(addressedUser[id]);
  }
  
  function getUser(int id) returns (string) {
    return bytes32ToString(user[id]);
  }

}