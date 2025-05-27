import { snackbar } from "@utils/snackbar";
import { usekaryawanpageContext } from "../../context";
import { useFormContext } from "react-hook-form";
import KaryawanService from "@api/karyawan";
import { UpdateKaryawanRequestModel } from "@api/karyawan/model";
import useKaryawan from "../../List/hook/useKaryawan";

interface HookReturn {
  fetchKaryawanById: (kdKaryawan: string) => void;
  handleSubmitForm: (kdKaryawan: string, onClose: () => void) => void;
}

const useUpdateKaryawan = (): HookReturn => {
  const { setState, state } = usekaryawanpageContext();
  const { filters } = state;
  const karyawanService = new KaryawanService();
  const { handleSubmit } = useFormContext();
  const { fetchKaryawan } = useKaryawan();

  const fetchKaryawanById = async (kdKaryawan: string) => {
    await karyawanService.fetchKaryawanByIdRequest(kdKaryawan, {
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          karyawanByIdRequest: data,
        }));
      },
      onError: (errMessage) => {
        snackbar.error(errMessage);
      },
    });
  };

  const handleSubmitForm = (kdKaryawan: string, onClose: () => void) => {
    return handleSubmit((values) => {
      const data: UpdateKaryawanRequestModel = {
        name: values?.name,
        email: values?.email,
        no_telp: values?.no_telp,
        password: values?.password,
        id_role: values?.id_role,
        status: values?.status,
      };

      setState((prev) => ({
        ...prev,
        manageKaryawanLoading: true,
      }));

      karyawanService.updateKaryawanRequest(kdKaryawan, data, {
        onSuccess: () => {
          snackbar.success("Successfully Updated Karyawan");
          setState((prev) => ({
            ...prev,
            karyawanLoading: false,
          }));

          fetchKaryawan(`?page=${filters?.page}&desc=${filters?.orderBy}`);
          onClose();
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
          setState((prev) => ({
            ...prev,
            karyawanLoading: false,
          }));
        },
      });
    })();
  };

  return {
    fetchKaryawanById,
    handleSubmitForm,
  };
};
export default useUpdateKaryawan;
