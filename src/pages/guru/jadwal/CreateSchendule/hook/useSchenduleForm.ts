import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { useJadwalpageContext } from "../../context";

import { CreateJadwalModel } from "@api/jadwal/model";
import {
  createJadwalFormatter,
  createJadwalreqDefaultValues,
  createJadwalValidations,
} from "../utils/form";

interface HookReturn {
  createJadwalreqForm: UseFormReturn<CreateJadwalModel>;
}
const useSchenduleForm = (): HookReturn => {
  const { state } = useJadwalpageContext();

  const createJadwalreqForm = useForm<CreateJadwalModel>({
    defaultValues: createJadwalreqDefaultValues,
    values: createJadwalFormatter(state.jadwalCreateReqForm),
    resolver: createJadwalValidations as Resolver<CreateJadwalModel>,
  });

  return {
    createJadwalreqForm,
  };
};
export default useSchenduleForm;
