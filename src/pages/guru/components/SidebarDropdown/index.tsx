import { clsx } from "clsx";
import AppearOnScroll from "@components/Animation/AppearOnScroll";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

interface DropdownMenu {
  titleDropDown: string; // WAJIB kalau menu dropdown
  icon: React.ReactNode;
  children: {
    title: string;
    icon: React.ReactNode;
    part: React.ReactNode;
    role: string[];
  }[];
}

interface Props {
  menu: DropdownMenu;
  isActive: string;
  openDropdown: string | null;
  onClickParent: () => void;
  onClickChild: (childTitle: string) => void;
}

const SidebarDropdown = ({
  menu,
  isActive,
  openDropdown,
  onClickParent,
  onClickChild,
}: Props) => {
  const isOpen = openDropdown === menu.titleDropDown;
  const hasChildren = Array.isArray(menu.children) && menu.children.length > 0;

  return (
    <li>
      <div
        onClick={onClickParent}
        className="flex items-center gap-3 hover:bg-[#261FB3] p-2 rounded cursor-pointer capitalize"
      >
        {menu.icon}
        {menu.titleDropDown}
        <div className="ms-auto">
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </div>
      </div>

      {isOpen && hasChildren && (
        <ul className="p-3 rounded-md mt-2 space-y-2 bg-[#0C0950]">
          {menu.children.map((child, index) => (
            <AppearOnScroll key={index} duration={0.3 + 0.3 * index}>
              <li
                onClick={() => onClickChild(child.title)}
                className={clsx(
                  "flex items-center gap-2 hover:bg-[#261FB3] p-2 rounded capitalize cursor-pointer",
                  isActive.toLowerCase() === child.title.toLowerCase() &&
                    "bg-[#261FB3]"
                )}
              >
                {child.icon}
                {child.title}
              </li>
            </AppearOnScroll>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarDropdown;
