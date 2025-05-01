import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  signInDetailsFormatter,
  signinreqDefaultValues,
  signInValidations,
} from "../utils/form";
import { useLoginadministratorclassPageContext } from "../../context";
import { LoginClassAdministratorModel } from "@api/classcoordinator/model";

interface HookReturn {
  signInreqForm: UseFormReturn<LoginClassAdministratorModel>;
}

const useLoginAdministratorClassForm = (): HookReturn => {
  const { state } = useLoginadministratorclassPageContext();

  const signInreqForm = useForm<LoginClassAdministratorModel>({
    defaultValues: signinreqDefaultValues,
    values: signInDetailsFormatter(state.signinreqDetails),
    resolver: signInValidations as Resolver<LoginClassAdministratorModel>,
  });

  return {
    signInreqForm,
  };
};
export default useLoginAdministratorClassForm;
