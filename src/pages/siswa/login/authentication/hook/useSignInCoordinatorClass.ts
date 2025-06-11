import { useFormContext } from "react-hook-form";
import { useLoginClassCoordinatorContext } from "../../context";
import { snackbar } from "@utils/snackbar";
import { LocalStorage } from "@utils/localStorage";
import { useNavigate } from "react-router-dom";
import AuthtenticationService from "@api/authentication";
import { SignInSiswaRequestModel } from "@api/authentication/model";

interface HookReturn {
  handleSubmitForm: () => void;
}

const useSignInClassCoordinator = (): HookReturn => {
  const { setState } = useLoginClassCoordinatorContext();
  const { handleSubmit, trigger } = useFormContext();
  const classCoordinatorService = new AuthtenticationService();
  const { setItem } = LocalStorage();
  const navigate = useNavigate();

  const handleSubmitForm = async () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        signInLoading: true,
      }));

      const userData: SignInSiswaRequestModel = {
        nisn: values.nisn,
        password: values.password,
      };

      trigger();
      await classCoordinatorService.signInSiswaRequest(userData, {
        onSuccess: (data) => {
          snackbar.info("Welcome Back Class Coordinator");
          setItem("userData", data);
          navigate(0);
          setState((prev) => ({
            ...prev,
            signInLoading: false,
          }));
        },

        onError: () => {
          snackbar.error("Invalid Username and Password");
          setState((prev) => ({
            ...prev,
            signInLoading: false,
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
