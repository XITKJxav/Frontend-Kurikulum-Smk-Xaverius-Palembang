import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { useJadwalpageContext } from "../../context";

import { GenerateJadwalModel } from "@api/jadwal/model";
import {
  generateJadwalFormatter,
  generateJadwalreqDefaultValues,
  generateJadwalValidations,
} from "../utils/form";

interface HookReturn {
  generateJadwalreqForm: UseFormReturn<GenerateJadwalModel>;
}

const useGenerateJadwalUpdateReqForm = (): HookReturn => {
  const { state } = useJadwalpageContext();

  const generateJadwalreqForm = useForm<GenerateJadwalModel>({
    defaultValues: generateJadwalreqDefaultValues,
    values: generateJadwalFormatter(state.generateJadwalForm),
    resolver: generateJadwalValidations as Resolver<GenerateJadwalModel>,
  });

  return {
    generateJadwalreqForm,
  };
};
export default useGenerateJadwalUpdateReqForm;
