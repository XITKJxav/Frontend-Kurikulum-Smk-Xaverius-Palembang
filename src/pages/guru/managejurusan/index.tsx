import { JurusanpageProvider } from "./context";
import JurusanBody from "./partials/JurusanBody";

const JurusanPage = () => {
  return (
    <JurusanpageProvider>
      <JurusanBody />
    </JurusanpageProvider>
  );
};
export default JurusanPage;
