import React, { useState } from 'react'

const CreatEvent = () => {
  const [eventFactory, setEventFactory] = useState<EventFactory>()

  const formInputs = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      placeholder: 'Soiree Alyra',
      onchange: (event: React.ChangeEvent<HTMLInputElement>) => setEventFactory(
        {
          ...eventFactory,
          name: event.target.value
        }
      )
    },
    {
      id: 'date',
      label: 'Date',
      type: 'date',
      placeholder: '12/02/2022',
      onchange: (event: React.ChangeEvent<HTMLInputElement>) => setEventFactory(
        {
          ...eventFactory,
          date: event.target.value
        }
      )
    },
    {
      id: 'location',
      label: 'Location',
      type: 'text',
      placeholder: 'Paris',
      onchange: (event: React.ChangeEvent<HTMLInputElement>) => setEventFactory(
        {
          ...eventFactory,
          location: event.target.value
        }
      )
    },
    {
      id: 'uri',
      label: 'URI',
      type: 'text',
      placeholder: 'ipfs://cid',
      onchange: (event: React.ChangeEvent<HTMLInputElement>) => setEventFactory(
        {
          ...eventFactory,
          uri: event.target.value
        }
      )
    },
    {
      id: 'ticketName',
      label: 'Ticket Name',
      type: 'text',
      placeholder: 'Alyra Ticket',
      onchange: (event: React.ChangeEvent<HTMLInputElement>) => setEventFactory(
        {
          ...eventFactory,
          ticketName: event.target.value
        }
      )
    },
    {
      id: 'ticketSymbol',
      label: 'Ticket Symbol',
      type: 'text',
      placeholder: 'ATKT',
      onchange: (event: React.ChangeEvent<HTMLInputElement>) => setEventFactory(
        {
          ...eventFactory,
          ticketSymbol: event.target.value
        }
      )
    },
    {
      id: 'ticketPrice',
      label: 'Ticket Price',
      type: 'number',
      placeholder: '45',
      onchange: (event: React.ChangeEvent<HTMLInputElement>) => setEventFactory(
        {
          ...eventFactory,
          ticketPrice: event.target.value
        }
      )
    },
    {
      id: 'maxTicketSupply',
      label: 'Max Ticket Supply',
      type: 'number',
      placeholder: '300',
      onchange: (event: React.ChangeEvent<HTMLInputElement>) => setEventFactory(
        {
          ...eventFactory,
          maxTicketSupply: event.target.value
        }
      )
    },
    {
      id: 'ticketURI',
      label: 'Ticket URI',
      type: 'text',
      placeholder: 'ipfs://cdi',
      onchange: (event: React.ChangeEvent<HTMLInputElement>) => setEventFactory(
        {
          ...eventFactory,
          ticketURI: event.target.value
        }
      )
    },
  ]

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log(eventFactory)
  }

  return (
    <form
      className="w-full max-w-sm mx-auto"
      onSubmit={handleSubmit}
    >
      {
        formInputs.map((input) => (
          <div
            key={input.id}
            className="flex items-center border-b-2 border-teal-500 py-2"
          >
            <label htmlFor={input.id} className="block text-gray-700 text-sm font-bold mb-2">
              {input.label}
            </label>
            <input
              id={input.id}
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type={input.type}
              placeholder={input.placeholder}
              aria-label={input.label}
              onChange={event => input.onchange(event)}
              required
            />
          </div>
        ))
      }
      <div className="flex items-center py-2">
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Create Event
        </button>
      </div>
    </form>
  )
}

export default CreatEvent