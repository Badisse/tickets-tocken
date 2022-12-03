// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Ticket contract
contract Ticket is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public _ticketIds;

    uint price;
    uint maxTicketsSupply;
    string uri;

    // Event for when a ticket is created
    event TicketMinted(uint id, address owner);

    // Event for when a ticket is sold
    event TicketSold(uint id, address owner, uint price);

    constructor (
        string memory _name,
        string memory _symbol,
        uint _price,
        uint _maxTicketsSupply,
        string memory _uri
    ) ERC721(_name, _symbol) {
      price = _price;
      maxTicketsSupply = _maxTicketsSupply;
      uri = _uri;
    }

    // Function to create a new ticket
    function mintTicket() external payable returns (uint) {
        require(_ticketIds.current() < maxTicketsSupply);
        require(msg.value == price, 'You must send the ticket price value');

        uint id = _ticketIds.current();
        _mint(msg.sender, id);

        // Emit event to indicate that the ticket has been created
        emit TicketMinted(id, msg.sender);

        _ticketIds.increment();

        return id;
    }

}
