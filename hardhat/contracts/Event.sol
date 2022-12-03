// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";
import "./Ticket.sol";

// Event contract
contract Event {
    using Counters for Counters.Counter;
    Counters.Counter public _eventIds;

    // Struct for storing event information
    struct EventInfo {
        string name;
        string date;
        string location;
        Ticket ticket;
    }

    // Mapping from event id to event struct
    mapping(uint => EventInfo) public events;

    // Event for when an event is created
    event EventCreated(
        uint id,
        string name,
        string date,
        string location,
        Ticket ticket
    );

    // Event for when an event is updated
    event EventUpdated(uint id, string name, string date, string location);

    // Function to create a new event
    function createEvent(
        string memory _name,
        string memory _date,
        string memory _location,
        string memory _ticketName,
        string memory _ticketSymbol,
        uint _ticketPrice,
        uint _maxTicketSupply,
        string memory _ticketURI
    ) external returns (uint) {
        uint id = _eventIds.current();
        Ticket ticket = new Ticket(
            _ticketName,
            _ticketSymbol,
            _ticketPrice,
            _maxTicketSupply,
            _ticketURI
        );

        events[id] = EventInfo({
          name: _name,
          date: _date,
          location: _location,
          ticket: ticket
        });

        // Emit event to indicate that the event has been created
        emit EventCreated(id, _name, _date, _location, ticket);

        _eventIds.increment();

        return id;
    }

    // Function to update an existing event
    function updateEvent(
        uint id,
        string memory name,
        string memory date,
        string memory location
    ) external {
        events[id].name = name;
        events[id].date = date;
        events[id].location = location;

        emit EventUpdated(id, name, date, location);
    }
}
