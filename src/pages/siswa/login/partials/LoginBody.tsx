import useSignInClassCoordinatorForm from "../authentication/hook/useSignInCoordinatorClassForm";
import CardLogin from "./CardLogin";
import { FormProvider } from "react-hook-form";

const LoginBody = () => {
  const { signInreqForm } = useSignInClassCoordinatorForm();
  return (
    <div className="flex items-center justify-center">
      <FormProvider {...signInreqForm}>
        <CardLogin />
      </FormProvider>
    </div>
  );
};
export default LoginBody;
