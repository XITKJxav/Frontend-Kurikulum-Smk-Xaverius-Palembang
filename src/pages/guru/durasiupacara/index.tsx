import { DurasiPembelajaranpageProvider } from "./context";
import DurasiBody from "./partials/DurasiBody";

const DurasiUpacaraPage = () => {
  return (
    <DurasiPembelajaranpageProvider>
      <h1 className="mb-10 text-2xl font-semibold text-gray-800 border-b-2 ">
        Durasi Jam Pembelajaran
      </h1>

      <DurasiBody />
    </DurasiPembelajaranpageProvider>
  );
};
export default DurasiUpacaraPage;
