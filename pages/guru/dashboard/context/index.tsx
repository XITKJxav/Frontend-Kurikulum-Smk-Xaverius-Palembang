import { AppType } from "@types";
import { createContext, useContext, useState } from "react";

type StateType = {
  app: AppType;
};

export const initialState: StateType = {
  app: "dashboard",
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const DashboardpageContext = createContext<ContextType | null>(null);

const useHomepageContext = (): ContextType => {
  const context = useContext(DashboardpageContext);
  if (!context) {
    throw new Error(
      "useHomepageContext must be used within a HomepageProvider",
    );
  }
  return context;
};

const HomepageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);

  return (
    <DashboardpageContext.Provider value={{ state, setState }}>
      {children}
    </DashboardpageContext.Provider>
  );
};

export { HomepageProvider, useHomepageContext };
export type { StateType };
