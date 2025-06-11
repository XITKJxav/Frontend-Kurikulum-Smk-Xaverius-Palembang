import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { useJadwalpageContext } from "../../context";

import { JadwalUpdateModel } from "@api/jadwal/model";
import {
  updateJadwalFormatter,
  updateJadwalreqDefaultValues,
  updateJadwalValidations,
} from "../utils/from";

interface HookReturn {
  updateTahunAjaranreqForm: UseFormReturn<JadwalUpdateModel>;
}
const useSchenduleUpdateReqForm = (): HookReturn => {
  const { state } = useJadwalpageContext();

  const updateTahunAjaranreqForm = useForm<JadwalUpdateModel>({
    defaultValues: updateJadwalreqDefaultValues,
    values: updateJadwalFormatter(state.jadwalUpdateReqForm),
    resolver: updateJadwalValidations as Resolver<JadwalUpdateModel>,
  });

  return {
    updateTahunAjaranreqForm,
  };
};
export default useSchenduleUpdateReqForm;
