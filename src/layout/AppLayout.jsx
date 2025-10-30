import { Outlet } from "react-router-dom";

// Components
import Header from "./Header";

// Alert
import AlertToaster from "../common/AlertToaster";

const AppLayout = () => {
  return (
    <>
      <AlertToaster />
      <div className="min-h-screen w-full relative">
        <div className="absolute inset-0 z-0 bg-dark  bg-pattern" />
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
