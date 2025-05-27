import { FormProvider } from "react-hook-form";
import CardLogin from "./CardLogin";
import useKaryawanAuthenticationForm from "../authentication/hook/useKaryawanAuthenticationForm";

const LoginBody = () => {
  const { signInKaryawanreqForm } = useKaryawanAuthenticationForm();

  return (
    <div className="flex items-center justify-center">
      <FormProvider {...signInKaryawanreqForm}>
        <CardLogin />
      </FormProvider>
    </div>
  );
};
export default LoginBody;
