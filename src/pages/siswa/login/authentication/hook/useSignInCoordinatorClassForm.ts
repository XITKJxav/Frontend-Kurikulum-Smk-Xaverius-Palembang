import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  signInDetailsFormatter,
  signinreqDefaultValues,
  signInValidations,
} from "../utils/form";
import { useLoginClassCoordinatorContext } from "../../context";
import { LoginClassCoordinatorModel } from "@api/classcoordinator/model";

interface HookReturn {
  signInreqForm: UseFormReturn<LoginClassCoordinatorModel>;
}

const useSignInClassCoordinatorForm = (): HookReturn => {
  const { state } = useLoginClassCoordinatorContext();

  const signInreqForm = useForm<LoginClassCoordinatorModel>({
    defaultValues: signinreqDefaultValues,
    values: signInDetailsFormatter(state.signinreqDetails),
    resolver: signInValidations as Resolver<LoginClassCoordinatorModel>,
  });

  return {
    signInreqForm,
  };
};
export default useSignInClassCoordinatorForm;
