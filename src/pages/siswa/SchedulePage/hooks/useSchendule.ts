import SchenduleService from "@api/jadwal";
import { snackbar } from "@utils/snackbar";
import { useSchedulePageContext } from "../context";
import EkstrakurikulerService from "@api/ekstrakurikuler";
import { useNavigate } from "react-router-dom";

interface HookReturn {
  fetchTimeRegulerRequest: (params: string) => void;
  fetchDayRequest: () => void;
  fetchByIdJadwal: (params: string) => void;
  fetchJamUpacara: (hari: string | number) => void;
}

const useSchendule = (): HookReturn => {
  const schenduleService = new SchenduleService();
  const ekstraSevices = new EkstrakurikulerService();
  const { setState } = useSchedulePageContext();
  const navigate = useNavigate();
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
      },
      onError: (err) => {
        snackbar.error(err);
      },
    });
  };

  const fetchEkstrakurikuler = async (params: string) => {
    setState((prev) => ({
      ...prev,
      SchedulePageLoading: true,
    }));
    ekstraSevices.fetchEkstrakurikulerRequest(
      params,
      {
        onSuccess: () => {},
        onError: () => {},
      },
      navigate
    );
  };
  return {
    fetchTimeRegulerRequest,
    fetchDayRequest,
    fetchByIdJadwal,
    fetchJamUpacara,
  };
};
export default useSchendule;
