import { EkstrakurikulerpageProvider } from "./context";
import EkstrakurikulerBody from "./partials/EkstrakulikulerBody";

const EkstrakurikulerPage = () => {
  return (
    <EkstrakurikulerpageProvider>
      <EkstrakurikulerBody />
    </EkstrakurikulerpageProvider>
  );
};

export default EkstrakurikulerPage;
