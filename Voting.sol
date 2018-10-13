pragma solidity ^0.4.11;
// specifies what version of compiler this code will be compiled with

contract Voting {
  /* the mapping field below is equivalent to an associative array or hash.
  */

  mapping (int => uint8) public votesReceived;

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

  function addIssue(bytes32 candidate)  public {
    candidateList.push(candidate);
  }

  function getIssue(uint id) returns (bytes32) {
    assert((candidateList.length) > id);
    return candidateList[id];
  }
}