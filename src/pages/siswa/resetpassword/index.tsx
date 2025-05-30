import { LoginadministratorclasspageProvider } from "./context";
import LoginBody from "./partials/LoginBody";

const LoginAdministratorClassPage = () => {
  return (
    <LoginadministratorclasspageProvider>
      <LoginBody />
    </LoginadministratorclasspageProvider>
  );
};
export default LoginAdministratorClassPage;
