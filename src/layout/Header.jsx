import React from "react";
import ButtonGroups from "./ButtonGroups";
import HeaderText from "../components/HeaderText";
import ThemeToggleButton from "../components/ThemeToggleButton";

const Header = () => {
  return (
    <div className=" z-[999999] flex justify-between md:px-20 px-2 pt-5 items-center fixed left-0 right-0 w-full  py-10">  
      <HeaderText />
      <ButtonGroups />
      <ThemeToggleButton/>
    </div>
  );
};

export default Header;
