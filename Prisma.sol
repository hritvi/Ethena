pragma solidity ^0.4.11;
// specifies what version of compiler this code will be compiled with

contract Prisma {
  /* the mapping field below is equivalent to an associative array or hash.
  */

  mapping (int => uint8) public votesReceived;
  mapping (int => bytes32) public user;
  int maxIndex = 0;
  /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
  We will use an array of bytes32 instead to store the list of candidates
  */

  bytes32[] public candidateList;

  /* This is the constructor which will be called once and only once - when you
  deploy the contract to the blockchain. When we deploy the contract,
  we will pass an array of candidates who will be contesting in the election
  */
  function Prisma(bytes32[] candidateNames)  public {
    candidateList = candidateNames;
  }

  // This function returns the total votes a candidate has received so far
  function getPrisma(int id) returns (uint8) {
    return votesReceived[id];
  }

  // This function increments the vote count for the specified candidate. This
  // is equivalent to casting a vote
  function voteForCandidate(int id, uint8 scoreCount, bytes32 username)  public {
    votesReceived[id] += scoreCount;
    user[id] = username;
    if(id > maxIndex){
      maxIndex = id;
    }
  }

  function getPrismaCount() returns (int) {
    return maxIndex;
  }

  function addIssue(bytes32 candidate)  public {
    candidateList.push(candidate);
  }

function bytes32ToString(bytes32 x) view returns (string) {
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
  
  function getUser(int id) returns (string) {
    return bytes32ToString(user[id]);
  }

}