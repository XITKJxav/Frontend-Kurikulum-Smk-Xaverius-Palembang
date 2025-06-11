import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  classcoordinatorreqDefaultValues,
  classCoordinatorValidations,
  classCoordinatorDetailsFormatter,
} from "../utils/form";
import { useClassCoordinatorPageContext } from "../../context";
import { UpdateClassCoordinatorModel } from "@api/classcoordinator/model";

interface HookReturn {
  classCoordinatorUpdatereqForm: UseFormReturn<UpdateClassCoordinatorModel>;
}

const useUpdateClassCoordinatorForm = (): HookReturn => {
  const { state } = useClassCoordinatorPageContext();

  const classCoordinatorUpdatereqForm = useForm<UpdateClassCoordinatorModel>({
    defaultValues: classcoordinatorreqDefaultValues,
    values: classCoordinatorDetailsFormatter(
      state.classCoordinatorUpdateReqForm
    ),
    resolver:
      classCoordinatorValidations as Resolver<UpdateClassCoordinatorModel>,
  });

  return {
    classCoordinatorUpdatereqForm,
  };
};

export default useUpdateClassCoordinatorForm;
