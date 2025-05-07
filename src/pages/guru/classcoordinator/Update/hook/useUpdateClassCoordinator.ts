import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import { useClassCoordinatorPageContext } from "../../context";
import { Filters } from "../../LIst/utils/Filters";
import useGetClassCoordinator from "../../LIst/hook/useGetClassCoordinator";
import { UpdateClassCoordinatorModel } from "@api/classcoordinator/model";
import ClassCoordinatorService from "@api/classcoordinator";

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

  const fetchClassCoordinatorById = (id: string) => {
    classCoordinatorService.fetchClassCoordinatorByidRequest(id, {
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          classCoordinatorByIdRequest: data,
        }));
      },
      onError: (errMessage) => {
        snackbar.error(errMessage);
      },
    });
  };

  const handleUpdateForm = (id: string, onClose: () => void) => {
    return handleSubmit((values) => {
      const data: UpdateClassCoordinatorModel = {
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

      classCoordinatorService.updateClassCoordinatorRequest(id, data, {
        onSuccess: (data) => {
          snackbar.success("Successfully Updated Class Coordinator");
          setState((prev) => ({
            ...prev,
            classrCoordinatorLoading: false,
          }));
          console.log(data);
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
      });
    })();
  };

  return {
    fetchClassCoordinatorById,
    handleUpdateForm,
  };
};
export default useUpdateClassCoordinator;
