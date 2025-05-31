import { JadwalPembelajaranpageProvider } from "./context";
import JadwalPembelajaranBody from "./partials/JadwalPembelajaranBody";

const JadwalPembelajaranPage = () => {
  return (
    <JadwalPembelajaranpageProvider>
      <JadwalPembelajaranBody />
    </JadwalPembelajaranpageProvider>
  );
};
export default JadwalPembelajaranPage;
