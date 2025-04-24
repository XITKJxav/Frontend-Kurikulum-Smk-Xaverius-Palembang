import { JurusanpageProvider } from "../managejurusan/context";
import ClassRoomBody from "./partials/ClassRoomBody";

const JadwalPage = () => {
  return (
    <JurusanpageProvider>
      <ClassRoomBody />
    </JurusanpageProvider>
  );
};
export default JadwalPage;
