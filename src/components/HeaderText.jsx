import React from "react";

const HeaderText = () => {
  return (
    <div className=" ">
      <h1 className="text-gray-800  dark:text-gray-100 font-bold font-sans z-50 text-lg">
        JSON Tree Visualizer
      </h1>
    </div>
  );
};

export default React.memo(HeaderText);
