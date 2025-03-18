import { useState } from "react";
import Navbar from "../common/components/Navbar";
import Sidebar from "../common/components/Sidebar";
import { useDashboardpageContext } from "@pages/guru/dashboard/context";
import DashboardBody from "./partials/DashboardBody";
import { AppType } from "@types";

const DashboardGuru = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { state, setState } = useDashboardpageContext();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClose = () => {
    setIsSidebarOpen(false);
  };

  const handleChangeApp = (appName: AppType) => {
    setState((prev) => ({
      ...prev,
      app: appName,
    }));
  };

  return (
    <div className="flex flex-col h-screen overflow-x-hidden border-red-100">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          isClose={handleClose}
          onChangeApp={handleChangeApp}
          isActive={state.app}
        />
        <div className="bg-gray-100 flex-1 p-5">
          <DashboardBody />
        </div>
      </div>
    </div>
  );
};
export default DashboardGuru;
