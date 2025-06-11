import { AppTypeUser } from "@types";
import { useHomepageContext } from "../context";

interface HookReturn {
  handleChangeApp: (app: AppTypeUser) => void;
}
const useHomepage = (): HookReturn => {
  const { setState } = useHomepageContext();

  const handleChangeApp = (app: AppTypeUser) => {
    setState((prevState) => ({ ...prevState, app }));
  };

  return {
    handleChangeApp,
  };
};

export default useHomepage;
