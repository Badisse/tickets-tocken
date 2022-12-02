import { ethers } from "hardhat";

describe("NFTMarket", function () {
  it("Should create and execute market sales", async function () {
    const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace")
    const nftMarketplace = await NFTMarketplace.deploy()
    await nftMarketplace.deployed()

    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(nftMarketplace.address)
    await nft.deployed()

    let listingPrice = await nftMarketplace.listingPrice()

    const auctionPrice = ethers.utils.parseUnits('10', 'ether')

    await nft.createToken("https://www.mytokenlocation.com")
    await nft.createToken("https://www.mytokenlocation2.com")

    await nftMarketplace.createMarketItem(nft.address, 1, auctionPrice, { value: listingPrice.toString() })
    await nftMarketplace.createMarketItem(nft.address, 2, auctionPrice, { value: listingPrice.toString() })

    const [_, buyerAddress] = await ethers.getSigners()

    await nftMarketplace.connect(buyerAddress).createMarketSale(nft.address, 1, { value: auctionPrice })

    const items = await nftMarketplace.fetchMarketItems()

    console.log('items: ', items)
  })
})