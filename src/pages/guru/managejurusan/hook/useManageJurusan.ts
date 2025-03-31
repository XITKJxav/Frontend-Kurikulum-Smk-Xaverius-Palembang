import JurusanService from "@api/jurusan";
import { snackbar } from "@utils/snackbar";
import { usejurusanpageContext } from "../context";
import { Redirect } from "@utils/redirect";

interface HookReturn {
  fetchJurusan: (params: string) => void;
}

const useManageJurusan = (): HookReturn => {
  const jurusanService = new JurusanService();
  const { setState } = usejurusanpageContext();

  const fetchJurusan = async (params: string) => {
    setState((prev) => ({
      ...prev,
      manageJurusanLoading: true,
    }));
    await jurusanService.fetchJurusanRequest(params, {
      onSuccess: (res) => {
        setState((prev) => ({
          ...prev,
          jurusanRequest: res,
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
    });
  };

  return {
    fetchJurusan,
  };
};
export default useManageJurusan;
