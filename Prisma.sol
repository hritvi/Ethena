pragma solidity ^0.4.11;
// specifies what version of compiler this code will be compiled with

contract Prisma {
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
  function Prisma(bytes32[] candidateNames) {
    candidateList = candidateNames;
  }

  // This function returns the total votes a candidate has received so far
  function getPrisma(int id) returns (uint8) {
    assert(int256(candidateList.length) > id);
    return votesReceived[id];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForCandidate(int id) {
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

  function addIssue(bytes32 candidate) {
    // int length = candidateList.length + 1;
    // bytes[] newCandidateList = new bytes[](length);
    // for(uint i=0; i<newCandidateList.length; i++ ){
    //   if(i == length-1){
    //     newCandidateList[i] = candidate;
    //   }
    //   else{
    //     newCandidateList[i] = candidateList[i];
    //   }
    // }
    // candidateList = newCandidateList;
    candidateList.push(candidate);
  }
}