import DurasiPembelajaranService from "@api/durasipembelajaran";
import { useDurasiPembelajaranpageContext } from "../../context";
import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import { DurasiPembelajaranModel } from "@api/durasipembelajaran/model";
import { duration } from "@mui/material";

interface HookReturn {
  fetchDurasiPembelajaran: () => void;
  updateDurasiPembelajaran: () => void;
}
const useUpdateDurasiPembelajaran = (): HookReturn => {
  const durasiSevices = new DurasiPembelajaranService();
  const { setState } = useDurasiPembelajaranpageContext();
  const { handleSubmit, trigger } = useFormContext();

  const fetchDurasiPembelajaran = async () => {
    setState((prev) => ({
      ...prev,
      durasiPembelajaranLoading: true,
    }));
    await durasiSevices.fetchDurasiPembelajaranRequest({
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          durasiPembelajaranLoading: false,
          durasiPembelajaranRequest: data,
        }));
      },
      onError: (err) => {
        snackbar.error(err);
        setState((prev) => ({
          ...prev,
          durasiPembelajaranLoading: false,
        }));
      },
    });
  };
  const updateDurasiPembelajaran = async () => {
    return handleSubmit((values) => {
      setState((prev) => ({
        ...prev,
        durasiPembelajaranLoading: true,
      }));
      const data: DurasiPembelajaranModel = {
        duration_time_study: values.duration_time_study,
      };

      trigger();
      durasiSevices.UpdateDurasiPembelajaranRequest(data, {
        onSuccess: () => {
          snackbar.success("Berhasil mengubah durasi pembelajaran.");
          setState((prev) => ({
            ...prev,
            durasiPembelajaranLoading: false,
          }));
        },
        onError: (err) => {
          snackbar.success(err);
          setState((prev) => ({
            ...prev,
            durasiPembelajaranLoading: false,
          }));
        },
      });
    });
  };
  return { fetchDurasiPembelajaran, updateDurasiPembelajaran };
};
export default useUpdateDurasiPembelajaran;
