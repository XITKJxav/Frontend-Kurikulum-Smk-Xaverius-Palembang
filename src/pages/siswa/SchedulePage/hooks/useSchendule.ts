import SchenduleService from "@api/jadwal";
import { snackbar } from "@utils/snackbar";
import { useSchedulePageContext } from "../context";

interface HookReturn {
  fetchTimeRegulerRequest: (params: string) => void;
  fetchDayRequest: () => void;
  fetchByIdJadwal: (params: string) => void;
  fetchJamUpacara: (hari: string | number) => void;
}

const useSchendule = (): HookReturn => {
  const schenduleService = new SchenduleService();
  const { setState } = useSchedulePageContext();

  const fetchTimeRegulerRequest = (params: string) => {
    setState((prev) => ({
      ...prev,
      schendulePageLoading: true,
    }));
    schenduleService.fetchRegulerTimeRequest(params, {
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

  const fetchByIdJadwal = async (params: string) => {
    setState((prev) => ({
      ...prev,
      SchedulePageLoading: true,
    }));
    schenduleService.fetchJadwalRequest(params, {
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          SchedulePageLoading: false,
          schenduleIdreq: data[0],
        }));
      },
      onError: (err) => {
        snackbar.error(err);
        setState((prev) => ({
          ...prev,
          SchedulePageLoading: false,
        }));
      },
    });
  };

  const fetchJamUpacara = async (hari: string | number) => {
    await schenduleService.fetchRegulerTimeUpacaraRequest(Number(hari), {
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          schenduleTimeUpacaraReq: data,
        }));
        console.log("upacara-finally:", data);
      },
      onError: (err) => {
        snackbar.error(err);
      },
    });
  };
  return {
    fetchTimeRegulerRequest,
    fetchDayRequest,
    fetchByIdJadwal,
    fetchJamUpacara,
  };
};
export default useSchendule;
