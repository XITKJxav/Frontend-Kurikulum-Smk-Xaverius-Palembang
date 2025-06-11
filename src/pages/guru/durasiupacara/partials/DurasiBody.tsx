import { FormProvider } from "react-hook-form";
import useUpdateDurasiPembelajaranForm from "../Update/hook/useUpdateDurasiPembelajaranForm";
import FormDurasiPembelajaran from "./FormDurasiPembelajaran";

const DurasiBody = () => {
  const { durasipembelajaranUpdatereqForm } = useUpdateDurasiPembelajaranForm();
  return (
    <FormProvider {...durasipembelajaranUpdatereqForm}>
      <FormDurasiPembelajaran />
    </FormProvider>
  );
};
export default DurasiBody;
