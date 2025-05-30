import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  KaryawanDetailsFormatter,
  karyawanreqDefaultValues,
  karyawanValidations,
} from "../utils/form";
import { CreateKaryawanRequestModel } from "@api/karyawan/model";
import { usekaryawanpageContext } from "../../context";

interface HookReturn {
  karyawanreqForm: UseFormReturn<CreateKaryawanRequestModel>;
}

const useCreateKaryawanForm = (): HookReturn => {
  const { state } = usekaryawanpageContext();

  const karyawanreqForm = useForm<CreateKaryawanRequestModel>({
    defaultValues: karyawanreqDefaultValues,
    values: KaryawanDetailsFormatter(state.karyawanreqDetails),
    resolver: karyawanValidations as Resolver<CreateKaryawanRequestModel>,
  });

  return {
    karyawanreqForm,
  };
};

export default useCreateKaryawanForm;
