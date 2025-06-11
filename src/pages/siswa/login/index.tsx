import { LoginClassCoordinatorProvider } from "./context";
import LoginBody from "./partials/LoginBody";

const LoginAdministratorClassPage = () => {
  return (
    <LoginClassCoordinatorProvider>
      <LoginBody />
    </LoginClassCoordinatorProvider>
  );
};
export default LoginAdministratorClassPage;
