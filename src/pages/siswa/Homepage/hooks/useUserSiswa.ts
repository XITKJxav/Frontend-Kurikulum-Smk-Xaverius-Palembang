import { LocalStorage } from "@utils/localStorage";
import { snackbar } from "@utils/snackbar";
import { useHomepageContext } from "../context";
import { siswaSignInResponseRequestModel } from "@api/authentication/model";
import ClassCoordinatorService from "@api/classcoordinator";

interface HookReturn {
  fetchUserSiswa: () => void;
}

const useUserSiswa = (): HookReturn => {
  const classCoordinatorService = new ClassCoordinatorService();
  const { getItem } = LocalStorage();
  const userData: siswaSignInResponseRequestModel[] = getItem("userData") ?? [];
  const { setState } = useHomepageContext();

  const fetchUserSiswa = () => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
    }));
    classCoordinatorService.fetchClassCoordinatorByidRequest(
      userData[0]?.kd_siswa,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }));
          console.log(data);
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }));
        },
      },
      userData[0]?.access_token || ""
    );
  };
  return { fetchUserSiswa };
};
export default useUserSiswa;
