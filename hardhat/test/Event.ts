import { expect } from "chai";
import { ethers } from "hardhat";
import { Event, Ticket } from "../typechain-types";

describe("Event", function () {
  let eventContract: Event;
  let ticketContract: Ticket;

  before(async function () {
    // Deploy the event contract, passing the deployed ticket contract address
    eventContract = await (await ethers.getContractFactory("Event"))
      .deploy();
  });

  it("should create an event with the correct details", async function () {
    const previousId = await eventContract._eventIds();
    // Create an event
    const tx = await eventContract.createEvent(
      "Test Event",
      "2022-12-03",
      "Test location",
      "Test Ticket",
      "TT",
      100,
      1000,
      "http://example.com/ticket"
    );
    const nextId = await eventContract._eventIds();

    expect(nextId).to.equal(previousId.add(ethers.BigNumber.from(1)));
  });

});
