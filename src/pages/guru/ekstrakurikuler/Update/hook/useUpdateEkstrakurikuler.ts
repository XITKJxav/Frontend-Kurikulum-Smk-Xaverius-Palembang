import EkstrakurikulerService from "@api/ekstrakurikuler";
import { useEkstrakurikulerpageContext } from "../../context";
import { useFormContext } from "react-hook-form";
import { UpdateEkstrakurikulerRequestModel } from "@api/ekstrakurikuler/model";
import { snackbar } from "@utils/snackbar";
import useEkstrakurikuler from "../../List/hook/useEkstrakurikuler";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";
interface HookReturn {
  updateEkstrakurikulerRequest: (id: number, onClose: () => void) => void;
  fetchEkstrakurikulerByidRequest: (id: number) => void;
}
const useUpdateEkstrakurikuler = (): HookReturn => {
  const { setState } = useEkstrakurikulerpageContext();
  const ekstrakurikulerService = new EkstrakurikulerService();
  const { fetchEkstrakurikulerRequest } = useEkstrakurikuler();
  const { handleSubmit } = useFormContext();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const fetchEkstrakurikulerByidRequest = (id: number) => {
    ekstrakurikulerService.fetchEkstrakurikulerByidRequest(
      id,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            ekstrakurikulerByIdRequest: data,
          }));
        },
        onError: (err) => {
          snackbar.error(err);
        },
      },
      userData[0]?.access_token
    );
  };

  const updateEkstrakurikulerRequest = (id: number, onClose: () => void) => {
    handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        ekstrakurikulerLoading: true,
      }));

      const data: UpdateEkstrakurikulerRequestModel = {
        id_hari: values.id_hari,
        id_ruangan_kelas: values.id_ruangan_kelas,
        jam_mulai_ekstra: values.jam_mulai_ekstra,
        jam_mulai_selesai: values.jam_mulai_selesai,
        deskripsi: values.deskripsi,
      };

      ekstrakurikulerService.updateEkstrakurikulerRequest(
        id,
        data,
        {
          onSuccess: () => {
            setState((prev) => ({
              ...prev,
              ekstrakurikulerLoading: false,
            }));
            snackbar.success("Berhasil mengubah data ekstrakurikuler");
            fetchEkstrakurikulerRequest("");
            onClose();
          },
          onError: (err) => {
            setState((prev) => ({
              ...prev,
              ekstrakurikulerLoading: false,
            }));
            snackbar.error(err);
          },
        },
        userData[0]?.access_token
      );
    })();
  };

  return {
    updateEkstrakurikulerRequest,
    fetchEkstrakurikulerByidRequest,
  };
};
export default useUpdateEkstrakurikuler;
