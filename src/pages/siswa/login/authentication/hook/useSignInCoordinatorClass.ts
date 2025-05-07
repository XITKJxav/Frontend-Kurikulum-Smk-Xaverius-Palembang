import { useFormContext } from "react-hook-form";
import { useLoginadministratorclassPageContext } from "../../context";
import { snackbar } from "@utils/snackbar";
import { LocalStorage } from "@utils/localStorage";
import ClassCoordinatorService from "@api/classcoordinator";
import { LoginClassCoordinatorModel } from "@api/classcoordinator/model";

interface HookReturn {
  handleSubmitForm: () => void;
}

const useSignInClassCoordinator = (): HookReturn => {
  const { setState } = useLoginadministratorclassPageContext();
  const { handleSubmit, trigger } = useFormContext();
  const classCoordinatorService = new ClassCoordinatorService();
  const { setItem } = LocalStorage();

  const handleSubmitForm = async () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        signInLoading: true,
      }));

      const userData: LoginClassCoordinatorModel = {
        email: values.email,
        password: values.password,
      };

      trigger();
      classCoordinatorService.signInClassCoordinatorRequest(userData, {
        onSuccess: (data) => {
          snackbar.success("Welcome Back Class Coordinator");
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

export default useSignInClassCoordinator;
