import React, { useState } from "react";
import Link from "next/link";
import { useEth } from "../contexts/EthContext";
import connectWallet from "../contexts/EthContext/utils/connectWallet";

export type Menu = {
  href: string,
  title: string
}

type Props = {
  menus: Menu[]
}

const Navbar = ({ menus }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    state: { account },
    dispatch,
  } = useEth();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Tickets Tocken</span>
      </div>
      {
        account
          ? (
            <div className="rounded-lg bg-white p-2">
              {account.substring(0, 4)}...{account.substring(account.length - 4)}
            </div>
          )
          : (
            <button
              className="rounded-lg bg-white p-2"
              onClick={() => connectWallet(dispatch)}
            >
              Connect Wallet
            </button>
          )
      }
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
        </button>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
        <div className="text-sm lg:flex-grow">
          {
            menus.map((menu: Menu, index: number) => (
              <Link
                key={index}
                href={menu.href}
                className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                {menu.title}
              </Link>
            ))
          }
        </div>

      </div>
      
    </nav>
  )
}

export default Navbar;