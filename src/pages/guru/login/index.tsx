import { KaryawanSignInProvider } from "./context";
import LoginBody from "./partials/LoginBody";

const KaryawanSigninPage = () => {
  return (
    <KaryawanSignInProvider>
      <LoginBody />
    </KaryawanSignInProvider>
  );
};
export default KaryawanSigninPage;
