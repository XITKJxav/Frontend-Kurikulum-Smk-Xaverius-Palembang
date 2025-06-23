import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { useJadwalpageContext } from "../../context";

import { QuickEntrySchenduleModel } from "@api/jadwal/model";
import {
  quickEntrySchendulereqDefaultValues,
  quickEntrySchenduleValidations,
  quickEntrySchenduleFormatter,
} from "../utils/form";

interface HookReturn {
  quickEntrySchendulereqForm: UseFormReturn<QuickEntrySchenduleModel>;
}

const useQuickEntrySchenduleForm = (): HookReturn => {
  const { state } = useJadwalpageContext();

  const quickEntrySchendulereqForm = useForm<QuickEntrySchenduleModel>({
    defaultValues: quickEntrySchendulereqDefaultValues,
    values: quickEntrySchenduleFormatter(state.generateJadwalForm),
    resolver:
      quickEntrySchenduleValidations as Resolver<QuickEntrySchenduleModel>,
  });

  return {
    quickEntrySchendulereqForm,
  };
};
export default useQuickEntrySchenduleForm;
