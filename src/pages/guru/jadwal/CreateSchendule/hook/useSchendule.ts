import { useFormContext } from "react-hook-form";
import { snackbar } from "@utils/snackbar";
import { useJadwalpageContext } from "../../context";
import SchenduleService from "@api/jadwal";
import { CreateJadwalModel } from "@api/jadwal/model";
import { useNavigate } from "react-router-dom";
import { LocalStorage } from "@utils/localStorage";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";

interface HookReturn {
  handleSubmitForm: () => void;
}

const useCreateSchendule = (): HookReturn => {
  const { setState } = useJadwalpageContext();
  const { handleSubmit, trigger } = useFormContext();
  const schenduleService = new SchenduleService();
  const navigate = useNavigate();
  const { getItem } = LocalStorage();
  const userData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

  const handleSubmitForm = async () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        schendulePageLoading: true,
      }));

      const createJadwalData: CreateJadwalModel = {
        id_ruangan_kelas: values?.id_ruangan_kelas,
      };

      trigger();
      schenduleService.createJadwalRequest(
        createJadwalData,
        {
          onSuccess: () => {
            snackbar.success("Jadwal berhasil disimpan");
            navigate(0);
            setState((prev) => ({
              ...prev,
              schendulePageLoading: false,
            }));
          },
          onError: (errMessage) => {
            snackbar.error(errMessage);
            setState((prev) => ({
              ...prev,
              schendulePageLoading: false,
            }));
          },
        },
        userData[0]?.access_token
      );
    })();
  };

  return {
    handleSubmitForm,
  };
};

export default useCreateSchendule;
