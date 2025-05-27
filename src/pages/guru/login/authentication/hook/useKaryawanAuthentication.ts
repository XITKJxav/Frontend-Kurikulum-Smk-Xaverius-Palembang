import { useFormContext } from "react-hook-form";
import { useKaryawanSignInContext } from "../../context";
import { SignInRequestModel } from "@api/authentication/model";
import AuthtenticationService from "@api/authentication";
import { snackbar } from "@utils/snackbar";
import { LocalStorage } from "@utils/localStorage";
import { useNavigate } from "react-router-dom";

const useKaryawanAuthentication = () => {
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

      const userData: SignInRequestModel = {
        email: values.email,
        password: values.password,
      };

      trigger();
      await karyawanService.signinKaryawanRequest(userData, {
        onSuccess: (data) => {
          setItem("userData", data);
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
  return handleSigninForm;
};
export default useKaryawanAuthentication;
