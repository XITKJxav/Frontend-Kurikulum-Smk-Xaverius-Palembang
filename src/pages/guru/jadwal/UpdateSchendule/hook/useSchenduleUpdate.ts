import SchenduleService from "@api/jadwal";
import { useJadwalpageContext } from "../../context";
import { snackbar } from "@utils/snackbar";
import { useNavigate } from "react-router-dom";
import { JadwalUpdateModel } from "@api/jadwal/model";
import { useFormContext } from "react-hook-form";
interface HookReturn {
  updateSchendule: () => void;
}
const useSchenduleUpdate = (): HookReturn => {
  const schenduleService = new SchenduleService();
  const { setState } = useJadwalpageContext();
  const { handleSubmit, trigger } = useFormContext();
  const navigate = useNavigate();

  const updateSchendule = async () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        schendulePageLoading: true,
      }));
      console.log("Tipe dan isi data:");
      console.log(
        "id_mata_pelajaran:",
        typeof values.id_mata_pelajaran,
        values.id_mata_pelajaran
      );
      console.log(
        "id_pengajar:",
        typeof values.id_pengajar,
        values.id_pengajar
      );
      console.log(
        "kd_guru_piket:",
        typeof values.kd_guru_piket,
        values.kd_guru_piket
      );

      // const createJadwalData: JadwalUpdateModel = {
      //   id_ruangan_kelas: values.id_ruangan_kelas,
      //   id_hari: values.id_hari,
      //   kd_jam_pembelajaran: values.kd_jam_pembelajaran,
      //   id_mata_pelajaran: values.id_mata_pelajaran,
      //   id_pengajar: values.id_pengajar,
      //   kd_guru_piket: values.kd_guru_piket,
      // };

      // console.log("ini data", createJadwalData);
      const formData = new FormData();
      formData.append("id_ruangan_kelas", values.id_ruangan_kelas);
      formData.append("id_hari", values.id_hari);
      formData.append("kd_jam_pembelajaran", values.kd_jam_pembelajaran);
      formData.append("id_mata_pelajaran", values.id_mata_pelajaran);
      formData.append("id_pengajar", values.id_pengajar);
      formData.append("kd_guru_piket", values.kd_guru_piket);
      trigger();
      schenduleService.updateJadwalRequest(formData, {
        onSuccess: () => {
          snackbar.success("Jadwal berhasil disimpan");

          setState((prev) => ({
            ...prev,
            schendulePageLoading: false,
          }));
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
