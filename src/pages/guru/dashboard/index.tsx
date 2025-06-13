import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useDashboardpageContext } from "@pages/guru/dashboard/context";
import DashboardBody from "./partials/DashboardBody";
import { AppType } from "@types";
import { LocalStorage } from "@utils/localStorage";
import useSignOutKaryawan from "./hook/useSignOutKaryawan";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { useNavigate } from "react-router-dom";

const DashboardGuru = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { state, setState } = useDashboardpageContext();
  const { setItem, getItem } = LocalStorage();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const { handleSignOut } = useSignOutKaryawan();
  const [activeDropDownProfile, setActiveDropDownProfile] =
    useState<boolean>(false);

  const handleClose = () => {
    setIsSidebarOpen(false);
  };

  const handleChangeApp = (appName: AppType) => {
    setItem("appPage", appName);
    setState((prev) => ({
      ...prev,
      app: getItem("appPage") || "home",
    }));

    setIsSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      app: getItem("appPage") || "home",
    }));
  }, []);
  const handleProfileDropDown = () => {
    setActiveDropDownProfile(!activeDropDownProfile);
  };

  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  return (
    <>
      {!userData.length ? (
        <div className="flex flex-col h-screen overflow-x-hidden border-red-100 ">
          <Navbar
            toggleSidebar={toggleSidebar}
            onLogout={() => handleSignOut()}
            onClickProfile={handleProfileDropDown}
            activeDropDownProfile={activeDropDownProfile}
          />
          <div className="flex flex-1">
            <Sidebar
              isOpen={isSidebarOpen}
              isClose={handleClose}
              onChangeApp={handleChangeApp}
              isActive={state.app}
            />
            <div className="flex-1 w-full p-3 bg-gray-100">
              <DashboardBody />
              <footer className="py-3 mt-2 text-center">
                <p>&copy; 2025 SMK XAVERIUS powered by Multi Data Palembang</p>
              </footer>
            </div>
          </div>
        </div>
      ) : (
        <>hellow</>
      )}
    </>
  );
};
export default DashboardGuru;
