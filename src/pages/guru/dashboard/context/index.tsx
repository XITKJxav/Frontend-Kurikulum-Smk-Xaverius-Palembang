import { AppType } from "@types";
import { createContext, useContext, useState } from "react";

type StateType = {
  app: AppType;
};

export const initialState: StateType = {
  app: "home",
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const DashboardpageContext = createContext<ContextType | undefined>(undefined);

const useDashboardpageContext = (): ContextType => {
  const context = useContext(DashboardpageContext);
  if (!context) {
    throw new Error(
      "useDashboardpageContext must be used within a DashboardpageProvider"
    );
  }
  return context;
};

const DashboardpageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <DashboardpageContext.Provider value={{ state, setState }}>
      {children}
    </DashboardpageContext.Provider>
  );
};

export { DashboardpageProvider, useDashboardpageContext };
export type { StateType };
