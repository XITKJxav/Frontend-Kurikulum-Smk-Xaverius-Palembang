import SchenduleService from "@api/jadwal";
import { useJadwalpageContext } from "../../context";
import { snackbar } from "@utils/snackbar";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { JadwalUpdateModel } from "@api/jadwal/model";
import useJadwalPiket from "@pages/guru/jadwalpiket/List/hook/useJadwalPiket";
import useSchendule from "../../List/hook/useSchendule";

interface HookReturn {
  updateSchendule: (onCloseDialog: () => void) => void;
}
const useSchenduleUpdate = (): HookReturn => {
  const schenduleService = new SchenduleService();
  const { setState } = useJadwalpageContext();
  const { handleSubmit, trigger } = useFormContext();
  const navigate = useNavigate();
  const { fetchJadwal } = useSchendule();
  const updateSchendule = async (onCloseDialog: () => void) => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        schendulePageLoading: true,
      }));

      onCloseDialog();

      const data: JadwalUpdateModel = {
        id_ruangan_kelas: values.id_ruangan_kelas,
        id_hari: values.id_hari,
        kd_jam_pembelajaran: values.kd_jam_pembelajaran,
        id_mata_pelajaran: values.id_mata_pelajaran,
        id_pengajar: values.id_pengajar,
        kd_guru_piket: values.kd_guru_piket,
      };

      trigger();
      schenduleService.updateJadwalRequest(data, {
        onSuccess: () => {
          snackbar.success("Jadwal berhasil disimpan");

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
      });
    })();
  };

  return {
    updateSchendule,
  };
};
export default useSchenduleUpdate;
