import { listMenuGuru } from "@config/menu";
import { useDashboardpageContext } from "../context";
import { Helmet, HelmetProvider } from "react-helmet-async";
import AppearFadeIn from "@components/Animation/AppearFadeIn";

const DashboardBody = () => {
  const { state } = useDashboardpageContext();

  const allMenus = listMenuGuru.flatMap((item) =>
    item.children ? item.children : [item]
  );

  const activePage = allMenus.find(
    (item) => item.title.toLowerCase() === state.app.toLowerCase()
  );

  return (
    <HelmetProvider>
      <Helmet>
        <title>Dashboard {state.app}</title>
      </Helmet>
      <AppearFadeIn trigger direction="bottom" delay={0.8}>
        <div className="h-[100vh] w-full p-6 shadow-lg bg-white rounded-xl overflow-x-hidden">
          {activePage?.part || <div>Halaman tidak ditemukan</div>}
        </div>
      </AppearFadeIn>
    </HelmetProvider>
  );
};

export default DashboardBody;
