import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import { useClassCoordinatorPageContext } from "../../context";
import { Filters } from "../../LIst/utils/Filters";
import useGetClassCoordinator from "../../LIst/hook/useGetClassCoordinator";
import { UpdateClassCoordinatorModel } from "@api/classcoordinator/model";
import ClassCoordinatorService from "@api/classcoordinator";
import { useNavigate } from "react-router-dom";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";

interface HookReturn {
  fetchClassCoordinatorById: (id: string) => void;
  handleUpdateForm: (id: string, onClose: () => void) => void;
}

const useUpdateClassCoordinator = (): HookReturn => {
  const { setState, state } = useClassCoordinatorPageContext();
  const { filtersClassCoordinator } = state;
  const classCoordinatorService = new ClassCoordinatorService();
  const { handleSubmit } = useFormContext();
  const { fetchClassCoordinator } = useGetClassCoordinator();
  const navigate = useNavigate();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const fetchClassCoordinatorById = (id: string) => {
    classCoordinatorService.fetchClassCoordinatorByidRequest(
      id,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            classCoordinatorByIdRequest: data,
          }));
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
        },
      },
      navigate,
      "karyawan",
      userData[0]?.access_token
    );
  };

  const handleUpdateForm = (id: string, onClose: () => void) => {
    return handleSubmit((values) => {
      const data: UpdateClassCoordinatorModel = {
        nisn: values.nisn,
        name: values.name,
        email: values.email,
        password: values.password,
        id_ruang_kelas: values.id_ruang_kelas,
        no_telp: values.no_telp,
        status: values.status,
      };

      setState((prev) => ({
        ...prev,
        classCoordinatorLoading: true,
      }));

      classCoordinatorService.updateClassCoordinatorRequest(
        id,
        data,
        {
          onSuccess: () => {
            snackbar.success("Successfully Updated Class Coordinator");
            setState((prev) => ({
              ...prev,
              classrCoordinatorLoading: false,
            }));

            fetchClassCoordinator(
              Filters({
                onPage: filtersClassCoordinator?.page,
                onOrder: filtersClassCoordinator?.orderBy,
              })
            );
            onClose();
          },
          onError: (errMessage) => {
            snackbar.error(errMessage);
            setState((prev) => ({
              ...prev,
              classrCoordinatorLoading: false,
            }));
          },
        },
        navigate,
        "karyawan",
        userData[0]?.access_token
      );
    })();
  };

  return {
    fetchClassCoordinatorById,
    handleUpdateForm,
  };
};
export default useUpdateClassCoordinator;
