import { snackbar } from "@utils/snackbar";
import AgendaUpacaraService from "@api/agendaupacara";
import { useAgendaUpacarapageContext } from "../../context";
import HealthOptionService from "@api/HealthOption";
import { LocalStorage } from "@utils/localStorage";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";

interface HookReturn {
  fetchAgendaUpacara: (params: string) => void;
  fetchStatusAgendaUpacara: () => void;
}

const useAgendaUpacara = (): HookReturn => {
  const agendaUpacaraService = new AgendaUpacaraService();
  const optionService = new HealthOptionService();
  const { setState } = useAgendaUpacarapageContext();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const fetchAgendaUpacara = async (params: string) => {
    setState((prev) => ({
      ...prev,
      agendaUpacaraLoading: true,
    }));

    await agendaUpacaraService.fetchAgendaUpacaraRequest(
      params,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            agendaUpacaraRequest: data[0],
            agendaUpacaraLoading: false,
          }));
        },
        onError: (errMessage) => {
          setState((prev) => ({
            ...prev,
            agendaUpacaraLoading: false,
          }));
          snackbar.error(errMessage);
        },
      },
      userData[0]?.access_token || ""
    );
  };

  const fetchStatusAgendaUpacara = async () => {
    setState((prev) => ({
      ...prev,
      AgendaUpacaraLoading: true,
    }));
    optionService.fetchStatusAgendaUpacaraRequestOptions(
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            statusAgendaUpacaraRequest: data[0],
            AgendaUpacaraLoading: false,
          }));
        },
        onError: (err) => {
          setState((prev) => ({
            ...prev,
            AgendaUpacaraLoading: false,
          }));
          snackbar.error(err);
        },
      },
      userData[0]?.access_token || ""
    );
  };

  return {
    fetchAgendaUpacara,
    fetchStatusAgendaUpacara,
  };
};
export default useAgendaUpacara;
