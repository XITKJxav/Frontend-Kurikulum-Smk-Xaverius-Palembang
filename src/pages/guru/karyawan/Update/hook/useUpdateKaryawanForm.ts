import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { UpdateKaryawanRequestModel } from "@api/karyawan/model";
import {
  karyawanDetailsFormatter,
  karyawanreqDefaultValues,
  karyawanValidations,
} from "../utils/form";
import { usekaryawanpageContext } from "../../context";

interface HookReturn {
  KaryawanUpdatereqForm: UseFormReturn<UpdateKaryawanRequestModel>;
}

const useUpdateKaryawanForm = (): HookReturn => {
  const { state } = usekaryawanpageContext();

  const KaryawanUpdatereqForm = useForm<UpdateKaryawanRequestModel>({
    defaultValues: karyawanreqDefaultValues,
    values: karyawanDetailsFormatter(state.karyawanUpdatereqDetails),
    resolver: karyawanValidations as Resolver<UpdateKaryawanRequestModel>,
  });

  return {
    KaryawanUpdatereqForm,
  };
};

export default useUpdateKaryawanForm;
