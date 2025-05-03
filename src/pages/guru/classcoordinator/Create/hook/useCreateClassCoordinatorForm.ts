import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  classCoordinatorDetailsFormatter,
  classcoordinatorreqDefaultValues,
  classCoordinatorValidations,
} from "../utils/form";
import { useClassCoordinatorPageContext } from "../../context";
import { CreateClassCoordinatorModel } from "@api/classcoordinator/model";

interface HookReturn {
  classcoordinatorreqForm: UseFormReturn<CreateClassCoordinatorModel>;
}

const useCreateClassCoordinatorForm = (): HookReturn => {
  const { state } = useClassCoordinatorPageContext();

  const classcoordinatorreqForm = useForm<CreateClassCoordinatorModel>({
    defaultValues: classcoordinatorreqDefaultValues,
    values: classCoordinatorDetailsFormatter(
      state.classCoordinatorCreateReqForm
    ),
    resolver:
      classCoordinatorValidations as Resolver<CreateClassCoordinatorModel>,
  });

  return {
    classcoordinatorreqForm,
  };
};
export default useCreateClassCoordinatorForm;
