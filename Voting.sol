pragma solidity ^0.4.11;
// specifies what version of compiler this code will be compiled with

contract Voting {
  /* the mapping field below is equivalent to an associative array or hash.
  */

  mapping (int => uint8) public votesReceived;
  mapping (int => uint8) public userId;
  mapping (int => int) public addressedUser;
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
    addressedUser[0] = 0;
    addressedUser[1] = 2;
    addressedUser[2] = 0;
  }

  // This function returns the total votes a candidate has received so far
  function totalVotesFor(int id) returns (uint8) {
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

  function addIssue(bytes32 candidate, int user, int userAddressed) public {
    candidateList.push(candidate);
    userId[int(candidateList.length) - 1] = uint8(user);
    addressedUser[int(candidateList.length) - 1] = userAddressed;
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

  function getUserId(int id) returns (uint) {
    return userId[id];
  }

  function getAddressedUserId(int id) returns (int) {
    return addressedUser[id];
  }

}