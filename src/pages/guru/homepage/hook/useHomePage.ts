import StatistikService from "@api/statistika";
import { snackbar } from "@utils/snackbar";
import { useNavigate } from "react-router-dom";
import { useHomepageContext } from "../context";
import AgendaUpacaraService from "@api/agendaupacara";
interface HookReturn {
  fetchDataStatistik: () => void;
  fetchAgendaUpacara: (params: string) => void;
}
const useHomePage = (): HookReturn => {
  const serviceStatis = new StatistikService();
  const serviceAgenda = new AgendaUpacaraService();

  const navigate = useNavigate();
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
      navigate
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
      navigate
    );
  };
  return { fetchDataStatistik, fetchAgendaUpacara };
};
export default useHomePage;
