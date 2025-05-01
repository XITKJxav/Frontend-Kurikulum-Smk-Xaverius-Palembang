import ClassRoomService from "@api/classroom";
import { useClassroompageContext } from "../../context";
import { snackbar } from "@utils/snackbar";

interface HookReturn {
  fetchClassRoom: (params: string) => void;
  fetchJurusan: (params: string) => void;
}

const useGetClassRoom = (): HookReturn => {
  const classRoomService = new ClassRoomService();
  const { setState } = useClassroompageContext();

  const fetchJurusan = async (params: string) => {
    await classRoomService.fetchJurusanRequest(params, {
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          jurusanRequest: data,
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
  };

  const fetchClassRoom = async (params: string) => {
    setState((prev) => ({
      ...prev,
      classroomLoading: true,
    }));

    await classRoomService.fetchClassRoomRequest(params, {
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          classroomRequest: data,
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
  };

  return { fetchJurusan, fetchClassRoom };
};
export default useGetClassRoom;
