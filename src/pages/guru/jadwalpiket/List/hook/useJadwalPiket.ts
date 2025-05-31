import SchenduleService from "@api/jadwal";
import { snackbar } from "@utils/snackbar";
import { useJadwalPiketpageContext } from "../../context";
import HealthOptionService from "@api/HealthOption";

interface HookReturn {
  fetchDayRequest: () => void;
  fetchTimeRequest: (params: string) => void;
  fetchJadwalRequest: (params: string) => void;
  fetchClassRoom: () => void;
}
const useJadwalPiket = (): HookReturn => {
  const schenduleService = new SchenduleService();
  const { setState } = useJadwalPiketpageContext();
  const healthOption = new HealthOptionService();

  const fetchDayRequest = () => {
    setState((prev) => ({
      ...prev,
      jadwalPiketLoading: true,
    }));
    schenduleService.fetchDayRequest({
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          jadwalPiketLoading: false,
          dayReq: data[0],
        }));
      },
      onError: (err) => {
        snackbar.error(err);
        setState((prev) => ({
          ...prev,
          jadwalPiketLoading: false,
        }));
      },
    });
  };

  const fetchTimeRequest = (params: string) => {
    setState((prev) => ({
      ...prev,
      schendulePageLoading: true,
    }));
    schenduleService.fetchRegulerTimeRequest(params, {
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          schendulePageLoading: false,
          timeReq: data,
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
  const fetchJadwalRequest = (params: string) => {
    setState((prev) => ({
      ...prev,
      SchedulePageLoading: true,
    }));
    schenduleService.fetchJadwalRequest(params, {
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          SchedulePageLoading: false,
          jadwalPiketReq: data[0],
        }));
        console.log("sumber", data);
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

  const fetchClassRoom = async () => {
    setState((prev) => ({
      ...prev,
      schendulePageLoading: true,
    }));

    await healthOption.fetchClassRoomRequestOptions({
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          classRoomRequest: data[0],
          schendulePageLoading: false,
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

  return {
    fetchDayRequest,
    fetchTimeRequest,
    fetchJadwalRequest,
    fetchClassRoom,
  };
};
export default useJadwalPiket;
