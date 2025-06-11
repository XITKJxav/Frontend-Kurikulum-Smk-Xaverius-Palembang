import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { Logout, Menu } from "@mui/icons-material";
import { LocalStorage } from "@utils/localStorage";
import img from "@assets/profile.webp";

interface Props {
  toggleSidebar: () => void;
  onClickProfile: () => void;
  activeDropDownProfile: boolean;
  onLogout: () => void;
}

const Navbar = (props: Props) => {
  const { toggleSidebar, onClickProfile, activeDropDownProfile, onLogout } =
    props;
  const { getItem } = LocalStorage();
  const karyawanData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];
  const listKaryawan = karyawanData?.[0];
  return (
    <nav className="bg-[#261FB3] text-white py-4 px-6 shadow-md drop-shadow-lg">
      <div className="relative flex items-center justify-between mx-auto">
        <div className="flex items-center">
          <h2 className="text-2xl font-semibold">SMK XAVERIUS</h2>
        </div>

        <div className="relative">
          <div
            onClick={onClickProfile}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div
              className="w-10 h-10 bg-center bg-cover border-2 border-white rounded-full"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
            <span className="text-lg font-medium">{listKaryawan?.name}</span>
            {listKaryawan.access_token ?? "kosong"}
          </div>

          {activeDropDownProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-[#1b158d] rounded-md shadow-lg border border-[#261FB3]">
              <ul className="py-2">
                <li
                  className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-[#160dc6] transition duration-150"
                  onClick={onLogout}
                >
                  <Logout className="text-white" fontSize="small" />
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>

        <button
          onClick={toggleSidebar}
          className="text-3xl text-white lg:hidden focus:outline-none"
        >
          <Menu />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
