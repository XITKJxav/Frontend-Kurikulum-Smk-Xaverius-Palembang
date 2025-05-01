import { useFormContext } from "react-hook-form";
import { useLoginadministratorclassPageContext } from "../../context";
import { LoginClassAdministratorModel } from "@api/classcoordinator/model";
import ClassAdministratorService from "@api/classcoordinator";
import { snackbar } from "@utils/snackbar";
import { LocalStorage } from "@utils/localStorage";

interface HookReturn {
  handleSubmitForm: () => void;
}

const useLoginAdministratorClass = (): HookReturn => {
  const { setState } = useLoginadministratorclassPageContext();
  const { handleSubmit, trigger } = useFormContext();
  const userService = new ClassAdministratorService();
  const { setItem } = LocalStorage();

  const handleSubmitForm = async () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        signInLoading: true,
      }));

      const userData: LoginClassAdministratorModel = {
        email: values.email,
        password: values.password,
      };

      trigger();
      userService.signInClassAdministorRequest(userData, {
        onSuccess: (data) => {
          snackbar.success("Successfully Sign In to sistem");
          setItem("userData", data);
          setState((prev) => ({
            ...prev,
            signInLoading: false,
          }));
        },
        onError: (errMessage) => {
          snackbar.error(errMessage);
          setState((prev) => ({
            ...prev,
            signInLoading: true,
          }));
        },
      });
    })();
  };

  return {
    handleSubmitForm,
  };
};

export default useLoginAdministratorClass;
