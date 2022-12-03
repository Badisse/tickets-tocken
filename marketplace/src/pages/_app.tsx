import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import type { Menu } from "../components/Navbar";
import Navbar from "../components/Navbar";

const menus: Menu[] = [
  {
    href: '/',
    title: 'Home'
  },
  {
    href: '/about',
    title: 'About'
  },
]

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Navbar menus={menus} />
      <Component {...pageProps} />
    </>
  );
};

export default trpc.withTRPC(MyApp);
