import { JurusanpageProvider } from "./context";
import LoginBody from "./partials/LoginBody";

const JurusanPage = () => {
  return (
    <LoginpageProvider>
      <LoginBody />
    </LoginpageProvider>
  );
};
export default JurusanPage;
