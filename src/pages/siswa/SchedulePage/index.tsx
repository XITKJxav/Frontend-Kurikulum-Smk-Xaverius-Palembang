import { SchedulePageProvider } from "@pages/siswa/SchedulePage/context";
import PayedKasLayout from "./layout";

const SchedulePage = () => {
  return (
    <SchedulePageProvider>
      <PayedKasLayout />
    </SchedulePageProvider>
  );
};

export default SchedulePage;
