// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private tokenIds;
  address marketplaceAddress;

  constructor(address _marketplaceAddress) ERC721("Tikets", "TICK") {
    marketplaceAddress = _marketplaceAddress;
  }

  function createToken(string calldata _tokenURI) public returns (uint) {
    tokenIds.increment();
    uint newItemId = tokenIds.current();

    _mint(msg.sender, newItemId);
    _setTokenURI(newItemId, _tokenURI);
    setApprovalForAll(marketplaceAddress, true);

    return newItemId;
  }
}