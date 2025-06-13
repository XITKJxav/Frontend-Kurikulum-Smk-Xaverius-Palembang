import AuthtenticationService from "@api/authentication";
import { useDashboardpageContext } from "../context";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";
import { snackbar } from "@utils/snackbar";
import { useNavigate } from "react-router-dom";

interface HookReturn {
  handleSignOut: () => void;
}

const useSignOutKaryawan = (): HookReturn => {
  const { setState } = useDashboardpageContext();
  const authService = new AuthtenticationService();
  const { getItem, deleteItem } = LocalStorage();
  const navigate = useNavigate();
  const karyawanData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];
  const listKaryawan = karyawanData?.[0];

  const handleSignOut = () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    authService.signOutKaryawanRequest(listKaryawan?.access_token || "", {
      onSuccess: () => {
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
        deleteItem("karyawanData");
        navigate("/sign-in");
      },
      onError: (errMessage) => {
        snackbar.error(errMessage);
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
        deleteItem("karyawanData");
        navigate("/sign-in");
      },
    });
  };

  return { handleSignOut };
};
export default useSignOutKaryawan;
