import { createContext, useContext, useState } from "react";

type StateType = {};

export const initialState: StateType = {};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const HomepageContext = createContext<ContextType | undefined>(undefined);

const useHomepageContext = (): ContextType => {
  const context = useContext(HomepageContext);
  if (!context) {
    throw new Error(
      "useDashboardpageContext must be used within a DashboardpageProvider"
    );
  }
  return context;
};

const HomepageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <HomepageContext.Provider value={{ state, setState }}>
      {children}
    </HomepageContext.Provider>
  );
};

export { HomepageProvider, useHomepageContext };
export type { StateType };
