import SchenduleService from "@api/jadwal";
import { snackbar } from "@utils/snackbar";
import { useSchedulePageContext } from "../context";

interface HookReturn {
  fetchTimeRegulerRequest: () => void;
  fetchDayRequest: () => void;
}

const useSchendule = (): HookReturn => {
  const schenduleService = new SchenduleService();
  const { setState } = useSchedulePageContext();

  const fetchTimeRegulerRequest = () => {
    setState((prev) => ({
      ...prev,
      schendulePageLoading: true,
    }));
    schenduleService.fetchRegulerTimeRequest({
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          schendulePageLoading: false,
          schenduleTimeRegulerReq: data,
        }));
      },
      onError: (err) => {
        snackbar.error(err);
        setState((prev) => ({
          ...prev,
          schendulePageLoading: false,
        }));
      },
    });
  };

  const fetchDayRequest = () => {
    setState((prev) => ({
      ...prev,
      schendulePageLoading: true,
    }));
    schenduleService.fetchDayRequest({
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          schendulePageLoading: false,
          schenduleDayReq: data[0],
        }));
        console.log("data:", data);
      },

      onError: (err) => {
        snackbar.error(err);
        setState((prev) => ({
          ...prev,
          schendulePageLoading: false,
        }));
      },
    });
  };
  return {
    fetchTimeRegulerRequest,
    fetchDayRequest,
  };
};
export default useSchendule;
