import { LoginClassCoordinatorProvider } from "./context";
import LoginBody from "./partials/LoginBody";
import bg1 from "@assets/bg-2.jpg";

const SignInStudentPage = () => {
  return (
    <div
      className="w-full h-[100vh] overflow-x-hidden bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${bg1})` }}
    >
      <LoginClassCoordinatorProvider>
        <LoginBody />
      </LoginClassCoordinatorProvider>
    </div>
  );
};
export default SignInStudentPage;
