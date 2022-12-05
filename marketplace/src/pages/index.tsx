import { type NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useEth } from "../contexts/EthContext";
import type { Event } from 'ethers';

const Home: NextPage = () => {
  const {
    state: { eventContract },
  } = useEth();
  const [events, setEvents] = useState<Event[]>()

  useEffect(() => {
    const getEvents = async () => {
      const eventFilter = eventContract?.filters.EventCreated();
      const eventsList: Event[] | undefined = eventFilter
        ? await eventContract.queryFilter(eventFilter)
        : null;
      setEvents(eventsList)
    }

    getEvents()
    
  }, [eventContract])

  return (
    <>
      <Head>
        <title>Ticket Tockens</title>
        <meta name="description" content="NFT Ticketing Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        events?.map((event, index) => (
          <div
            key={index}
            className="flex justify-center">
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
              <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img className="rounded-t-lg" src="https://mdbootstrap.com/img/new/standard/nature/182.jpg" alt="" />
              </a>
              <div className="p-6">
                <h5 className="text-gray-900 text-xl font-medium mb-2">{event.args?.name}</h5>
                <p className="text-gray-700 text-base mb-4">
                  Some quick example text to build on the card title and make up the bulk of the
                  content.
                </p>
                <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
              </div>
            </div>
          </div>
        ))
      }
    </>
  );
};

export default Home;
