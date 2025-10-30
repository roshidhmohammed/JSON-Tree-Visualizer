import React from "react";
import { useNavigate } from "react-router-dom";


const ButtonPrimary = ({ name, order, isHighlight, pathname }) => {
    const navigate = useNavigate()

    const handleNavigation=(url)=>{
        navigate(`${url}`)
    }

  return (
    <div className=" relative ">
      <button onClick={()=> handleNavigation(pathname)} className={` ${isHighlight && "bg-linear-to-r"}  md:min-w-[150px] min-w-[70px] p-[3px] dark:border-indigo-500 cursor-pointer border-indigo-500 px-4 py-3 text-sm font-medium text-gray-100 hover:bg-linear-to-r from-indigo-500
       to-purple-500 border  ${order=== "first" ? "rounded-l-lg" :  order=== "last" ? "rounded-r-lg" : ""} relative group transition duration-600 hover:bg-transparent  focus:z-10 
         focus:bg-linear-to-r   `}>
        {name}
      </button>
    </div>
  );
};

export default ButtonPrimary;

// <button className="p-[3px] relative min-w-[150px]">
//   <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
//   <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
//   {name}
//   </div>
// </button>
