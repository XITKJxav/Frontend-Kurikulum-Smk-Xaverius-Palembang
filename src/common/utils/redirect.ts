import { useDashboardpageContext } from "@pages/guru/dashboard/context";

interface HookReturn {
  handleRedirect: () => void;
}

export const Redirect = (): HookReturn => {
  const { state, setState } = useDashboardpageContext();

  const handleRedirect = () => {
    setState((prevState) => ({
      ...prevState,
      app: "home",
    }));
    console.log(state.app);
  };

  return { handleRedirect };
};
