import ClassRoomService from "@api/classroom";
import { useClassroompageContext } from "../../context";
import { snackbar } from "@utils/snackbar";
import HealthOptionService from "@api/HealthOption";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";

interface HookReturn {
  fetchClassRoom: (params: string) => void;
  fetchJurusan: () => void;
  fetchWaliKelas: () => void;
}

const useGetClassRoom = (): HookReturn => {
  const classRoomService = new ClassRoomService();
  const healthOptionService = new HealthOptionService();
  const { setState } = useClassroompageContext();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const fetchJurusan = async () => {
    await healthOptionService.fetchJurusanRequestOptions(
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            jurusanRequest: data[0],
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
      },
      userData[0]?.access_token
    );
  };

  const fetchClassRoom = async (params: string) => {
    setState((prev) => ({
      ...prev,
      classroomLoading: true,
    }));

    await classRoomService.fetchClassRoomRequest(
      params,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            classroomRequest: data[0],
            classroomLoading: false,
          }));
          console.log(data);
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
          setState((prev) => ({
            ...prev,
            classroomLoading: false,
          }));
        },
      },
      userData[0]?.access_token
    );
  };

  const fetchWaliKelas = async () => {
    setState((prev) => ({
      ...prev,
      classroomLoading: true,
    }));

    await healthOptionService.fetchKaryawanRequestOptions(
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            waliKelasRequest: data[0],
            classroomLoading: false,
          }));
        },
        onError: (err) => {
          snackbar.error(err);
          setState((prev) => ({
            ...prev,
            classroomLoading: false,
          }));
        },
      },
      userData[0]?.access_token
    );
  };

  return { fetchJurusan, fetchClassRoom, fetchWaliKelas };
};
export default useGetClassRoom;
