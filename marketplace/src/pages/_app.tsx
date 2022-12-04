import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import type { Menu } from "../components/Navbar";
import Navbar from "../components/Navbar";
import { EthProvider } from "../contexts/EthContext";

const menus: Menu[] = [
  {
    href: '/',
    title: 'Home'
  },
  {
    href: '/create-event',
    title: 'Create Event'
  },
  {
    href: '/about',
    title: 'About'
  },
]

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <EthProvider>
      <Navbar menus={menus} />
      <Component {...pageProps} />
    </EthProvider>
  );
};

export default trpc.withTRPC(MyApp);
