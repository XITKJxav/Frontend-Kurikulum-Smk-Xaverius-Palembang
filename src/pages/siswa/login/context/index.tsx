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

const LoginClassCoordinatorContext = createContext<ContextType | undefined>(
  undefined
);

const useLoginClassCoordinatorContext = (): ContextType => {
  const context = useContext(LoginClassCoordinatorContext);
  if (!context) {
    throw new Error(
      "useLoginClassCoordinatorContext must be used within a LoginClassCoordinatorProvider"
    );
  }
  return context;
};

const LoginClassCoordinatorProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <LoginClassCoordinatorContext.Provider value={{ state, setState }}>
      {children}
    </LoginClassCoordinatorContext.Provider>
  );
};

export { LoginClassCoordinatorProvider, useLoginClassCoordinatorContext };
export type { StateType };
