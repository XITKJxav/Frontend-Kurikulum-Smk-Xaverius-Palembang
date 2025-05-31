import SchenduleService from "@api/jadwal";
import { snackbar } from "@utils/snackbar";
import { useJadwalPembelajaranpageContext } from "../../context";
import HealthOptionService from "@api/HealthOption";

interface HookReturn {
  fetchDayRequest: () => void;
  fetchTimeRequest: (params: string) => void;
  fetchJadwalRequest: (params: string) => void;
  fetchClassRoom: () => void;
}
const useJadwalPembelajaran = (): HookReturn => {
  const schenduleService = new SchenduleService();
  const { setState } = useJadwalPembelajaranpageContext();
  const healthOption = new HealthOptionService();

  const fetchDayRequest = () => {
    setState((prev) => ({
      ...prev,
      jadwalPembelajaranLoading: true,
    }));
    schenduleService.fetchDayRequest({
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          jadwalPembelajaranLoading: false,
          dayReq: data[0],
        }));
      },
      onError: (err) => {
        snackbar.error(err);
        setState((prev) => ({
          ...prev,
          jadwalPembelajaranLoading: false,
        }));
      },
    });
  };

  const fetchTimeRequest = (params: string) => {
    setState((prev) => ({
      ...prev,
      jadwalPembelajaranLoading: true,
    }));
    schenduleService.fetchRegulerTimeRequest(params, {
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          jadwalPembelajaranLoading: false,
          timeReq: data,
        }));
      },
      onError: (err) => {
        snackbar.error(err);
        setState((prev) => ({
          ...prev,
          jadwalPembelajaranLoading: false,
        }));
      },
    });
  };

  const fetchJadwalRequest = (params: string) => {
    setState((prev) => ({
      ...prev,
      jadwalPembelajaranLoading: true,
    }));
    schenduleService.fetchJadwalRequest(params, {
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          jadwalPembelajaranLoading: false,
          jadwalPembelajaranReq: data[0],
        }));
      },
      onError: (err) => {
        snackbar.error(err);
        setState((prev) => ({
          ...prev,
          jadwalPembelajaranLoading: false,
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
export default useJadwalPembelajaran;
