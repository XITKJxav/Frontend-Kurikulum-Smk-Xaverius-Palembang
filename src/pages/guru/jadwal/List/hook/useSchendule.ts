import SchenduleService from "@api/jadwal";
import { snackbar } from "@utils/snackbar";
import { useJadwalpageContext } from "../../context";
import HealthOptionService from "@api/HealthOption";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";
import { useNavigate } from "react-router-dom";

interface HookReturn {
  fetchTimeRegulerRequest: (params: string) => void;
  fetchDayRequest: () => void;
  fetchClassRoom: () => void;
  fetchMataPelajaran: () => void;
  fetchKaryawan: () => void;
  fetchJadwal: () => void;
  fetchByIdJadwal: (params: string) => void;
}

const useSchendule = (): HookReturn => {
  const schenduleService = new SchenduleService();
  const { setState } = useJadwalpageContext();
  const healthOption = new HealthOptionService();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];
  const navigate = useNavigate();
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
      navigate,
      "karyawan",
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

  const fetchMataPelajaran = async () => {
    setState((prev) => ({
      ...prev,
      schendulePageLoading: true,
    }));
    healthOption.fetchMataPelajaran(
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            schendulePageLoading: false,
            mataPelajaranreq: data[0],
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

  const fetchKaryawan = async () => {
    setState((prev) => ({
      ...prev,
      schendulePageLoading: true,
    }));
    healthOption.fetchKaryawanRequestOptions(
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            schendulePageLoading: false,
            karyawanreq: data[0],
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

  const fetchJadwal = async () => {
    setState((prev) => ({
      ...prev,
      schendulePageLoading: true,
    }));
    schenduleService.fetchJadwalRequest(
      "",
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            schendulePageLoading: false,
            schendulereq: data[0],
          }));

          console.log(data);
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

  const fetchByIdJadwal = async (params: string) => {
    setState((prev) => ({
      ...prev,
      schendulePageLoading: true,
    }));
    schenduleService.fetchJadwalRequest(
      params,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            schendulePageLoading: false,
            schenduleIdreq: data[0],
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

  return {
    fetchClassRoom,
    fetchTimeRegulerRequest,
    fetchDayRequest,
    fetchMataPelajaran,
    fetchKaryawan,
    fetchJadwal,
    fetchByIdJadwal,
  };
};
export default useSchendule;
