import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Link from "next/link";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <nav className="border-b p-6">
        <p className="text-4xl font-bold">Tickets Tockens</p>
        <div className="flex mt-4">
          <Link href="/" className="mr-6 text-pink-500">
              Home
          </Link>
          <Link href="/create-ticket" className="mr-6 text-pink-500">
              Sell Ticket
          </Link>
          <Link href="/my-tickets" className="mr-6 text-pink-500">
              My Tickets
          </Link>
          <Link href="/creator-dashboard" className="mr-6 text-pink-500">
            Creator Dashboard
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
