import { JadwalpageProvider } from "./context";
import SchenduleBody from "./partials/SchenduleBody";

const SchenduleDashboardPage = () => {
  return (
    <JadwalpageProvider>
      <SchenduleBody />
    </JadwalpageProvider>
  );
};
export default SchenduleDashboardPage;
