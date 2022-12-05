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
    <nav className="relative bg-white shadow-lg">
      <div className="flex items-center justify-between px-6 py-3 bg-gray-200">
        <div className="flex items-center">
          <span className="font-semibold text-xl tracking-tight text-gray-700">Tickets Tocken</span>
        </div>
        <div className="block lg:hidden">
          <button
            className="px-3 py-2 rounded-lg focus:outline-none focus:text-gray-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <div className={`${isOpen ? "block" : "hidden"} px-2 pt-2 pb-4 mt-2 bg-gray-200`}>
        {
          menus.map((menu: Menu, index: number) => (
            <Link
              key={index}
              href={menu.href}
              className="block mt-1 mx-2 text-sm font-semibold rounded-lg focus:outline-none focus:bg-gray-300"
            >
              {menu.title}
            </Link>
          ))
        }
      </div>
      <div className="px-6 py-3 bg-gray-200">
        {
          account
            ? (
              <div className="text-sm text-gray-700">
                {account}
              </div>
            )
            : (
              <button
                className="px-4 py-2 font-bold text-gray-800 rounded-lg bg-white focus:outline-none focus:shadow-outline"
                onClick={() => connectWallet(dispatch)}
              >
                Connect Wallet
              </button>
            )
        }

      </div>
    </nav>
  )
}

export default Navbar;
