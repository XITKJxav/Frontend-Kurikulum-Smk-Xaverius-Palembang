import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { useMataPelajaranpageContext } from "../../context";
import { UpdateMataPelajaranRequestModel } from "@api/matapelajaran/model";
import {
  mataPelajaranDetailsFormatter,
  mataPelajaranreqDefaultValues,
  mataPelajaranValidations,
} from "../utils/form";

interface HookReturn {
  mataPelajaranUpdatereqForm: UseFormReturn<UpdateMataPelajaranRequestModel>;
}

const useUpdateMataPelajaranForm = (): HookReturn => {
  const { state } = useMataPelajaranpageContext();

  const mataPelajaranUpdatereqForm = useForm<UpdateMataPelajaranRequestModel>({
    defaultValues: mataPelajaranreqDefaultValues,
    values: mataPelajaranDetailsFormatter(state.mataPelajaranUpdatereqDetails),
    resolver:
      mataPelajaranValidations as Resolver<UpdateMataPelajaranRequestModel>,
  });

  return {
    mataPelajaranUpdatereqForm,
  };
};

export default useUpdateMataPelajaranForm;
