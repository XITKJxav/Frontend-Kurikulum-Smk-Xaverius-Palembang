import { MataPelajaranpageProvider } from "./context";
import MataPelajaranBody from "./partials/MataPelajaranBody";

const MataPelajaranPage = () => {
  return (
    <MataPelajaranpageProvider>
      <MataPelajaranBody />
    </MataPelajaranpageProvider>
  );
};
export default MataPelajaranPage;
