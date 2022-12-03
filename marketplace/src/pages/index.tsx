import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Ticket Tockens</title>
        <meta name="description" content="NFT Ticketing Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
    </>
  );
};

export default Home;
