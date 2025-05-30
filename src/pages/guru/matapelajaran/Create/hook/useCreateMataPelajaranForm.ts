import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { useMataPelajaranpageContext } from "../../context";
import {
  MataPelajaranDetailsFormatter,
  mataPelajaranreqDefaultValues,
  MataPelajaranValidations,
} from "../utils/form";
import { CreateMataPelajaranRequestModel } from "@api/matapelajaran/model";

interface HookReturn {
  mataPelajaranreqForm: UseFormReturn<CreateMataPelajaranRequestModel>;
}

const useCreateMataPelajaranForm = (): HookReturn => {
  const { state } = useMataPelajaranpageContext();

  const mataPelajaranreqForm = useForm<CreateMataPelajaranRequestModel>({
    defaultValues: mataPelajaranreqDefaultValues,
    values: MataPelajaranDetailsFormatter(state.mataPelajaranreqDetails),
    resolver:
      MataPelajaranValidations as Resolver<CreateMataPelajaranRequestModel>,
  });

  return {
    mataPelajaranreqForm,
  };
};

export default useCreateMataPelajaranForm;
