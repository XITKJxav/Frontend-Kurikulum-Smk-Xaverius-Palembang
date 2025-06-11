import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { useJadwalpageContext } from "../../context";
import {
  updatetahunajaranFormatter,
  updatetahunajaranreqDefaultValues,
  updatetahunajaranValidations,
} from "../utils/form";
import { UpdateTahunAjaranModel } from "@api/jadwal/model";

interface HookReturn {
  updateTahunAjaranreqForm: UseFormReturn<UpdateTahunAjaranModel>;
}
const useTahunAjaranUpdateReqForm = (): HookReturn => {
  const { state } = useJadwalpageContext();

  const updateTahunAjaranreqForm = useForm<UpdateTahunAjaranModel>({
    defaultValues: updatetahunajaranreqDefaultValues,
    values: updatetahunajaranFormatter(state.tahunAjaranUpdateReqForm),
    resolver: updatetahunajaranValidations as Resolver<UpdateTahunAjaranModel>,
  });

  return {
    updateTahunAjaranreqForm,
  };
};
export default useTahunAjaranUpdateReqForm;
