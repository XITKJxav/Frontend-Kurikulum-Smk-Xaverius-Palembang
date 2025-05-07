import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clsx } from "clsx";
import { listMenuGuru } from "@config/menu";
import { AppType } from "@types";
import { Logout } from "@mui/icons-material";
import SidebarDropdown from "../SidebarDropdown";
import AppearOnScroll from "@components/Animation/AppearOnScroll";

interface Props {
  isOpen: boolean;
  isActive: string;
  isClose: () => void;
  onChangeApp: (app: AppType) => void;
}

const Sidebar = ({ isOpen, isActive, isClose, onChangeApp }: Props) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleMenuClick = (appTitle: string, menuTitle?: string) => {
    onChangeApp(appTitle as AppType);
    isClose();
    setOpenDropdown((prev) => (prev === menuTitle ? prev : null));
  };

  const toggleDropdown = (dropdownTitle: string) => {
    setOpenDropdown((prev) => (prev === dropdownTitle ? null : dropdownTitle));
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
          "transform-cpu bg-[#151168] text-white w-64 h-full p-5 fixed top-0 left-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0"
        )}
      >
        <ul className="space-y-4">
          {listMenuGuru.map((menu, index) => (
            <AppearOnScroll
              key={index}
              className="space-y-4"
              duration={0.2 + 0.2 * index}
            >
              {menu.children ? (
                <SidebarDropdown
                  key={index}
                  menu={menu}
                  openDropdown={openDropdown}
                  isActive={isActive}
                  onClickParent={() => toggleDropdown(menu.titleDropDown)}
                  onClickChild={(childTitle) =>
                    handleMenuClick(childTitle, menu.titleDropDown)
                  }
                />
              ) : (
                <li>
                  <div
                    onClick={() => handleMenuClick(menu.title)}
                    className={clsx(
                      "flex items-center gap-3 hover:bg-[#261FB3] p-2 rounded capitalize cursor-pointer",
                      isActive.toLowerCase() === menu.title.toLowerCase() &&
                        "bg-[#261FB3]"
                    )}
                  >
                    {menu.icon}
                    {menu.title}
                  </div>
                </li>
              )}
            </AppearOnScroll>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
