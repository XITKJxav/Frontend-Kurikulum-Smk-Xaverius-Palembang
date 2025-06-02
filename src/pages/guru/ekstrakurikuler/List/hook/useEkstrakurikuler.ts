import { snackbar } from "@utils/snackbar";
scrollX;
import { useNavigate } from "react-router-dom";
import { useEkstrakurikulerpageContext } from "../../context";
import EkstrakurikulerService from "@api/ekstrakurikuler";
import HealthOptionService from "@api/HealthOption";
import SchenduleService from "@api/jadwal";

interface HookReturn {
  fetchEkstrakurikulerRequest: (params: string) => void;
  deleteEkstrakurikulerRequest: (id: number) => void;
  fetchDayRequest: () => void;
  fetchClassRoom: () => void;
}

const useEkstrakurikuler = (): HookReturn => {
  const navigate = useNavigate();
  const ekstrakurikulerService = new EkstrakurikulerService();
  const option = new HealthOptionService();
  const dayService = new SchenduleService();
  const { setState } = useEkstrakurikulerpageContext();

  const fetchClassRoom = async () => {
    setState((prev) => ({
      ...prev,
      ekstrakurikulerLoading: true,
    }));
    option.fetchClassRoomRequestOptions({
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          ekstrakurikulerLoading: false,
          classRoomRequest: data[0],
        }));
      },
      onError: (err) => {
        snackbar.error(err);
        setState((prev) => ({
          ...prev,
          ekstrakurikulerLoading: false,
        }));
      },
    });
  };

  const fetchDayRequest = async () => {
    setState((prev) => ({
      ...prev,
      ekstrakurikulerLoading: true,
    }));

    dayService.fetchDayRequest({
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          dayRequest: data[0],
          ekstrakurikulerLoading: false,
        }));
      },
      onError: (errMessage) => {
        snackbar.error(errMessage);
        setState((prev) => ({
          ...prev,
          ekstrakurikulerLoading: false,
        }));
      },
    });
  };

  const fetchEkstrakurikulerRequest = async (params: string) => {
    setState((prev) => ({
      ...prev,
      ekstrakurikulerLoading: false,
    }));
    console.log("datanya");

    await ekstrakurikulerService.fetchEkstrakurikulerRequest(
      params,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            ekstrakurikulerRequest: data[0],
            ekstrakurikulerLoading: false,
          }));
        },
        onError: (errMessage) => {
          setState((prev) => ({
            ...prev,
            ekstrakurikulerLoading: false,
          }));
          snackbar.error(errMessage);
        },
      },
      navigate
    );
  };

  const deleteEkstrakurikulerRequest = async (id: number) => {
    setState((prev) => ({
      ...prev,
      ekstrakurikulerLoading: false,
    }));

    await ekstrakurikulerService.deleteEkstrakurikulerRequest(
      id,
      {
        onSuccess: () => {
          setState((prev) => ({
            ...prev,
            ekstrakurikulerLoading: false,
          }));
          snackbar.success("Data berhasil dihapus");
          fetchEkstrakurikulerRequest("");
        },
        onError: (errMessage) => {
          setState((prev) => ({
            ...prev,
            ekstrakurikulerLoading: false,
          }));
          snackbar.error(errMessage);
        },
      },
      navigate
    );
    return;
  };

  return {
    fetchEkstrakurikulerRequest,
    deleteEkstrakurikulerRequest,
    fetchDayRequest,
    fetchClassRoom,
  };
};
export default useEkstrakurikuler;
