import { LocalStorage } from "@utils/localStorage";
import { snackbar } from "@utils/snackbar";
import { useHomepageContext } from "../context";
import AuthtenticationService from "@api/authentication";
import { siswaSignInResponseRequestModel } from "@api/authentication/model";

interface HookReturn {
  handleSignOut: () => void;
}

const useSignOutClassCoordinator = (): HookReturn => {
  const classCoordinatorService = new AuthtenticationService();
  const { deleteItem, getItem } = LocalStorage();
  const userData: siswaSignInResponseRequestModel[] = getItem("userData") ?? [];
  const { setState } = useHomepageContext();

  const handleSignOut = () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    classCoordinatorService.signOutSiswaRequest(
      userData[0]?.access_token || "",
      {
        onSuccess: () => {
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }));
          deleteItem("userData");
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }));
        },
      }
    );
  };
  return { handleSignOut };
};
export default useSignOutClassCoordinator;
