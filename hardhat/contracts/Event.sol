// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/Counters.sol";

// Event contract
contract Event {
  using Counters for Counters.Counter;
    Counters.Counter public _eventIds;

    // Struct for storing event information
    struct EventInfo {
        string name;
        string date;
        string location;
    }

    // Mapping from event id to event struct
    mapping (uint => EventInfo) public events;

    // Mapping from event id to ticket contract address
    mapping (uint => address) public eventToTicket;

    // Event for when an event is created
    event EventCreated(
        uint id,
        address ticket,
        string name,
        string date,
        string location
    );

    // Event for when an event is updated
    event EventUpdated(
        uint id,
        string name,
        string date,
        string location
    );

    // Function to create a new event
    function createEvent(address ticket, string memory name, string memory date, string memory location) external returns(uint) {
        uint id = _eventIds.current();
        events[id] = EventInfo({
            name: name,
            date: date,
            location: location
        });
        eventToTicket[id] = ticket;

        // Emit event to indicate that the event has been created
        emit EventCreated(id, ticket, name, date, location);

        _eventIds.increment();

        return id;
    }

    // Function to update an existing event
    function updateEvent(uint id, string memory name, string memory date, string memory location) external {
      events[id].name = name;
      events[id].date = date;
      events[id].location = location;

      emit EventUpdated(id, name, date, location);
    }
}