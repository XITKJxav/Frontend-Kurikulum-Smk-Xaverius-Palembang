import SchenduleService from "@api/jadwal";
import { GenerateJadwalModel } from "@api/jadwal/model";
import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useJadwalpageContext } from "../../context";
import { LocalStorage } from "@utils/localStorage";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";

interface HookReturn {
  updateGenerateJadwalRequest: () => void;
}

const useGenerateJadwal = (): HookReturn => {
  const schenduleService = new SchenduleService();
  const { handleSubmit } = useFormContext();
  const navigate = useNavigate();
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
        id_mata_pelajaran: values?.id_pengajar,
        id_pengajar: values?.id_pengajar,
        id_guru_piket: values?.id_guru_piket,
      };

      setState((prev) => ({
        ...prev,
        schendulePageLoading: true,
      }));

      await schenduleService.generateJadwalUpdateRequest(
        data,
        {
          onSuccess: () => {
            setState((prev) => ({
              ...prev,
              schendulePageLoading: false,
            }));
          },
          onError: (err) => {
            setState((prev) => ({
              ...prev,
              schendulePageLoading: false,
            }));
            snackbar.error(err);
          },
        },
        navigate,
        "karyawan",
        userData[0]?.access_token
      );
    });
  };

  return {
    updateGenerateJadwalRequest,
  };
};

export default useGenerateJadwal;
