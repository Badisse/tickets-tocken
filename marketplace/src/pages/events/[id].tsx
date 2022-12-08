import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useEth } from '../../contexts/EthContext';
import artifacts from '../../../artifacts/contracts/Ticket.sol/Ticket.json'
import { ethers } from 'ethers';

type EventInfo = {
  name: string,
  date: string,
  location: string,
  ticket: string,
  uri: string
}


function Event() {
  const router = useRouter()
  const { id } = router.query
  const {
    state: { eventContract, signer },
  } = useEth();
  const [event, setEvent] = useState<EventInfo | null>(null)
  const [eventTicketContract, setEventTicketContract] = useState<ethers.Contract | null>(null)
  const [price, setPrice] = useState(null)
  const [uri, setURI] = useState('')

  const handleClick = async () => {
    if(!eventTicketContract || !price) return

    eventTicketContract.mintTicket({value: price})
  }


  useEffect(() => {
    const init = async () => {
      if(!eventContract) return
      const evt = await eventContract.events(id);
      setEvent(evt)

      const ticketContract = new ethers.Contract(evt.ticket, artifacts.abi, signer)
      setEventTicketContract(ticketContract)

      const price = await ticketContract.price()
      setPrice(price)
      const uri = await ticketContract.uri()
      setURI(uri)

    }

    init()
  }, [eventContract, id, signer])

  console.log(uri)

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <img src={uri} alt="ticket-image" className="w-full rounded-t-lg" />
      <div className="font-bold text-xl mb-2">{event?.name}</div>
      <div className="text-gray-700 text-base mb-2">{event?.date}</div>
      <div className="text-gray-700 text-base mb-2">{event?.location}</div>
      <button
        onClick={handleClick}
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
      >
        Buy Ticket
      </button>
    </div>
  )
}

export default Event