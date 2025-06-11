import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import { useAgendaUpacarapageContext } from "../../context";
import useAgendaUpacara from "../../List/hook/useAgendaUpacara";
import AgendaUpacaraService from "@api/agendaupacara";
import { useNavigate } from "react-router-dom";
import { UpdateAgendaUpacaraModel } from "@api/agendaupacara/model";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";

interface HookReturn {
  fetchAgendaUpacaraById: (kd_agendaupacara: string) => void;
  handleSubmitForm: (kd_agendaupacara: string, onClose: () => void) => void;
}

const useUpdateAgendaUpacara = (): HookReturn => {
  const { setState, state } = useAgendaUpacarapageContext();
  const { filters } = state;
  const agendaUpacaraService = new AgendaUpacaraService();

  const { handleSubmit } = useFormContext();
  const { fetchAgendaUpacara } = useAgendaUpacara();
  const navigate = useNavigate();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const fetchAgendaUpacaraById = async (kd_agendaupacara: string) => {
    await agendaUpacaraService.fetchAgendaUpacaraByidRequest(
      kd_agendaupacara,
      {
        onSuccess: (data) => {
          setState((prev) => ({
            ...prev,
            agendaUpacaraByIdRequest: data,
          }));
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
        },
      },
      navigate,
      "karyawan",
      userData[0]?.access_token || ""
    );
  };

  const handleSubmitForm = (kd_agendaupacara: string, onClose: () => void) => {
    return handleSubmit((values) => {
      const data: UpdateAgendaUpacaraModel = {
        id_status_upacara: values?.id_status_upacara,
      };

      setState((prev) => ({
        ...prev,
        agendaUpacaraLoading: true,
      }));

      agendaUpacaraService.updateAgendaUpacaraRequest(
        kd_agendaupacara,
        data,
        {
          onSuccess: () => {
            snackbar.success("Successfully Updated Agenda Upacara");
            setState((prev) => ({
              ...prev,
              agendaUpacaraLoading: false,
            }));

            fetchAgendaUpacara(
              `?page=${filters?.page}&desc=${filters?.orderBy}`
            );
            onClose();
          },
          onError: (errMessage) => {
            snackbar.error(errMessage);
            setState((prev) => ({
              ...prev,
              agendaUpacaraLoading: false,
            }));
          },
        },
        navigate,
        "karyawan",
        userData[0]?.access_token || ""
      );
    })();
  };

  return {
    fetchAgendaUpacaraById,
    handleSubmitForm,
  };
};
export default useUpdateAgendaUpacara;
