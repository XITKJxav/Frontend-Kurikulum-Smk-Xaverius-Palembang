import JurusanService from "@api/jurusan";
import { snackbar } from "@utils/snackbar";
import { usejurusanpageContext } from "../../context";
import { useFormContext } from "react-hook-form";
import { JurusanUpdateModel } from "@api/jurusan/model";
import useManageJurusan from "../../List/hook/useManageJurusan";

interface HookReturn {
  fetchJurusanById: (kdJurusan: string) => void;
  handleSubmitForm: (kdJurusan: string, onClose: () => void) => void;
}

const useUpdateProgramJurusan = (): HookReturn => {
  const { setState, state } = usejurusanpageContext();
  const { filters } = state;
  const jurusanService = new JurusanService();
  const { handleSubmit } = useFormContext();
  const { fetchJurusan } = useManageJurusan();

  const fetchJurusanById = async (kdJurusan: string) => {
    await jurusanService.fetchProgramJurusanById(kdJurusan, {
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
    return handleSubmit((values) => {
      const data: JurusanUpdateModel = {
        status: values.status,
      };

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

          fetchJurusan(`?page=${filters?.page}&desc=${filters?.orderBy}`);
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
