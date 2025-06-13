import { useFormContext } from "react-hook-form";
import { useKaryawanSignInContext } from "../../context";
import AuthtenticationService from "@api/authentication";
import { snackbar } from "@utils/snackbar";
import { LocalStorage } from "@utils/localStorage";
import { useNavigate } from "react-router-dom";
import { SignInKaryawanRequestModel } from "@api/authentication/model";

interface HookReturn {
  handleSigninForm: () => void;
}

const useKaryawanAuthentication = (): HookReturn => {
  const { setState } = useKaryawanSignInContext();
  const { handleSubmit, trigger } = useFormContext();
  const { setItem } = LocalStorage();
  const navigate = useNavigate();

  const karyawanService = new AuthtenticationService();
  const handleSigninForm = () => {
    return handleSubmit(async (values) => {
      setState((prev) => ({
        ...prev,
        signInLoading: true,
      }));

      const userData: SignInKaryawanRequestModel = {
        niy: values?.niy,
        password: values?.password,
      };

      trigger();
      await karyawanService.signinKaryawanRequest(userData, {
        onSuccess: (data) => {
          setItem("karyawanData", data);
          setItem("access_token", data[0]?.access_token);
          setItem("refresh_token", data[0]?.refresh_token);
          navigate("/akademik");
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
  return { handleSigninForm };
};
export default useKaryawanAuthentication;
