import React from "react";

// Dark && Light Theme
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggleButton = () => {
  const { toggleTheme } = useTheme();

  return (
    <>
      <div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            onChange={toggleTheme}
            className="sr-only peer"
          />
          <div
            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
   peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-100 peer-checked:after:translate-x-full
    rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px]
     dark:after:bg-black after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
      dark:border-gray-600 peer-checked:bg-gray-900 dark:peer-checked:bg-blue-600"
          ></div>
        </label>
      </div>
    </>
  );
};

export default React.memo(ThemeToggleButton);
