import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { useJadwalpageContext } from "../../context";

import { JadwalUpdateModel } from "@api/jadwal/model";
import {
  updateJadwalFormatter,
  updateJadwalreqDefaultValues,
  updateJadwalValidations,
} from "../utils/from";

interface HookReturn {
  updateJadwalreqForm: UseFormReturn<JadwalUpdateModel>;
}
const useSchenduleUpdateReqForm = (): HookReturn => {
  const { state } = useJadwalpageContext();

  const updateJadwalreqForm = useForm<JadwalUpdateModel>({
    defaultValues: updateJadwalreqDefaultValues,
    values: updateJadwalFormatter(state.jadwalUpdateReqForm),
    resolver: updateJadwalValidations as Resolver<JadwalUpdateModel>,
  });

  return {
    updateJadwalreqForm,
  };
};
export default useSchenduleUpdateReqForm;
