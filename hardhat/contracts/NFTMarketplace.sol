// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NFTMarketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private itemIds;
    Counters.Counter private itemsSold;

    address payable owner;
    uint public listingPrice = 0.025 ether;

    struct MarketItem {
        uint itemId;
        uint tokenId;
        uint price;
        address nftContract;
        address payable seller;
        address payable owner;
        bool sold;
    }

    mapping(uint => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint indexed itemId,
        uint indexed tokenId,
        uint price,
        address indexed nftContract,
        address payable seller,
        address payable owner,
        bool sold
    );

    constructor() {
        owner = payable(msg.sender);
    }

    function createMarketItem(
        address _nftContract,
        uint _tokenId,
        uint _price
    ) external payable nonReentrant {
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        itemIds.increment();
        uint itemId = itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            _tokenId,
            _price,
            _nftContract,
            payable(msg.sender),
            payable(address(0)),
            false
        );

        IERC721(_nftContract).transferFrom(msg.sender, address(this), _tokenId);

        emit MarketItemCreated(
            itemId,
            _tokenId,
            _price,
            _nftContract,
            payable(msg.sender),
            payable(address(0)),
            false
        );
    }

    function createMarketSale(
        address _nftContract,
        uint _itemId
    ) external payable nonReentrant {
        require(
            msg.value == idToMarketItem[_itemId].price,
            "Please submit the asking price in order to complete the purchase"
        );

        (bool sent, ) = idToMarketItem[_itemId].seller.call{value: msg.value}(
            ""
        );
        require(sent, "An error occured during the transaction");

        IERC721(_nftContract).transferFrom(
            address(this),
            msg.sender,
            idToMarketItem[_itemId].tokenId
        );
        idToMarketItem[_itemId].owner = payable(msg.sender);
        idToMarketItem[_itemId].sold = true;
        itemsSold.increment();
        (sent, ) = payable(owner).call{value: listingPrice}("");
        require(sent, "An error occured during the transaction");
    }

    function fetchMarketItems() external view returns (MarketItem[] memory) {
        uint itemCount = itemIds.current();
        uint unsoldItemCount = itemIds.current() - itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint i = 1; i < itemCount + 1; i++) {
            if (idToMarketItem[i].owner == address(0)) {
                uint currentId = i;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNFTs() external view returns (MarketItem[] memory) {
        uint totalItemCount = itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 1; i < totalItemCount + 1; i++) {
            if (idToMarketItem[i].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 1; i < totalItemCount + 1; i++) {
            if (idToMarketItem[i].owner == msg.sender) {
                uint currentId = i;
                items[currentIndex] = idToMarketItem[currentId];
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemsListed() external view returns (MarketItem[] memory) {
        uint totalItemCount = itemIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 1; i < totalItemCount + 1; i++) {
            if (idToMarketItem[i].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 1; i < totalItemCount + 1; i++) {
            if (idToMarketItem[i].seller == msg.sender) {
                uint currentId = i;
                items[currentIndex] = idToMarketItem[currentId];
                currentIndex += 1;
            }
        }
        return items;
    }
}
