import JurusanService from "@api/jurusan";
import { snackbar } from "@utils/snackbar";
import { usejurusanpageContext } from "../../context";
import { useFormContext } from "react-hook-form";
import { JurusanUpdateModel } from "@api/jurusan/model";
import { useDashboardpageContext } from "@pages/guru/dashboard/context";
import { Redirect } from "@utils/redirect";
import useManageJurusan from "../../hook/useManageJurusan";

interface HookReturn {
  fetchJurusanById: (kdJurusan: string) => void;
  handleSubmitForm: (kdJurusan: string, onClose: () => void) => void;
}

const useUpdateProgramJurusan = (): HookReturn => {
  const { setState } = usejurusanpageContext();
  const jurusanService = new JurusanService();
  const { trigger, handleSubmit } = useFormContext();
  const { handleRedirect } = Redirect();
  const { fetchJurusan } = useManageJurusan();
  const fetchJurusanById = (kdJurusan: string) => {
    jurusanService.fetchProgramJurusanById(kdJurusan, {
      onSuccess: (data) => {
        setState((prev) => ({
          ...prev,
          jurusanByIdRequest: [data],
        }));
      },
      onError: (errMessage) => {
        snackbar.error(errMessage);
      },
    });
  };

  const handleSubmitForm = (kdJurusan: string, onClose: () => void) => {
    console.log("1");
    return handleSubmit((values) => {
      const data: JurusanUpdateModel = {
        status: values.status,
      };
      console.log("2");

      setState((prev) => ({
        ...prev,
        manageJurusanLoading: true,
      }));

      jurusanService.updateStatusJurusanRequest(kdJurusan, data, {
        onSuccess: () => {
          snackbar.success("Successfully Updated Status Program Jurusan");
          setState((prev) => ({
            ...prev,
            manageJurusanLoading: false,
          }));

          fetchJurusan("?page=1&desc=false");
          onClose();
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
          setState((prev) => ({
            ...prev,
            manageJurusanLoading: false,
          }));
        },
      });
    })();
  };

  return {
    fetchJurusanById,
    handleSubmitForm,
  };
};
export default useUpdateProgramJurusan;
