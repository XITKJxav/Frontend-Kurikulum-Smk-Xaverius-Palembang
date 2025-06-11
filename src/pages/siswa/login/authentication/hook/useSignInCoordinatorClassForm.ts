import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  signInDetailsFormatter,
  signinreqDefaultValues,
  signInValidations,
} from "../utils/form";
import { useLoginClassCoordinatorContext } from "../../context";
import { SignInSiswaRequestModel } from "@api/authentication/model";

interface HookReturn {
  signInreqForm: UseFormReturn<SignInSiswaRequestModel>;
}

const useSignInClassCoordinatorForm = (): HookReturn => {
  const { state } = useLoginClassCoordinatorContext();

  const signInreqForm = useForm<SignInSiswaRequestModel>({
    defaultValues: signinreqDefaultValues,
    values: signInDetailsFormatter(state.signinreqDetails),
    resolver: signInValidations as Resolver<SignInSiswaRequestModel>,
  });

  return {
    signInreqForm,
  };
};
export default useSignInClassCoordinatorForm;
