import { usejurusanpageContext } from "../../context";
import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  JurusannDetailsFormatter,
  jurusanreqDefaultValues,
  jurusanValidations,
} from "../utils/form";
import { JurusanUpdateModel } from "@api/jurusan/model";

interface HookReturn {
  jurusanUpdatereqForm: UseFormReturn<JurusanUpdateModel>;
}

const useUpdateClassRoomForm = (): HookReturn => {
  const { state } = usejurusanpageContext();

  const jurusanUpdatereqForm = useForm<JurusanUpdateModel>({
    defaultValues: jurusanreqDefaultValues,
    values: JurusannDetailsFormatter(state.jurusanUpdatereqDetails),
    resolver: jurusanValidations as Resolver<JurusanUpdateModel>,
  });

  return {
    jurusanUpdatereqForm,
  };
};

export default useUpdateClassRoomForm;
