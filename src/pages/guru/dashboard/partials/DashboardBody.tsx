import { listPart } from "@pages/guru/common/utils/menu";
import { useDashboardpageContext } from "../context";

const DashboardBody = () => {
  const { state } = useDashboardpageContext();
  const matchedPart = listPart.find((data) => data.name === state?.app);

  return (
    <div className="h-[100vh] border">{matchedPart && matchedPart?.part}</div>
  );
};

export default DashboardBody;
