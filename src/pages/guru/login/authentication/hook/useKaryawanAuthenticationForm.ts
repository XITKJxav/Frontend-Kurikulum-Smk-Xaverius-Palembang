import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { useKaryawanSignInContext } from "../../context";
import {
  karyawanSignInDetailsFormatter,
  karyawanSigninreqDefaultValues,
  karyawanSignInValidations,
} from "../utils/form";
import { SignInRequestModel } from "@api/authentication/model";

interface HookReturn {
  signInKaryawanreqForm: UseFormReturn<SignInRequestModel>;
}

const useKaryawanAuthenticationForm = (): HookReturn => {
  const { state } = useKaryawanSignInContext();

  const signInKaryawanreqForm = useForm<SignInRequestModel>({
    defaultValues: karyawanSigninreqDefaultValues,
    values: karyawanSignInDetailsFormatter(state.signinkaryawanreqDetails),
    resolver: karyawanSignInValidations as Resolver<SignInRequestModel>,
  });

  return {
    signInKaryawanreqForm,
  };
};

export default useKaryawanAuthenticationForm;
