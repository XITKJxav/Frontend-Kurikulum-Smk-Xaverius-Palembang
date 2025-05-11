import { SignInClassCoordinatorDataModel } from "@api/classcoordinator/model";
import img from "@assets/profile.webp";
import { Logout } from "@mui/icons-material";

interface Props {
  onClickProfile: () => void;
  activeDropDownProfile: boolean;
  onLogout: () => void;
  userData: SignInClassCoordinatorDataModel | undefined;
}

const Navbar = ({
  onClickProfile,
  activeDropDownProfile,
  onLogout,
  userData,
}: Props) => {
  return (
    <nav className="relative bg-[#261FB3] text-white py-4 px-12 shadow-md drop-shadow-lg">
      <div className="flex items-center justify-between mx-auto">
        <h2 className="text-2xl font-semibold">SMK XAVERIUS</h2>
        <div className="relative">
          <div
            onClick={onClickProfile}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div
              className="w-10 h-10 bg-center bg-cover rounded-full"
              style={{ backgroundImage: `url(${img})` }}
            ></div>
            <span className="text-lg">{userData?.name}</span>
          </div>

          {activeDropDownProfile && (
            <div className="absolute right-0 z-50 w-48 mt-4 text-white bg-[#1b158d] rounded-lg shadow-lg">
              <ul className="py-2">
                <li
                  className="flex gap-2 px-4 py-2 cursor-pointer hover:bg-[#160dc6]"
                  onClick={onLogout}
                >
                  <Logout />
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
