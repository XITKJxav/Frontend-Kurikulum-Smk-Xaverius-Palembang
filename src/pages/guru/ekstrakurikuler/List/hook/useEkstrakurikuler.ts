import { snackbar } from "@utils/snackbar";
import { useEkstrakurikulerpageContext } from "../../context";
import EkstrakurikulerService from "@api/ekstrakurikuler";
import HealthOptionService from "@api/HealthOption";
import SchenduleService from "@api/jadwal";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";

interface HookReturn {
  fetchEkstrakurikulerRequest: (params: string) => void;
  deleteEkstrakurikulerRequest: (id: number) => void;
  fetchDayRequest: () => void;
  fetchClassRoom: () => void;
}

const useEkstrakurikuler = (): HookReturn => {
  const ekstrakurikulerService = new EkstrakurikulerService();
  const option = new HealthOptionService();
  const dayService = new SchenduleService();
  const { setState } = useEkstrakurikulerpageContext();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const fetchClassRoom = async () => {
    setState((prev) => ({
      ...prev,
      ekstrakurikulerLoading: true,
    }));
    option.fetchClassRoomRequestOptions(
      {
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
      },
      userData[0]?.access_token
    );
  };

  const fetchDayRequest = async () => {
    setState((prev) => ({
      ...prev,
      ekstrakurikulerLoading: true,
    }));

    dayService.fetchDayRequest(
      {
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
      },
      userData[0]?.access_token
    );
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
          console.log("adat=", data[0]);
        },
        onError: (errMessage) => {
          setState((prev) => ({
            ...prev,
            ekstrakurikulerLoading: false,
          }));
          snackbar.error(errMessage);
        },
      },
      userData[0]?.access_token
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
      userData[0]?.access_token || ""
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
