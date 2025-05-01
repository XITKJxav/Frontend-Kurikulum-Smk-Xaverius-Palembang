import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import { useClassroompageContext } from "../../context";
import useGetClassRoom from "../../LIst/hook/useGetClassRoom";
import { Filters } from "../../LIst/utils/Filters";
import ClassRoomService from "@api/classroom";
import { ClassRoomUpdateModel } from "@api/classroom/model";

interface HookReturn {
  fetchClassRoomById: (id: number) => void;
  handleUpdateForm: (id: number, onClose: () => void) => void;
}

const useUpdateClassRoom = (): HookReturn => {
  const { setState, state } = useClassroompageContext();
  const { filtersClassRoom } = state;
  const classRoomService = new ClassRoomService();
  const { handleSubmit } = useFormContext();
  const { fetchClassRoom } = useGetClassRoom();

  const fetchClassRoomById = (id: number) => {
    classRoomService.fetchClassRoomByIdRequest(id, {
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          classroomByIdRequest: [data],
        }));
      },
      onError: (errMessage) => {
        snackbar.error(errMessage);
      },
    });
  };

  const handleUpdateForm = (id: number, onClose: () => void) => {
    return handleSubmit((values) => {
      const data: ClassRoomUpdateModel = {
        nomor_ruangan: values.nomor_ruangan,
        kd_jurusan: values.kd_jurusan,
        status: values.status,
      };

      setState((prev) => ({
        ...prev,
        manageJurusanLoading: true,
      }));

      classRoomService.updateClassRoomRequest(id, data, {
        onSuccess: (data) => {
          snackbar.success("Successfully Updated Status Program Jurusan");
          setState((prev) => ({
            ...prev,
            manageJurusanLoading: false,
          }));
          console.log(data);
          fetchClassRoom(
            Filters({
              onPage: filtersClassRoom?.page,
              onOrder: filtersClassRoom?.orderBy,
            })
          );
          onClose();
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
          setState((prev) => ({
            ...prev,
            manageJurusanLoading: false,
          }));
        },
      });
    })();
  };

  return {
    fetchClassRoomById,
    handleUpdateForm,
  };
};
export default useUpdateClassRoom;
