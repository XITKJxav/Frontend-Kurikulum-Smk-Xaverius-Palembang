import { snackbar } from "@utils/snackbar";
import { usekaryawanpageContext } from "../../context";
import KaryawanService from "@api/karyawan";
import { useNavigate } from "react-router-dom";
import HealthOptionService from "@api/HealthOption";

interface HookReturn {
  fetchKaryawan: (params: string) => void;
  fetchRole: () => void;
}

const useKaryawan = (): HookReturn => {
  const navigate = useNavigate();
  const karyawanService = new KaryawanService();
  const roleService = new HealthOptionService();
  const { setState } = usekaryawanpageContext();

  const fetchKaryawan = async (params: string) => {
    setState((prev) => ({
      ...prev,
      manageJurusanLoading: true,
    }));
    await karyawanService.fetchKaryawanRequest(
      params,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            karyawanRequest: data[0],
            karyawanLoading: false,
          }));
          console.log(data);
        },
        onError: (errMessage) => {
          setState((prev) => ({
            ...prev,
            karyawanLoading: false,
          }));
          snackbar.error(errMessage);
        },
      },
      navigate
    );
  };
  const fetchRole = async () => {
    await roleService.fetchRoleRequestOptions({
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          roleRequest: data[0],
        }));
        console.log(data);
      },
      onError: (errMessage) => {
        snackbar.error(errMessage);
      },
    });
  };

  return {
    fetchKaryawan,
    fetchRole,
  };
};
export default useKaryawan;
