import { FormProvider } from "react-hook-form";
import CardLogin from "./CardLogin";
import useKaryawanAuthenticationForm from "../authentication/hook/useKaryawanAuthenticationForm";
import img from "@assets/bg-2.jpg";

const LoginBody = () => {
  const { signInKaryawanreqForm } = useKaryawanAuthenticationForm();

  return (
    <div
      className="flex items-center justify-center bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url('${img}')`,
      }}
    >
      <FormProvider {...signInKaryawanreqForm}>
        <CardLogin />
      </FormProvider>
    </div>
  );
};
export default LoginBody;
