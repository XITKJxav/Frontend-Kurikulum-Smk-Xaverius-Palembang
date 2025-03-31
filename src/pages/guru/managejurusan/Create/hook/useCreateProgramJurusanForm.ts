import { usejurusanpageContext } from "../../context";
import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  JurusannDetailsFormatter,
  jurusanreqDefaultValues,
  jurusanValidations,
} from "../utils/form";
import { JurusanCreateModel } from "@api/jurusan/model";

interface HookReturn {
  jurusanreqForm: UseFormReturn<JurusanCreateModel>;
}

const useCreateJurusanForm = (): HookReturn => {
  const { state } = usejurusanpageContext();

  const jurusanreqForm = useForm<JurusanCreateModel>({
    defaultValues: jurusanreqDefaultValues,
    values: JurusannDetailsFormatter(state.jurusanreqDetails),
    resolver: jurusanValidations as Resolver<JurusanCreateModel>,
  });

  return {
    jurusanreqForm,
  };
};

export default useCreateJurusanForm;
