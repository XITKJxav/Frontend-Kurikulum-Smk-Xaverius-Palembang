import { Link } from "react-router-dom";
import { clsx } from "clsx";
import { listMenuGuru } from "@config/menu";
import { AppType } from "@types";
import { Logout } from "@mui/icons-material";
import { useDashboardpageContext } from "@pages/guru/dashboard/context";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  isActive: string;
  isClose: () => void;
  onChangeApp: (app: AppType) => void;
}

const Sidebar = (props: Props) => {
  const { isOpen, isActive, isClose, onChangeApp } = props;
  const { state, setState } = useDashboardpageContext();

  useEffect(() => {}, [state.app]);

  const handleMenuClick = (appTitle: string) => {
    // Log both the current app and the title that was clicked
    console.log("Clicked:", appTitle, "Current app:", state.app);

    // Immediately update the state, if you want the app to change to "manage jurusan"
    setState((prevState) => ({
      ...prevState,
      app: appTitle as AppType, // Set the app state to the selected menu's title
    }));

    // Call onChangeApp to perform any additional logic based on appTitle
    onChangeApp(appTitle as AppType);
  };

  return (
    <div className="z-10">
      <div
        onClick={isClose}
        className={clsx(
          "lg:hidden fixed top-0 left-0 w-full h-full bg-black bg-opacity-50",
          isOpen ? "block" : "hidden"
        )}
      ></div>
      <div
        className={clsx(
          "transform-cpu bg-gradient-to-t from-[#0C0950] to-[#161179] text-white w-64 h-full p-5 fixed top-0 left-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0"
        )}
      >
        <ul className="space-y-4">
          {listMenuGuru.map((data, index) => (
            <li className="" key={index}>
              <div
                onClick={() => handleMenuClick(data.title)} // Handle the click and update the app
                className={clsx(
                  "items-center flex gap-3 hover:bg-blue-600 p-2 rounded capitalize",
                  isActive.toLowerCase() === data.title.toLowerCase() &&
                    "bg-blue-600"
                )}
              >
                {data.icon}
                {data.title}
              </div>
            </li>
          ))}
          <Link
            to="/guru"
            className="items-center flex gap-3 hover:bg-blue-600 p-2 rounded"
          >
            <Logout />
            logout
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
