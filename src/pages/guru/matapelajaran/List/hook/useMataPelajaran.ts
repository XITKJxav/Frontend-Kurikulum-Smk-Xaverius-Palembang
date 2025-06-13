import { snackbar } from "@utils/snackbar";
import MataPelajaranService from "@api/matapelajaran";
import { useMataPelajaranpageContext } from "../../context";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";

interface HookReturn {
  fetchMataPelajaran: (params: string) => void;
}

const useMataPelajaran = (): HookReturn => {
  const mataPelajaranService = new MataPelajaranService();
  const { setState } = useMataPelajaranpageContext();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const fetchMataPelajaran = async (params: string) => {
    setState((prev) => ({
      ...prev,
      mataPelajaranLoading: true,
    }));

    await mataPelajaranService.fetchMataPelajaranRequest(
      params,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            mataPelajaranRequest: data[0],
            mataPelajaranLoading: false,
          }));
        },
        onError: (errMessage) => {
          setState((prev) => ({
            ...prev,
            mataPelajaranLoading: false,
          }));
          snackbar.error(errMessage);
        },
      },
      userData[0]?.access_token || ""
    );
  };

  return {
    fetchMataPelajaran,
  };
};
export default useMataPelajaran;
