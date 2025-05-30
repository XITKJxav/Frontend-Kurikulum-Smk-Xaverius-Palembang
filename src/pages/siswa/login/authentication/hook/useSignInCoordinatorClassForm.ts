import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  signInDetailsFormatter,
  signinreqDefaultValues,
  signInValidations,
} from "../utils/form";
import { useLoginClassCoordinatorContext } from "../../context";
import { SignInRequestModel } from "@api/authentication/model";

interface HookReturn {
  signInreqForm: UseFormReturn<SignInRequestModel>;
}

const useSignInClassCoordinatorForm = (): HookReturn => {
  const { state } = useLoginClassCoordinatorContext();

  const signInreqForm = useForm<SignInRequestModel>({
    defaultValues: signinreqDefaultValues,
    values: signInDetailsFormatter(state.signinreqDetails),
    resolver: signInValidations as Resolver<SignInRequestModel>,
  });

  return {
    signInreqForm,
  };
};
export default useSignInClassCoordinatorForm;
