import { snackbar } from "@utils/snackbar";
import KaryawanService from "@api/karyawan";
import { usekaryawanpageContext } from "../../context";
import { CreateKaryawanRequestModel } from "@api/karyawan/model";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";

interface HookReturn {
  handleSubmitForm: () => void;
}

const useCreateKaryawan = (): HookReturn => {
  const { trigger, handleSubmit } = useFormContext();
  const karyawanService = new KaryawanService();
  const { setState } = usekaryawanpageContext();
  const { getItem } = LocalStorage();
  const navigate = useNavigate();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const handleSubmitForm = () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        KaryawanLoading: true,
      }));

      const karyawanData: CreateKaryawanRequestModel = {
        niy: values?.niy,
        name: values?.name,
        email: values?.email,
        password: values?.password,
        password_confirmation: values?.password_confirmation,
        no_telp: values?.no_telp,
        id_role: values?.id_role,
      };
      trigger();

      await karyawanService.createKaryawanRequest(
        karyawanData,
        {
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
        },
        navigate,
        "karyawan",
        userData[0]?.access_token
      );
    })();
  };
  return { handleSubmitForm };
};
export default useCreateKaryawan;
