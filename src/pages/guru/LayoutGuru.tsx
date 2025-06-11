import { Outlet } from "react-router-dom";
import { DashboardpageProvider } from "@pages/guru/dashboard/context";

const LayoutGuru = () => {
  return (
    <DashboardpageProvider>
      <Outlet />
    </DashboardpageProvider>
  );
};

export default LayoutGuru;
