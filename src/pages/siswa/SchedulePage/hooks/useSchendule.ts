import SchenduleService from "@api/jadwal";
import { snackbar } from "@utils/snackbar";
import { useSchedulePageContext } from "../context";
import EkstrakurikulerService from "@api/ekstrakurikuler";
import { LocalStorage } from "@utils/localStorage";
import { siswaSignInResponseRequestModel } from "@api/authentication/model";

interface HookReturn {
  fetchTimeRegulerRequest: (params: string) => void;
  fetchDayRequest: () => void;
  fetchByIdJadwal: (params: string) => void;
  fetchJamUpacara: (hari: string | number) => void;
  fetchEkstrakurikuler: (params: string) => void;
}

const useSchendule = (): HookReturn => {
  const schenduleService = new SchenduleService();
  const ekstraSevices = new EkstrakurikulerService();
  const { setState } = useSchedulePageContext();
  const { getItem } = LocalStorage();
  const userData: siswaSignInResponseRequestModel[] = getItem("userData") || [];

  const fetchTimeRegulerRequest = (params: string) => {
    setState((prev) => ({
      ...prev,
      schendulePageLoading: true,
    }));
    schenduleService.fetchRegulerTimeRequest(
      params,
      {
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
      },

      userData[0]?.access_token
    );
  };

  const fetchDayRequest = () => {
    setState((prev) => ({
      ...prev,
      schendulePageLoading: true,
    }));
    schenduleService.fetchDayRequest(
      {
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
      },
      userData[0]?.access_token
    );
  };

  const fetchByIdJadwal = async (params: string) => {
    setState((prev) => ({
      ...prev,
      SchedulePageLoading: true,
    }));
    schenduleService.fetchJadwalRequest(
      params,
      {
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
      },
      userData[0]?.access_token
    );
  };

  const fetchJamUpacara = async (hari: string | number) => {
    await schenduleService.fetchRegulerTimeUpacaraRequest(
      Number(hari),
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            schenduleTimeUpacaraReq: data,
          }));
        },
        onError: (err) => {
          snackbar.error(err);
        },
      },
      userData[0]?.access_token
    );
  };

  const fetchEkstrakurikuler = async (params: string) => {
    setState((prev) => ({
      ...prev,
      SchedulePageLoading: true,
    }));
    ekstraSevices.fetchEkstrakurikulerOptionsRequest(
      params,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            SchedulePageLoading: false,
            ekstraReq: data[0],
          }));
        },
        onError: (err) => {
          setState((prev) => ({
            ...prev,
            SchedulePageLoading: false,
          }));
          snackbar.error(err);
        },
      },
      userData[0]?.access_token
    );
  };
  return {
    fetchTimeRegulerRequest,
    fetchEkstrakurikuler,
    fetchDayRequest,
    fetchByIdJadwal,
    fetchJamUpacara,
  };
};
export default useSchendule;
