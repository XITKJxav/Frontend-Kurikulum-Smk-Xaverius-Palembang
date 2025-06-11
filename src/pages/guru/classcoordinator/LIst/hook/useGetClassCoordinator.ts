import { useClassCoordinatorPageContext } from "../../context";
import { snackbar } from "@utils/snackbar";
import ClassCoordinatorService from "@api/classcoordinator";
import { useNavigate } from "react-router-dom";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";

interface HookReturn {
  fetchClassCoordinator: (params: string) => void;
  fetchClassRoom: () => void;
}

const useGetClassCoordinator = (): HookReturn => {
  const classCoordinatorService = new ClassCoordinatorService();
  const { setState } = useClassCoordinatorPageContext();
  const navigate = useNavigate();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const fetchClassCoordinator = async (params: string) => {
    setState((prev) => ({
      ...prev,
      classCoordinatorLoading: true,
    }));
    await classCoordinatorService.fetchClassCoordinatorRequest(
      params,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            classCoordinatorRequest: data[0],
            classCoordinatorLoading: false,
          }));
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
          setState((prev) => ({
            ...prev,
            classCoordinatorLoading: false,
          }));
        },
      },
      navigate,
      "karyawan",
      userData[0]?.access_token || ""
    );
  };

  const fetchClassRoom = async () => {
    setState((prev) => ({
      ...prev,
      classCoordinatorLoading: true,
    }));

    await classCoordinatorService.fetchClassRoomRequestOptions(
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            classRoomRequest: data[0],
            classCoordinatorLoading: false,
          }));
          console.log(data);
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
          setState((prev) => ({
            ...prev,
            classCoordinatorLoading: false,
          }));
        },
      },
      navigate,
      "karyawan",
      userData[0]?.access_token || ""
    );
  };

  return { fetchClassCoordinator, fetchClassRoom };
};
export default useGetClassCoordinator;
