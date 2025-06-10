import { FormProvider } from "react-hook-form";
import CardLogin from "./CardLogin";
import useKaryawanAuthenticationForm from "../authentication/hook/useKaryawanAuthenticationForm";
import img from "@assets/bg-2.jpg";
import { useKaryawanSignInContext } from "../context";
import { LoadingDialog } from "@components/Dialog";

const LoginBody = () => {
  const { signInKaryawanreqForm } = useKaryawanAuthenticationForm();
  const { state } = useKaryawanSignInContext();
  return (
    <div
      className="flex items-center justify-center bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url('${img}')`,
      }}
    >
      {state.signInLoading && <LoadingDialog open={true} onClose={() => {}} />}
      <FormProvider {...signInKaryawanreqForm}>
        <CardLogin />
      </FormProvider>
    </div>
  );
};
export default LoginBody;
