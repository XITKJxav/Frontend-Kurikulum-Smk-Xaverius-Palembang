import { LoginClassCoordinatorModel } from "@api/classcoordinator/model";
import { createContext, useContext, useState } from "react";

type StateType = {
  signInLoading: boolean;
  signinreqDetails: LoginClassCoordinatorModel;
};

export const initialState: StateType = {
  signInLoading: false,
  signinreqDetails: {} as LoginClassCoordinatorModel,
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
      "useLoginclasscoordinatorpageContext  must be used within a  LoginclasscoordinatorpageProvider"
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
