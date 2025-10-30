import React, { useState } from "react";

// components
import ButtonGroups from "./ButtonGroups";
import HeaderText from "../components/HeaderText";
import ThemeToggleButton from "../components/ThemeToggleButton";

// icons
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [showMenuTab, setShowMenuTab] = useState(false);

  const handleMenuTab = () => {
    setShowMenuTab(!showMenuTab);
  };

  return (
    <>
      <div className=" z-[999999]  hidden sm:flex justify-between md:px-20 px-2 pt-5 items-center fixed left-0 right-0 w-full  py-10">
        <HeaderText />
        <ButtonGroups />
        <ThemeToggleButton />
      </div>
      <div className="sm:hidden  flex-col flex  items-center">
        <div className=" z-[999999]  flex justify-between md:px-20 px-2 pt-5 items-center fixed left-0 right-0 w-full  py-10">
          <HeaderText />
          <button
            onClick={handleMenuTab}
            aria-label="Toggle menu"
            className="text-2xl dark:text-gray-100 text-gray-900 transition-transform duration-300"
          >
            {showMenuTab ? <IoClose /> : <GiHamburgerMenu />}
          </button>
        </div>
        <div
          className={`fixed z-[99999999999] top-0 left-0 right-0 w-full flex flex-col items-center bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out ${
            showMenuTab
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-5 pointer-events-none"
          }`}
        >
          <div className=" flex justify-end pr-2 items-center flex-row py-3 border-b border-gray-400 w-full">
            <button
              onClick={handleMenuTab}
              aria-label="Toggle menu"
              className="text-2xl dark:text-gray-100 text-gray-900 transition-transform duration-300"
            >
              {showMenuTab ? <IoClose /> : <GiHamburgerMenu />}
            </button>
          </div>
          <div className="py-6 space-y- h-40 flex justify-between w-full items-center px-3">
            <ButtonGroups />
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
