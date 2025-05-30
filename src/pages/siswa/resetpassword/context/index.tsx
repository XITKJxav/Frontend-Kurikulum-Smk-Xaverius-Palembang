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

const LoginadministratorclasspageContext = createContext<
  ContextType | undefined
>(undefined);

const useLoginadministratorclassPageContext = (): ContextType => {
  const context = useContext(LoginadministratorclasspageContext);
  if (!context) {
    throw new Error(
      "useLoginadministratorclasspageContext  must be used within a  LoginadministratorclasspageProvider"
    );
  }
  return context;
};

const LoginadministratorclasspageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <LoginadministratorclasspageContext.Provider value={{ state, setState }}>
      {children}
    </LoginadministratorclasspageContext.Provider>
  );
};

export {
  LoginadministratorclasspageProvider,
  useLoginadministratorclassPageContext,
};
export type { StateType };
