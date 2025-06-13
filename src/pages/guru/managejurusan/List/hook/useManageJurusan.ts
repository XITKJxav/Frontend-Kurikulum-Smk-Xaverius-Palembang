import JurusanService from "@api/jurusan";
import { snackbar } from "@utils/snackbar";
import { usejurusanpageContext } from "../../context";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";

interface HookReturn {
  fetchJurusan: (params: string) => void;
}

const useManageJurusan = (): HookReturn => {
  const jurusanService = new JurusanService();
  const { setState } = usejurusanpageContext();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const fetchJurusan = async (params: string) => {
    setState((prev) => ({
      ...prev,
      manageJurusanLoading: true,
    }));
    await jurusanService.fetchJurusanRequest(
      params,
      {
        onSuccess: (res) => {
          setState((prev) => ({
            ...prev,
            jurusanRequest: res[0],
            manageJurusanLoading: false,
          }));
        },
        onError: (errMessage) => {
          setState((prev) => ({
            ...prev,
            manageJurusanLoading: false,
          }));

          snackbar.error(errMessage);
        },
      },
      userData[0]?.access_token
    );
  };

  return {
    fetchJurusan,
  };
};
export default useManageJurusan;
