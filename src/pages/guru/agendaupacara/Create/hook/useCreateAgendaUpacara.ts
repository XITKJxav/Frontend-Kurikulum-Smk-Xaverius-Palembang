import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import { CreateAgendaUpacaraModel } from "@api/agendaupacara/model";
import AgendaUpacaraService from "@api/agendaupacara";
import { useAgendaUpacarapageContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LocalStorage } from "@utils/localStorage";

interface HookReturn {
  handleSubmitForm: () => void;
}

const useCreateAgendaUpacara = (): HookReturn => {
  const { trigger, handleSubmit } = useFormContext();
  const agendaUpacaraService = new AgendaUpacaraService();
  const { setState } = useAgendaUpacarapageContext();
  const navigate = useNavigate();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const handleSubmitForm = () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        agendaUpacaraLoading: true,
      }));

      const agendaUpacaraData: CreateAgendaUpacaraModel = {
        tanggal_upacara: values?.tanggal_upacara,
      };

      trigger();
      agendaUpacaraService.createAgendaUpacaraRequest(
        agendaUpacaraData,
        {
          onSuccess: () => {
            snackbar.success("Successfully Create data Agenda Upacara");
            setState((prev) => ({
              ...prev,
              agendaUpacaraLoading: false,
            }));
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
  return { handleSubmitForm };
};
export default useCreateAgendaUpacara;
