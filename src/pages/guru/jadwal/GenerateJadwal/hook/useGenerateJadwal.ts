import SchenduleService from "@api/jadwal";
import { GenerateJadwalModel } from "@api/jadwal/model";
import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import { useJadwalpageContext } from "../../context";
import { LocalStorage } from "@utils/localStorage";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import useSchendule from "../../List/hook/useSchendule";

interface HookReturn {
  updateGenerateJadwalRequest: () => void;
}

const useGenerateJadwal = (): HookReturn => {
  const schenduleService = new SchenduleService();
  const { handleSubmit, trigger } = useFormContext();
  const { fetchJadwal } = useSchendule();
  const { setState } = useJadwalpageContext();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const updateGenerateJadwalRequest = () => {
    return handleSubmit(async (values) => {
      const data: GenerateJadwalModel = {
        id_hari: values?.id_hari,
        id_ruangan_kelas: values?.id_ruangan_kelas,
        id_jam_awal: values?.id_jam_awal,
        id_jam_akhir: values?.id_jam_akhir,
        id_mata_pelajaran: values?.id_mata_pelajaran,
        id_pengajar: values?.id_pengajar,
        kd_guru_piket: values?.kd_guru_piket,
      };

      setState((prev) => ({
        ...prev,
        schendulePageLoading: true,
      }));
      trigger();
      await schenduleService.generateJadwalUpdateRequest(
        data,
        {
          onSuccess: () => {
            setState((prev) => ({
              ...prev,
              schendulePageLoading: false,
            }));
            snackbar.success("berhasil mengubah data jadwal");
            fetchJadwal();
          },
          onError: (err) => {
            setState((prev) => ({
              ...prev,
              schendulePageLoading: false,
            }));
            snackbar.error(err);
          },
        },
        userData[0]?.access_token
      );
    })();
  };

  return {
    updateGenerateJadwalRequest,
  };
};

export default useGenerateJadwal;
