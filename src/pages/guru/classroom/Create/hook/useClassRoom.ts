import { useFormContext } from "react-hook-form";
import { useClassroompageContext } from "../../context";
import ClassRoomService from "@api/classroom";
import { ClassRoomCreateModel } from "@api/classroom/model";
import { snackbar } from "@utils/snackbar";

interface HookReturn {
  handleSubmitForm: () => void;
}

const useClassRoom = (): HookReturn => {
  const { setState } = useClassroompageContext();
  const { handleSubmit, trigger } = useFormContext();
  const classRoomService = new ClassRoomService();

  const handleSubmitForm = async () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        classroomLoading: true,
      }));

      const classRoomData: ClassRoomCreateModel = {
        nomor_ruangan: values.nomor_ruangan,
        kd_jurusan: values.kd_jurusan,
        kd_wali_kelas: values.kd_wali_kelas,
      };

      trigger();
      classRoomService.createClassRoomRequest(classRoomData, {
        onSuccess: () => {
          snackbar.success("Successfully create class Room");

          setState((prev) => ({
            ...prev,
            classroomLoading: false,
          }));
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
          setState((prev) => ({
            ...prev,
            classroomLoading: false,
          }));
        },
      });
    })();
  };

  return {
    handleSubmitForm,
  };
};
export default useClassRoom;
