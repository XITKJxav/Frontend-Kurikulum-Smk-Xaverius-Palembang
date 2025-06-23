import useAuthInterceptor from "@hooks/useAuthInterceptor";
import { HomepageProvider } from "./context";
import HomeBody from "./partials/HomeBody";

const HomePage = () => {
  useAuthInterceptor("siswa");

  return (
    <HomepageProvider>
      <HomeBody />
    </HomepageProvider>
  );
};
export default HomePage;
