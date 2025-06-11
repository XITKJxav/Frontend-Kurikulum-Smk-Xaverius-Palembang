import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import { useClassroompageContext } from "../../context";
import useGetClassRoom from "../../LIst/hook/useGetClassRoom";
import { Filters } from "../../LIst/utils/Filters";
import ClassRoomService from "@api/classroom";
import { ClassRoomUpdateModel } from "@api/classroom/model";
import { useNavigate } from "react-router-dom";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";

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
  const navigate = useNavigate();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];
  const fetchClassRoomById = async (id: number) => {
    await classRoomService.fetchClassRoomByIdRequest(
      id,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            classroomByIdRequest: data,
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

  const handleUpdateForm = (id: number, onClose: () => void) => {
    return handleSubmit((values) => {
      const data: ClassRoomUpdateModel = {
        nomor_ruangan: values.nomor_ruangan,
        kd_jurusan: values.kd_jurusan,
        kd_wali_kelas: values.kd_wali_kelas,
        status: values.status,
      };

      setState((prev) => ({
        ...prev,
        classRoomLoading: true,
      }));

      classRoomService.updateClassRoomRequest(
        id,
        data,
        {
          onSuccess: () => {
            snackbar.success("Successfully Updated Class Room");
            setState((prev) => ({
              ...prev,
              classRoomLoading: false,
            }));
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
              classRoomLoading: false,
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
    fetchClassRoomById,
    handleUpdateForm,
  };
};
export default useUpdateClassRoom;
