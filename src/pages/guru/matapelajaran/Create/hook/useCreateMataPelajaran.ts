import { snackbar } from "@utils/snackbar";
import { useFormContext } from "react-hook-form";
import { useMataPelajaranpageContext } from "../../context";
import { CreateMataPelajaranRequestModel } from "@api/matapelajaran/model";
import MataPelajaranService from "@api/matapelajaran";

interface HookReturn {
  handleSubmitForm: () => void;
}

const useCreateMataPelajaran = (): HookReturn => {
  const { trigger, handleSubmit } = useFormContext();
  const mataPelajaranService = new MataPelajaranService();
  const { setState } = useMataPelajaranpageContext();

  const handleSubmitForm = () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        mataPelajaranLoading: true,
      }));

      const mataPelajaraData: CreateMataPelajaranRequestModel = {
        nama: values?.nama,
      };

      trigger();
      mataPelajaranService.createMataPelajaranRequest(mataPelajaraData, {
        onSuccess: () => {
          snackbar.success("Successfully Create data Mata Pelajaran");
          setState((prev) => ({
            ...prev,
            mataPelajaranLoading: false,
          }));
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
          setState((prev) => ({
            ...prev,
            mataPelajaranLoading: false,
          }));
        },
      });
    })();
  };
  return { handleSubmitForm };
};
export default useCreateMataPelajaran;
