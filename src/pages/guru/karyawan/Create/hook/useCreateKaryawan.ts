import { snackbar } from "@utils/snackbar";
import KaryawanService from "@api/karyawan";
import { usekaryawanpageContext } from "../../context";
import { CreateKaryawanRequestModel } from "@api/karyawan/model";
import { useFormContext } from "react-hook-form";

interface HookReturn {
  handleSubmitForm: () => void;
}

const useCreateKaryawan = (): HookReturn => {
  const { trigger, handleSubmit } = useFormContext();
  const karyawanService = new KaryawanService();
  const { setState } = usekaryawanpageContext();

  const handleSubmitForm = () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        KaryawanLoading: true,
      }));

      const classCoordinatorData: CreateKaryawanRequestModel = {
        name: values?.name,
        email: values?.email,
        password: values?.password,
        password_confirmation: values?.password_confirmation,
        no_telp: values?.no_telp,
        id_role: values?.id_role,
      };

      karyawanService.createKaryawanRequest(classCoordinatorData, {
        onSuccess: () => {
          snackbar.success("Successfully Create data karyawan");
          setState((prev) => ({
            ...prev,
            KaryawanLoading: false,
          }));
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
          setState((prev) => ({
            ...prev,
            KaryawanLoading: false,
          }));
        },
      });
    })();
  };
  return { handleSubmitForm };
};
export default useCreateKaryawan;
