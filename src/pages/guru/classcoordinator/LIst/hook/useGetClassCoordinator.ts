import { useClassCoordinatorPageContext } from "../../context";
import { snackbar } from "@utils/snackbar";
import ClassCoordinatorService from "@api/classcoordinator";
import { useNavigate } from "react-router-dom";

interface HookReturn {
  fetchClassCoordinator: (params: string) => void;
  fetchClassRoom: () => void;
}

const useGetClassCoordinator = (): HookReturn => {
  const classCoordinatorService = new ClassCoordinatorService();
  const { setState } = useClassCoordinatorPageContext();
  const navigate = useNavigate();

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
            classCoordinatorRequest: data,
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
      navigate
    );
  };

  const fetchClassRoom = async () => {
    setState((prev) => ({
      ...prev,
      classCoordinatorLoading: true,
    }));

    await classCoordinatorService.fetchClassRoomRequestOptions({
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          classRoomRequest: data,
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
    });
  };

  return { fetchClassCoordinator, fetchClassRoom };
};
export default useGetClassCoordinator;
