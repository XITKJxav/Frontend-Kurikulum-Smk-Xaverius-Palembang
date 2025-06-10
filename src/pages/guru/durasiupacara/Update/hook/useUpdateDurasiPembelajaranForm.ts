import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  durasiPembelajaranDetailsFormatter,
  durasiPembelajaranreqDefaultValues,
  durasiPembelajaranValidations,
} from "../utils/form";
import { DurasiPembelajaranModel } from "@api/durasipembelajaran/model";
import { useDurasiPembelajaranpageContext } from "../../context";

interface HookReturn {
  durasipembelajaranUpdatereqForm: UseFormReturn<DurasiPembelajaranModel>;
}

const useUpdateDurasiPembelajaranForm = (): HookReturn => {
  const { state } = useDurasiPembelajaranpageContext();

  const durasipembelajaranUpdatereqForm = useForm<DurasiPembelajaranModel>({
    defaultValues: durasiPembelajaranreqDefaultValues,
    values: durasiPembelajaranDetailsFormatter(state.durasiUpdatereqDetails),
    resolver:
      durasiPembelajaranValidations as Resolver<DurasiPembelajaranModel>,
  });

  return {
    durasipembelajaranUpdatereqForm,
  };
};

export default useUpdateDurasiPembelajaranForm;
