import CardAutosize from "@components/Card/CardAutosize";
import { useHomepageContext } from "./context";
import AutoMargin from "@components/Animation/AutoMargin";
import useWindowSize from "@hooks/useWindowSize";
import AppList from "./partials/AppList";
import { ArrowBack } from "@mui/icons-material";
import useHomepage from "./hooks/useHomepage";
import { appDisplayName } from "@utils/consts";
import AppearFadeIn from "@components/Animation/AppearFadeIn";
import SchedulePage from "../SchedulePage";
import bg1 from "@assets/bg-2.jpg";
import LoginAdministratorClassPage from "../login";
import { LocalStorage } from "@utils/localStorage";
import { useEffect, useState } from "react";
import Navbar from "./partials/Navbar";
import useSignOutClassCoordinator from "./hooks/useSignOutClassCoordinator";
import img from "@assets/logo.png";
import { LoadingDialog } from "@components/Dialog";
import { siswaSignInResponseRequestModel } from "@api/authentication/model";
import useUserSiswa from "./hooks/useUserSiswa";

const HomepageLayout = () => {
  const { state } = useHomepageContext();
  const { handleChangeApp } = useHomepage();
  const { md } = useWindowSize();
  const { getItem } = LocalStorage();
  const { handleSignOut } = useSignOutClassCoordinator();
  const { fetchUserSiswa } = useUserSiswa();
  const { isLoading } = state;
  const [activeDropDownProfile, setActiveDropDownProfile] =
    useState<boolean>(false);

  const appComponent = {
    home: <AppList />,
    schedule: <SchedulePage />,
  };

  const user: siswaSignInResponseRequestModel[] = getItem("userData") ?? [];

  const isAppHome = state.app === "home";

  const handleProfileDropDown = () => {
    setActiveDropDownProfile(!activeDropDownProfile);
  };

  useEffect(() => {
    if (user.length <= 0 || user) {
      return;
    }
    fetchUserSiswa();
  }, []);

  return (
    <div
      className="w-full h-[100vh] overflow-x-hidden bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      {isLoading && <LoadingDialog open={true} onClose={() => {}} />}
      <div className="flex flex-col w-full h-full overflow-x-hidden">
        {user.length > 0 && (
          <Navbar
            onLogout={() => handleSignOut()}
            userData={user[0]}
            onClickProfile={handleProfileDropDown}
            activeDropDownProfile={activeDropDownProfile}
          />
        )}
        <AutoMargin
          trigger={md}
          className="mx-auto w-fit "
          initial={{ marginTop: "1rem" }}
          animate={{ marginTop: state.app === "home" ? "6rem" : "1rem" }}
        >
          {!user && (
            <img
              src={img}
              alt="logo"
              className="w-32 h-auto sm:w-28 md:w-24 lg:w-25 xl:w-30"
            />
          )}
        </AutoMargin>
        <div className="flex items-center justify-center p-1 md:p-4">
          {!user[0] ? (
            <LoginAdministratorClassPage />
          ) : (
            <CardAutosize
              className="mx-auto rounded-lg shadow-lg backdrop-blur-lg bg-stone-500/30"
              trigger={!isAppHome}
              initialSize={{ width: "32.3rem" }}
              animateSize={{ width: "60rem" }}
            >
              {!isAppHome && (
                <div className="flex h-9">
                  <AppearFadeIn direction="left" className="drop-shadow-xl">
                    <button
                      className="absolute ms-3 mt-1.5 w-fit"
                      onClick={() => handleChangeApp("home")}
                    >
                      <ArrowBack />
                    </button>
                  </AppearFadeIn>
                  <AppearFadeIn
                    direction="top"
                    className="m-auto drop-shadow-xl"
                  >
                    {appDisplayName[state.app]}
                  </AppearFadeIn>
                </div>
              )}
              <div
                className={`mx-3 mt-1 mb-3 overflow-auto ${
                  !isAppHome && "md:h-[70vh] h-[80vh]"
                }`}
              >
                {appComponent[state.app]}
              </div>
            </CardAutosize>
          )}
        </div>
      </div>
      <footer className="py-4 text-center text-white backdrop-blur-lg bg-stone-500/20">
        <p>&copy; 2025 SMK XAVERIUS powered by Multi Data Palembang</p>
      </footer>
    </div>
  );
};

export default HomepageLayout;
