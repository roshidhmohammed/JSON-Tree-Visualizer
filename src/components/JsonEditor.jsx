import React, { useState } from "react";

// constant data
import { placeholderJsonData } from "../constants/sampleJsonData";

// common components
import ButtonSecondary from "../common/ButtonSecondary";

// Alert
import { toast } from "sonner";

// react navigation
import { useNavigate } from "react-router-dom";

// Redux - centralized state management
import { useDispatch, useSelector } from "react-redux";
import { addJsonInput, removeJsonInput } from "../utils/slices/jsonInputSlice";

const JsonEditor = () => {
  const dispatch = useDispatch();
  const jsonData = useSelector((store) => store.jsonInput);
  const [jsonInput, setjsonInput] = useState(
    JSON.stringify(jsonData) !== "null" ? JSON.stringify(jsonData) : ""
  );
  const navigate = useNavigate();

  const handleJsonInput = (e) => {
    setjsonInput(e.target.value);
  };

  const generateTree = () => {
    toast.dismiss();
    try {
      if (!jsonInput) {
        toast.error("Please enter the valid JSON in the below field.");
      }
      const isJsonParse = JSON.parse(jsonInput);
      if (isJsonParse) {
        dispatch(addJsonInput(JSON.parse(jsonInput)));
        navigate("/tree-visualizer");
      }
    } catch (error) {
      toast.error("Invalid JSON Format. Please enter the valid JSON.");
    }
  };

  const resetJsonInput = () => {
    dispatch(removeJsonInput());
    setjsonInput("");
  };

  return (
    <div className="  pt-50  z-50 flex justify-center flex-col items-center">
      <h1 className="dark:text-white text-2xl z-50 font-bold">
        Type your Json Input Value
      </h1>
      <div className="z-50 mt-10 w-full lg:px-80 px-10">
        <div className=" ">
          <textarea
            value={jsonInput}
            placeholder={placeholderJsonData}
            onChange={(e) => handleJsonInput(e)}
            className=" bg-gray-800  w-full h-[45vh] overflow-y-auto p-5 rounded-md text-gray-100 focus:ring-indigo-500  focus:ring-2 focus:outline-none"
          />
        </div>
        <div className=" flex justify-center md:flex-row flex-col items-center gap-5 mt-5">
          <ButtonSecondary name="Reset" handle={resetJsonInput} />
          <ButtonSecondary
            name="Generate Tree Visualizer"
            handle={generateTree}
          />
        </div>
      </div>
    </div>
  );
};

export default JsonEditor;
