import { Outlet } from "react-router-dom";

const LayoutGuru = () => {
  return (
    <div className="background">
      <Outlet />
    </div>
  );
};

export default LayoutGuru;
