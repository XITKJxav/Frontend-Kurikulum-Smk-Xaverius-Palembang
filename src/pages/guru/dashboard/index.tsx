import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
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
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen overflow-x-hidden border-red-100 ">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          isClose={handleClose}
          onChangeApp={handleChangeApp}
          isActive={state.app}
        />
        <div className="bg-gray-100 flex-1 p-3 w-full">
          <DashboardBody />
          <footer className="text-center py-3 mt-2">
            <p>&copy; 2025 SMK XAVERIUS powered by Multi Data Palembang</p>
          </footer>
        </div>
      </div>
    </div>
  );
};
export default DashboardGuru;
