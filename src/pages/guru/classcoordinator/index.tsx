import { ClassCoordinatorPageProvider } from "./context";
import ClassCoordinatorBody from "./partials/ClassCoordinatorBody";

const ClassCoordinatorPage = () => {
  return (
    <ClassCoordinatorPageProvider>
      <ClassCoordinatorBody />
    </ClassCoordinatorPageProvider>
  );
};
export default ClassCoordinatorPage;
