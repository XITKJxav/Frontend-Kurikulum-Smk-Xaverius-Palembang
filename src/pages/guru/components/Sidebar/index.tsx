import { Link } from "react-router-dom";
import { clsx } from "clsx";
import { listMenuGuru } from "@utils/menu";
import { AppType } from "@types";
import { Logout } from "@mui/icons-material";

interface Props {
  isOpen: boolean;
  isClose: () => void;
  isActive: string;
  onChangeApp: (app: AppType) => void;
}

const Sidebar = (props: Props) => {
  const { isOpen, isActive, isClose, onChangeApp } = props;

  return (
    <>
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
                onClick={() => onChangeApp(data?.title as AppType)}
                className={clsx(
                  "items-center flex gap-3 hover:bg-blue-600 p-2 rounded capitalize",
                  isActive.toLowerCase() == data?.title.toLowerCase() &&
                    "bg-blue-600"
                )}
              >
                {data?.icon}
                {data?.title}
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
    </>
  );
};

export default Sidebar;
