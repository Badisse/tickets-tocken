import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Ticket } from '../typechain-types';


describe('Ticket', () => {
  let ticket: Ticket;
  let owner: SignerWithAddress;
  const name = 'Ticket';
  const symbol = 'TICKET';
  const price = ethers.utils.parseEther('1.0');
  const maxTicketsSupply = 100;
  const uri = 'https://example.com';
  const eventOwner = ethers.constants.AddressZero;

  before(async () => {
    // Deploy the Ticket contract and get a reference to it
    [owner, ] = await ethers.getSigners();
    const ticketFactory = await ethers.getContractFactory("Ticket");
    
    ticket = await ticketFactory.deploy(
      name,
      symbol,
      price,
      maxTicketsSupply,
      uri,
      eventOwner
    );
  });

  it('should have the correct name and symbol', async () => {
    // Assert that the contract has the correct name and symbol
    expect(await ticket.name()).to.equal(name);
    expect(await ticket.symbol()).to.equal(symbol);
  });

  it('should create a new ticket when mintTicket is called', async () => {
    const previousId = await ticket._ticketIds();
    await ticket.mintTicket({value: price});
    const nextId = await ticket._ticketIds();

    expect(nextId).to.equal(previousId.add(ethers.BigNumber.from(1)));
  });

})