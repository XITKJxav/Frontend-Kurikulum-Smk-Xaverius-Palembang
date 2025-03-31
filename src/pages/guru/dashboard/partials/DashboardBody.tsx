import { listMenuGuru } from "@config/menu";
import { useDashboardpageContext } from "../context";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AppearFadeIn from "@components/Animation/AppearFadeIn";
import { useEffect } from "react";
import { Satellite } from "@mui/icons-material";

const DashboardBody = () => {
  const { state } = useDashboardpageContext();
  const matchedPart = listMenuGuru.find((data) => data.title === state?.app);
  useEffect(() => {
    console.log(state.app);
  }, []);
  return (
    <HelmetProvider>
      <Helmet>
        <title>Dashboard {state.app}</title>
      </Helmet>
      <AppearFadeIn trigger direction="bottom" delay={0.8}>
        {listMenuGuru.map(
          (data, index) =>
            state?.app == data.title && (
              <div
                key={index}
                className="h-[100vh] w-full p-6 shadow-lg bg-white rounded-xl overflow-x-hidden"
              >
                {data.part}
              </div>
            )
        )}
      </AppearFadeIn>
    </HelmetProvider>
  );
};

export default DashboardBody;
