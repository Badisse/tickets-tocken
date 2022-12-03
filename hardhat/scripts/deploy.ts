import { ethers } from "hardhat";

async function main() {

  const Event = await ethers.getContractFactory("Event");
  const event = await Event.deploy();

  await event.deployed();

  console.log(`Deployed to ${event.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
