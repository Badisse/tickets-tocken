// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity 0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";

// Ticket contract
contract Ticket {
    using Counters for Counters.Counter;
    Counters.Counter public _ticketIds;

    // Struct for storing ticket information
    struct TicketInfo {
        address payable owner;
        uint price;
        bool isSold;
    }

    // Mapping from ticket id to ticket struct
    mapping(uint => TicketInfo) public tickets;

    // Event for when a ticket is created
    event TicketCreated(uint id, address owner, uint price);

    // Event for when a ticket is sold
    event TicketSold(uint id, address owner, uint price);

    // Function to create a new ticket
    function createTicket(uint price) external returns (uint) {
        uint id = _ticketIds.current();
        tickets[id] = TicketInfo({
            owner: payable(msg.sender),
            price: price,
            isSold: false
        });

        // Emit event to indicate that the ticket has been created
        emit TicketCreated(id, msg.sender, price);

        _ticketIds.increment();

        return id;
    }

    // Function to purchase a ticket
    function purchaseTicket(uint id) external {
        // Check if ticket is valid and not already sold
        require(id < _ticketIds.current(), "Ticket does not exist");
        require(!tickets[id].isSold, "Ticket has already been sold");

        // Transfer ticket ownership and mark as sold
        tickets[id].owner = payable(msg.sender);
        tickets[id].isSold = true;

        // Transfer funds from buyer to seller
        tickets[id].owner.transfer(tickets[id].price);

        // Emit event to indicate that the ticket has been sold
        emit TicketSold(id, msg.sender, tickets[id].price);
    }
}
