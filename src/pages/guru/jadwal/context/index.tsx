import { createContext, useContext, useState } from "react";

type StateType = {};

export const initialState: StateType = {};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const JadwalpageContext = createContext<ContextType | undefined>(undefined);

const useJadwalpageContext = (): ContextType => {
  const context = useContext(JadwalpageContext);
  if (!context) {
    throw new Error(
      "useDashboardpageContext must be used within a DashboardpageProvider"
    );
  }
  return context;
};

const JadwalpageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <JadwalpageContext.Provider value={{ state, setState }}>
      {children}
    </JadwalpageContext.Provider>
  );
};

export { JadwalpageProvider, useJadwalpageContext };
export type { StateType };
