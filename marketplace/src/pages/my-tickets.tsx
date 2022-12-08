import type { BigNumber, Event } from 'ethers';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { useEth } from '../contexts/EthContext';
import artifacts from '../../artifacts/contracts/Ticket.sol/Ticket.json'

const MyTickets = () => {
  const {
    state: { eventContract, signer, account },
  } = useEth();
  const [events, setEvents] = useState<{
    event: Event,
    balance: number
  }[] | null>(null)

  useEffect(() => {
    const getEvents = async () => {
      if (!eventContract) return;

      const eventFilter = eventContract.filters.EventCreated();
      const eventsList: [] = await eventContract.queryFilter(eventFilter);

      eventsList.forEach(async (event: Event) => {
        
        const ticketContract = new ethers.Contract(event.args?.ticket, artifacts.abi, signer)
        const balance: BigNumber = await ticketContract.balanceOf(account)

        if(balance.toNumber() > 0) {

          setEvents((current) => {
            return current
              ? [
                ...current,
                {
                  event: event,
                  balance: balance.toNumber()
                }
              ]
              : [
                {
                  event: event,
                  balance: balance.toNumber()
                }
              ]
          })
        }
      })
    };

    getEvents();
  }, [account, eventContract, signer]);
  
  return (
    <div>
      {
        events?.map((event) => (
          
          <div key={event.event.args?.id}>
            <div className="bg-white p-6 rounded-lg shadow-lg my-2">
              <img src={event.event.args?.uri} alt="ticket-image" className="w-full rounded-t-lg" />
              <div className="font-bold text-xl mb-2">{event.event.args?.name}</div>
              <div className="text-gray-700 text-base mb-2">Date: {event.event.args?.date}</div>
              <div className="text-gray-700 text-base mb-2">Location: {event.event.args?.location}</div>
              <div className="font-bold text-xl mb-2">Balance: {event.balance}</div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default MyTickets