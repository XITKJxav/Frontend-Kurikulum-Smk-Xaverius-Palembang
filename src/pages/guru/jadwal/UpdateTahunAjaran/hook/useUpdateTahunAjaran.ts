import SchenduleService from "@api/jadwal";
import { UpdateTahunAjaranModel } from "@api/jadwal/model";
import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import useSchendule from "../../List/hook/useSchendule";
import { useNavigate } from "react-router-dom";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";
import { useJadwalpageContext } from "../../context";

interface HookReturn {
  handleUpdateTahunAjaran: () => void;
  fetchTahunAjaranRequest: () => void;
}

const useUpdateTahunAjaran = (): HookReturn => {
  const schenduleService = new SchenduleService();
  const { handleSubmit, trigger, setValue } = useFormContext();
  const { setState } = useJadwalpageContext();
  const { fetchJadwal } = useSchendule();
  const { getItem } = LocalStorage();
  const navigate = useNavigate();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const fetchTahunAjaranRequest = async () => {
    setState((prev) => ({
      ...prev,
      schendulePageLoading: true,
    }));
    schenduleService.fetchTahunAjaranRequest(
      {
        onSuccess: (data) => {
          setValue(
            "tahun_ajaran_awal",
            new Date(`${data[0].tahun_ajaran_awal}-01-01`)
          );
          setValue(
            "tahun_ajaran_akhir",
            new Date(`${data[0].tahun_ajaran_akhir}-01-01`)
          );
          setState((prev) => ({
            ...prev,
            schendulePageLoading: false,
          }));
        },
        onError: (err) => {
          snackbar.error(err);
          setState((prev) => ({
            ...prev,
            schendulePageLoading: false,
          }));
        },
      },
      navigate,
      "karyawan",
      userData[0]?.access_token
    );
  };

  const handleUpdateTahunAjaran = () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        schendulePageLoading: true,
      }));

      const data: UpdateTahunAjaranModel = {
        tahun_ajaran_akhir: values?.tahun_ajaran_akhir,
        tahun_ajaran_awal: values?.tahun_ajaran_awal,
      };

      trigger();
      schenduleService.UpdateTahunAjaran(
        data,
        {
          onSuccess: () => {
            snackbar.success("Tahun ajaran berhasil diperbarui");

            setState((prev) => ({
              ...prev,
              schendulePageLoading: false,
            }));
            fetchJadwal();
          },
          onError: (errMessage) => {
            snackbar.error(errMessage);
            setState((prev) => ({
              ...prev,
              schendulePageLoading: false,
            }));
          },
        },
        navigate,
        "karyawan",
        userData[0]?.access_token
      );
    })();
  };
  return {
    fetchTahunAjaranRequest,
    handleUpdateTahunAjaran,
  };
};
export default useUpdateTahunAjaran;
