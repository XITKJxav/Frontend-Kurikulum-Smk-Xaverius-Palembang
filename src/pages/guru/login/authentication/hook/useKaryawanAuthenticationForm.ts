import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { useKaryawanSignInContext } from "../../context";
import {
  karyawanSignInDetailsFormatter,
  karyawanSigninreqDefaultValues,
  karyawanSignInValidations,
} from "../utils/form";
import { SignInKaryawanRequestModel } from "@api/authentication/model";

interface HookReturn {
  signInKaryawanreqForm: UseFormReturn<SignInKaryawanRequestModel>;
}

const useKaryawanAuthenticationForm = (): HookReturn => {
  const { state } = useKaryawanSignInContext();

  const signInKaryawanreqForm = useForm<SignInKaryawanRequestModel>({
    defaultValues: karyawanSigninreqDefaultValues,
    values: karyawanSignInDetailsFormatter(state.signinkaryawanreqDetails),
    resolver: karyawanSignInValidations as Resolver<SignInKaryawanRequestModel>,
  });

  return {
    signInKaryawanreqForm,
  };
};

export default useKaryawanAuthenticationForm;
