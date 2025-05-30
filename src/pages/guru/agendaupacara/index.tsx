import { AgendaUpacarapageProvider } from "./context";
import MataPelajaranBody from "./partials/AgendaUpacaraBody";

const AgendaUpacaraPage = () => {
  return (
    <AgendaUpacarapageProvider>
      <MataPelajaranBody />
    </AgendaUpacarapageProvider>
  );
};
export default AgendaUpacaraPage;
