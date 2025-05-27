import { snackbar } from "@utils/snackbar";
scrollX;
import { useNavigate } from "react-router-dom";
import MataPelajaranService from "@api/matapelajaran";
import { useMataPelajaranpageContext } from "../../context";

interface HookReturn {
  fetchMataPelajaran: (params: string) => void;
}

const useMataPelajaran = (): HookReturn => {
  const navigate = useNavigate();
  const mataPelajaranService = new MataPelajaranService();
  const { setState } = useMataPelajaranpageContext();

  const fetchMataPelajaran = async (params: string) => {
    setState((prev) => ({
      ...prev,
      manageJurusanLoading: true,
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
      navigate
    );
  };

  return {
    fetchMataPelajaran,
  };
};
export default useMataPelajaran;
