import { SchedulePageProvider } from "@pages/siswa/SchedulePage/context";
import Body from "./partials/Body";

const SchedulePage = () => {
  return (
    <SchedulePageProvider>
      <Body />
    </SchedulePageProvider>
  );
};

export default SchedulePage;
