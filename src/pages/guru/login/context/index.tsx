import { createContext, useContext, useState } from "react";

type StateType = {
  //
};

export const initialState: StateType = {
  //
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const LoginpageContext = createContext<ContextType | undefined>(undefined);

const useLoginpageContext = (): ContextType => {
  const context = useContext(LoginpageContext);
  if (!context) {
    throw new Error(
      "useLoginpageContext must be used within a LoginpageProvider"
    );
  }
  return context;
};

const LoginpageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <LoginpageContext.Provider value={{ state, setState }}>
      {children}
    </LoginpageContext.Provider>
  );
};

export { LoginpageProvider, useLoginpageContext };
export type { StateType };
