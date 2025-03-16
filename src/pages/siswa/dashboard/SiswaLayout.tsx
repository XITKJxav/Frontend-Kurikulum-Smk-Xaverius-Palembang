import { Outlet } from "react-router-dom";

const LayoutSiswa = () => {
  return (
    <div className="background">
      <Outlet />
    </div>
  );
};

export default LayoutSiswa;
