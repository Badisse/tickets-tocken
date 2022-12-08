import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useEth } from "../contexts/EthContext";
import type { Event, BigNumber } from 'ethers';
import Link from "next/link";

const Home: NextPage = () => {
  const {
    state: { eventContract, eventWsContract },
  } = useEth();
  const [events, setEvents] = useState<Event[] | null>(null)

  useEffect(() => {
    const getEvents = async () => {
      if (!eventContract) return;

      const eventFilter = eventContract.filters.EventCreated();
      const eventsList = await eventContract.queryFilter(eventFilter);
      setEvents(eventsList);
    };

    getEvents();
  }, [eventContract]);

  useEffect(() => {
    const getWsEvents = async () => {
      if (!eventWsContract) return;

      eventWsContract.on("EventCreated", async (
        _id: BigNumber,
        _name: string,
        _date: string,
        _location: string,
        _ticket: string,
        _uri: string,
        event: Event
      ) => {
        setEvents((current) => {
          return current ? [...current, event] : [event];
        });
      });
    };

    getWsEvents();
  }, [eventWsContract]);

  return (
    <>
      <Head>
        <title>Ticket Tockens</title>
        <meta name="description" content="NFT Ticketing Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        events?.map((event) => (
          <div
            key={event.args?.id}
            className="flex justify-center my-2">
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
              <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img className="rounded-t-lg" src={event.args?.uri} alt="event-image" />
              </a>
              <div className="p-6">
                <h5 className="text-gray-900 text-xl font-medium mb-2">{event.args?.name}</h5>
                <p className="text-gray-700 text-base mb-4">
                  Date: {event.args?.date}
                </p>
                <p className="text-gray-700 text-base mb-4">
                  Location: {event.args?.location}
                </p>
                <Link href={`/events/${event.args?.id}`}>
                  <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Buy Ticket
                  </button>
                </Link>
                
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
};

export default Home;
