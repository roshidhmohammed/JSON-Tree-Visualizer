import React from "react";

// common components
import Button from "../common/ButtonPrimary";

// Raect navigation
import { useLocation } from "react-router-dom";

const ButtonGroups = () => {
  const { pathname } = useLocation();

  return (
    <div className="inline-flex  shadow-xs dark:bg-transparent  bg-black rounded-lg">
      <Button
        name="JSON Editor"
        order="first"
        isHighlight={pathname === "/" ? true : false}
        pathname={"/"}
      />
      <Button
        name="Tree"
        order="last"
        isHighlight={pathname === "/tree-visualizer" ? true : false}
        pathname={"/tree-visualizer"}
      />
    </div>
  );
};

export default ButtonGroups;
