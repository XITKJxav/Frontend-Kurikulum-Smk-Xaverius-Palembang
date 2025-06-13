import { snackbar } from "@utils/snackbar";
import { usekaryawanpageContext } from "../../context";
import KaryawanService from "@api/karyawan";
import { useNavigate } from "react-router-dom";
import HealthOptionService from "@api/HealthOption";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";

interface HookReturn {
  fetchKaryawan: (params: string) => void;
  fetchRole: () => void;
}

const useKaryawan = (): HookReturn => {
  const navigate = useNavigate();
  const karyawanService = new KaryawanService();
  const roleService = new HealthOptionService();
  const { setState } = usekaryawanpageContext();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const fetchKaryawan = async (params: string) => {
    setState((prev) => ({
      ...prev,
      KaryawanLoading: true,
    }));
    await karyawanService.fetchKaryawanRequest(
      params,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            karyawanRequest: data[0],
            KaryawanLoading: false,
          }));
          console.log(data);
        },
        onError: (errMessage) => {
          setState((prev) => ({
            ...prev,
            KaryawanLoading: false,
          }));
          snackbar.error(errMessage);
        },
      },
      userData[0]?.access_token
    );
  };
  const fetchRole = async () => {
    await roleService.fetchRoleRequestOptions(
      {
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
      },
      userData[0]?.access_token
    );
  };

  return {
    fetchKaryawan,
    fetchRole,
  };
};
export default useKaryawan;
