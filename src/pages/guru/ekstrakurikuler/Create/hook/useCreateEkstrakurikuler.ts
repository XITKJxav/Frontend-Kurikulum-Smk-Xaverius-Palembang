import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import { CreateEkstrakurikulerRequestModel } from "@api/ekstrakurikuler/model";
import { useEkstrakurikulerpageContext } from "../../context";
import EkstrakurikulerService from "@api/ekstrakurikuler";

interface HookReturn {
  handleSubmitForm: () => void;
}

const useCreateEkstrakurikuler = (): HookReturn => {
  const { trigger, handleSubmit } = useFormContext();
  const ekstrakurikulerService = new EkstrakurikulerService();
  const { setState } = useEkstrakurikulerpageContext();

  const handleSubmitForm = () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        agendaUpacaraLoading: true,
      }));

      const EkstrakurikulerData: CreateEkstrakurikulerRequestModel = {
        id_hari: values?.id_hari,
        jam_mulai_ekstra: values?.jam_mulai_ekstra,
        jam_mulai_selesai: values?.jam_mulai_selesai,
        deskripsi: values?.jam_mulai_selesai,
      };

      trigger();
      ekstrakurikulerService.createEkstrakurikulerRequest(EkstrakurikulerData, {
        onSuccess: () => {
          snackbar.success("Successfully Create data Ekstrakurikuler");
          setState((prev) => ({
            ...prev,
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
      });
    })();
  };
  return { handleSubmitForm };
};
export default useCreateEkstrakurikuler;
