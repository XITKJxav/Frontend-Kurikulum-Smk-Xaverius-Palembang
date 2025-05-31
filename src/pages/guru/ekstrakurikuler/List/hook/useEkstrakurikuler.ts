import { snackbar } from "@utils/snackbar";
scrollX;
import { useNavigate } from "react-router-dom";
import { useEkstrakurikulerpageContext } from "../../context";
import EkstrakurikulerService from "@api/ekstrakurikuler";
import HealthOptionService from "@api/HealthOption";
import SchenduleService from "@api/jadwal";

interface HookReturn {
  fetchEkstrakurikulerRequest: (params: string) => void;
  fetchDayRequest: () => void;
}

const useEkstrakurikuler = (): HookReturn => {
  const navigate = useNavigate();
  const ekstrakurikulerService = new EkstrakurikulerService();
  const dayService = new SchenduleService();
  const { setState } = useEkstrakurikulerpageContext();

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
          console.log("datanya", data[0]);
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

  return {
    fetchEkstrakurikulerRequest,
    fetchDayRequest,
  };
};
export default useEkstrakurikuler;
