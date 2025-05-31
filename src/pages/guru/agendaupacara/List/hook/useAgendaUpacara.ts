import { snackbar } from "@utils/snackbar";
scrollX;
import { useNavigate } from "react-router-dom";
import AgendaUpacaraService from "@api/agendaupacara";
import { useAgendaUpacarapageContext } from "../../context";
import HealthOptionService from "@api/HealthOption";

interface HookReturn {
  fetchAgendaUpacara: (params: string) => void;
  fetchStatusAgendaUpacara: () => void;
}

const useAgendaUpacara = (): HookReturn => {
  const navigate = useNavigate();
  const agendaUpacaraService = new AgendaUpacaraService();
  const optionService = new HealthOptionService();

  const { setState } = useAgendaUpacarapageContext();

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
      navigate
    );
  };

  const fetchStatusAgendaUpacara = async () => {
    setState((prev) => ({
      ...prev,
      AgendaUpacaraLoading: true,
    }));
    optionService.fetchStatusAgendaUpacaraRequestOptions({
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
    });
  };

  return {
    fetchAgendaUpacara,
    fetchStatusAgendaUpacara,
  };
};
export default useAgendaUpacara;
