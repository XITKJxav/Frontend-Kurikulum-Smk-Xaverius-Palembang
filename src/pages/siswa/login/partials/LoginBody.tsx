import useLoginAdministratorClassForm from "../loginUser/hook/useLoginAdministratorClassForm";
import CardLogin from "./CardLogin";
import { FormProvider } from "react-hook-form";

const LoginBody = () => {
  const { signInreqForm } = useLoginAdministratorClassForm();
  return (
    <div className="flex justify-center items-center">
      <FormProvider {...signInreqForm}>
        <CardLogin />
      </FormProvider>
    </div>
  );
};
export default LoginBody;
