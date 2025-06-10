import SchenduleService from "@api/jadwal";
import { snackbar } from "@utils/snackbar";
import { useJadwalPiketpageContext } from "../../context";
import HealthOptionService from "@api/HealthOption";
import { LocalStorage } from "@utils/localStorage";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { useNavigate } from "react-router-dom";

interface HookReturn {
  fetchDayRequest: () => void;
  fetchTimeRequest: (params: string) => void;
  fetchJadwalRequest: (params: string) => void;
  fetchClassRoom: () => void;
}
const useJadwalPiket = (): HookReturn => {
  const schenduleService = new SchenduleService();
  const { setState } = useJadwalPiketpageContext();
  const navigate = useNavigate();
  const healthOption = new HealthOptionService();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const fetchDayRequest = () => {
    setState((prev) => ({
      ...prev,
      jadwalPiketLoading: true,
    }));
    schenduleService.fetchDayRequest(
      {
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
      },
      navigate,
      "karyawan",
      userData[0]?.access_token
    );
  };

  const fetchTimeRequest = (params: string) => {
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
      },
      navigate,
      "karyawan",
      userData[0]?.access_token
    );
  };
  const fetchJadwalRequest = (params: string) => {
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
      },
      navigate,
      "karyawan",
      userData[0]?.access_token
    );
  };

  const fetchClassRoom = async () => {
    setState((prev) => ({
      ...prev,
      schendulePageLoading: true,
    }));

    await healthOption.fetchClassRoomRequestOptions(
      {
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
      },
      "karyawan",
      navigate,
      userData[0]?.access_token
    );
  };

  return {
    fetchDayRequest,
    fetchTimeRequest,
    fetchJadwalRequest,
    fetchClassRoom,
  };
};
export default useJadwalPiket;
