import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import MataPelajaranService from "@api/matapelajaran";
import { UpdateMataPelajaranRequestModel } from "@api/matapelajaran/model";
import { useMataPelajaranpageContext } from "../../context";
import useMataPelajaran from "../../List/hook/useMataPelajaran";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";
import { useNavigate } from "react-router-dom";

interface HookReturn {
  fetchMataPelajaranById: (id_mata_pelajaran: string) => void;
  handleSubmitForm: (id_mata_pelajaran: string, onClose: () => void) => void;
}

const useUpdateMataPelajaran = (): HookReturn => {
  const { setState, state } = useMataPelajaranpageContext();
  const { filters } = state;
  const mataPelajaranService = new MataPelajaranService();
  const { handleSubmit } = useFormContext();
  const { fetchMataPelajaran } = useMataPelajaran();
  const { getItem } = LocalStorage();
  const navigate = useNavigate();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const fetchMataPelajaranById = async (id_mata_pelajaran: string) => {
    await mataPelajaranService.fetchMataPelajaranByIdRequest(
      id_mata_pelajaran,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            mataPelajaranByIdRequest: data,
          }));
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
        },
      },
      navigate,
      "karyawan",
      userData[0]?.access_token || ""
    );
  };

  const handleSubmitForm = (id_mata_pelajaran: string, onClose: () => void) => {
    return handleSubmit((values) => {
      const data: UpdateMataPelajaranRequestModel = {
        nama: values?.nama,
        status: values?.status,
      };

      setState((prev) => ({
        ...prev,
        mataPelajaranLoading: true,
      }));

      mataPelajaranService.updateMataPelajaranRequest(
        id_mata_pelajaran,
        data,
        {
          onSuccess: () => {
            snackbar.success("Successfully Updated Mata Pelajaran");
            setState((prev) => ({
              ...prev,
              mataPelajaranLoading: false,
            }));

            fetchMataPelajaran(
              `?page=${filters?.page}&desc=${filters?.orderBy}`
            );
            onClose();
          },
          onError: (errMessage) => {
            snackbar.error(errMessage);
            setState((prev) => ({
              ...prev,
              mataPelajaranLoading: false,
            }));
          },
        },
        navigate,
        "karyawan",
        userData[0]?.access_token || ""
      );
    })();
  };

  return {
    fetchMataPelajaranById,
    handleSubmitForm,
  };
};
export default useUpdateMataPelajaran;
