import StatistikService from "@api/statistika";
import { snackbar } from "@utils/snackbar";
import { useHomepageContext } from "../context";
import AgendaUpacaraService from "@api/agendaupacara";
import { LocalStorage } from "@utils/localStorage";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
interface HookReturn {
  fetchDataStatistik: () => void;
  fetchAgendaUpacara: (params: string) => void;
}
const useHomePage = (): HookReturn => {
  const serviceStatis = new StatistikService();
  const serviceAgenda = new AgendaUpacaraService();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];
  const { setState } = useHomepageContext();

  const fetchDataStatistik = () => {
    setState((prev) => ({
      ...prev,
      homeLoading: true,
    }));
    serviceStatis.fetchStatistik(
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            homeLoading: false,
            statisticReq: data,
          }));
        },
        onError: (err) => {
          snackbar.error(err);
          setState((prev) => ({
            ...prev,
            homeLoading: false,
          }));
        },
      },
      userData[0]?.access_token || ""
    );
  };
  const fetchAgendaUpacara = (params: string) => {
    serviceAgenda.fetchAgendaUpacaraOptionRequest(
      params,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            homeLoading: false,
            agendaUpacaraReq: data[0],
          }));
        },
        onError: (err) => {
          snackbar.error(err);
        },
      },
      userData[0]?.access_token || ""
    );
  };
  return { fetchDataStatistik, fetchAgendaUpacara };
};
export default useHomePage;
