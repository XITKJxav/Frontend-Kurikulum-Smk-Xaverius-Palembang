import JurusanService from "@api/jurusan";
import { JurusanCreateModel } from "@api/jurusan/model";
import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import { usejurusanpageContext } from "../../context";
import { LocalStorage } from "@utils/localStorage";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { useNavigate } from "react-router-dom";

interface HookReturn {
  handleSubmitForm: () => void;
}
const useCreateProgramJurusanForm = (): HookReturn => {
  const { trigger, handleSubmit } = useFormContext();
  const jurusanService = new JurusanService();
  const { setState } = usejurusanpageContext();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];
  const navigate = useNavigate();

  const handleSubmitForm = () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        manageJurusanLoading: true,
      }));
      const jurusanData: JurusanCreateModel = {
        nama_jurusan: values?.nama_jurusan,
      };
      trigger();
      jurusanService.createJurusanRequest(
        jurusanData,
        {
          onSuccess: () => {
            snackbar.success("Successfully created program jurusan");
            setState((prev) => ({
              ...prev,
              manageJurusanLoading: false,
            }));
          },
          onError: (errMessage) => {
            snackbar.error(errMessage);
            setState((prev) => ({
              ...prev,
              manageJurusanLoading: true,
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
export default useCreateProgramJurusanForm;
