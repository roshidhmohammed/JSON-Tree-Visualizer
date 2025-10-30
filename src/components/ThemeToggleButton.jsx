import React from "react";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();
  console.log(theme);

  return (
    <>
      <div className="relative">
        <div className="block h-8 w-14">
          {theme === "dark" ? (
            <button
              onClick={toggleTheme}
              className=" border dark:bg-gray-500 bg-gray-800 rounded-md p-1 px-2  cursor-pointer dark:hover:bg-gray-400"
            >
              <MdOutlineLightMode
                size={25}
                className=" text-white transition duration-500"
              />
            </button>
          ) : (
            <button
              onClick={toggleTheme}
              className=" border dark:bg-gray-500 bg-gray-800 rounded-md p-1 px-2  cursor-pointer dark:hover:bg-gray-400"
            >
              <MdDarkMode size={25} className="  transition duration-500 text-gray-100" />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(ThemeToggleButton);
