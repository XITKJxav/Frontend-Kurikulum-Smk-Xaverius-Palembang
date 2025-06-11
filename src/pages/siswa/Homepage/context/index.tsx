import { AppTypeUser } from "@types";
import { createContext, useContext, useState } from "react";

type StateType = {
  app: AppTypeUser;
  isLoading: boolean;
};

export const initialState: StateType = {
  app: "home",
  isLoading: false,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const HomepageContext = createContext<ContextType | null>(null);

const useHomepageContext = (): ContextType => {
  const context = useContext(HomepageContext);
  if (!context) {
    throw new Error(
      "useHomepageContext must be used within a HomepageProvider"
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
