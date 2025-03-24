import { listMenuGuru } from "@utils/menu";
import { useDashboardpageContext } from "../context";
import { Helmet, HelmetProvider } from "react-helmet-async";

const DashboardBody = () => {
  const { state } = useDashboardpageContext();
  const matchedPart = listMenuGuru.find((data) => data.title === state?.app);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Dashboard {matchedPart?.title}</title>
      </Helmet>
      <div className="h-[100vh] border">{matchedPart && matchedPart?.part}</div>
    </HelmetProvider>
  );
};

export default DashboardBody;
