import { FormProvider, useFormContext } from "react-hook-form";
import { LoginadministratorclasspageProvider } from "./context";
import LoginBody from "./partials/LoginBody";
import useLoginAdministratorClassForm from "./loginUser/hook/useSignInCoordinatorClassForm";

const LoginAdministratorClassPage = () => {
  return (
    <LoginadministratorclasspageProvider>
      <LoginBody />
    </LoginadministratorclasspageProvider>
  );
};
export default LoginAdministratorClassPage;
