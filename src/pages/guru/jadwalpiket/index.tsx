import { JadwalPiketpageProvider } from "./context";
import JadwalPiketBody from "./partials/JadwalPiketBody";

const JadwalPiketPage = () => {
  return (
    <JadwalPiketpageProvider>
      <JadwalPiketBody />
    </JadwalPiketpageProvider>
  );
};
export default JadwalPiketPage;
