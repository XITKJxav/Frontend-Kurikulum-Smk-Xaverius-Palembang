import { HomepageProvider } from "./context";
import HomeBody from "./partials/HomeBody";

const HomePage = () => {
  return (
    <HomepageProvider>
      <HomeBody />
    </HomepageProvider>
  );
};
export default HomePage;
