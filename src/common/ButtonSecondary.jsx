import React from "react";

const ButtonSecondary = ({ name, handle }) => {
  let bgClasses =
    name === "Reset"
      ? "bg-linear-to-r from-pink-500 via-red-500 to-red-500 hover:bg-white"
      : "bg-linear-to-r from-[#114ae4ff] to-[#d00ae642]";

  return (
    <button
    onClick={handle}
    type="submit"
      className={` cursor-pointer py-3 ${bgClasses}  min-w-[250px] px-8  rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white   `}
    >
      {name}
    </button>
  );
};

export default ButtonSecondary;
