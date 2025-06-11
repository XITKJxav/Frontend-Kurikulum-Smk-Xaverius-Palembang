import { KaryawanpageProvider } from "./context";
import KaryawanBody from "./partials/KaryawanBody";

const KaryawanPage = () => {
  return (
    <KaryawanpageProvider>
      <KaryawanBody />
    </KaryawanpageProvider>
  );
};
export default KaryawanPage;
