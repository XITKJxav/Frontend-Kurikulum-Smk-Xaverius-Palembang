import { ClassroompageProvider } from "./context";
import ClassRoomBody from "./partials/ClassRoomBody";

const ClassRoomPage = () => {
  return (
    <ClassroompageProvider>
      <ClassRoomBody />
    </ClassroompageProvider>
  );
};
export default ClassRoomPage;
