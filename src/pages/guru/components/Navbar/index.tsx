import { Menu } from "@mui/icons-material";

interface Props {
  toggleSidebar: () => void;
}

const Navbar = (props: Props) => {
  const { toggleSidebar } = props;

  return (
    <nav className="bg-[#261FB3] text-white py-4 px-6 shadow-md drop-shadow-lg">
      <div className=" mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold">SMK XAVERIUS</h2>
        </div>

        <button
          onClick={toggleSidebar}
          className="lg:hidden text-white text-3xl focus:outline-none"
        >
          <Menu />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
