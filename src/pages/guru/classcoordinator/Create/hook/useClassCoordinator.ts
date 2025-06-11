import { useFormContext } from "react-hook-form";
import { useClassCoordinatorPageContext } from "../../context";
import { snackbar } from "@utils/snackbar";
import ClassCoordinatorService from "@api/classcoordinator";
import { CreateClassCoordinatorModel } from "@api/classcoordinator/model";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "@utils/localStorage";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";

interface HookReturn {
  handleSubmitForm: () => void;
}

const useClassCoordinator = (): HookReturn => {
  const { setState } = useClassCoordinatorPageContext();
  const { handleSubmit, trigger } = useFormContext();
  const classCoordinatorService = new ClassCoordinatorService();
  const navigate = useNavigate();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const handleSubmitForm = async () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        classrCoordinatorLoading: true,
      }));

      const classCoordinatorData: CreateClassCoordinatorModel = {
        nisn: values.nisn,
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        id_ruang_kelas: values.id_ruang_kelas,
        no_telp: values.no_telp,
      };

      trigger();
      classCoordinatorService.createClassCoordinatorRequest(
        classCoordinatorData,
        {
          onSuccess: () => {
            snackbar.success("Successfully Create Class Coordinator");

            setState((prev) => ({
              ...prev,
              classrCoordinatorLoading: false,
            }));
          },
          onError: (errMessage) => {
            snackbar.error(errMessage);
            setState((prev) => ({
              ...prev,
              classrCoordinatorLoading: true,
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
    handleSubmitForm,
  };
};
export default useClassCoordinator;
