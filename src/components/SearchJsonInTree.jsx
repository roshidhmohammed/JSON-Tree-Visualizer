import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addSearch } from "../utils/slices/searchSlice";

const SearchJsonInTree = () => {
  const [searchInput, setSearchInput] = useState("root.");
  const dispatch = useDispatch();

  const handleSearch = () => {
  
        dispatch(addSearch(searchInput));
 
  };

  return (
    <div className="z-[99999999] shadow-sm shadow-gray-400 fixed h-12 mt-30 rounded-lg border border-[#464646] text-white bg-[#232323] left-20 w-120">
      <div className=" relative">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className=" w-full h-12 px-4  rounded-lg"
          placeholder="Search the json node "
        />
        <IoSearchSharp onClick={handleSearch} className=" absolute right-3 top-2/7 text-2xl cursor-pointer" />
      </div>
    </div>
  );
};

export default SearchJsonInTree;
