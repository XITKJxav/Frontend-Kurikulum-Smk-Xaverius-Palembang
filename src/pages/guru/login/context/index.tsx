import { SignInKaryawanRequestModel } from "@api/authentication/model";
import { createContext, useContext, useState } from "react";

type StateType = {
  signInLoading: boolean;
  signinkaryawanreqDetails: SignInKaryawanRequestModel;
};

export const initialState: StateType = {
  signInLoading: false,
  signinkaryawanreqDetails: {} as SignInKaryawanRequestModel,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const KaryawanSignInContext = createContext<ContextType | undefined>(undefined);

const useKaryawanSignInContext = (): ContextType => {
  const context = useContext(KaryawanSignInContext);
  if (!context) {
    throw new Error(
      "useKaryawanSignInContext must be used within a KaryawanSignInProvider"
    );
  }
  return context;
};

const KaryawanSignInProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);

  return (
    <KaryawanSignInContext.Provider value={{ state, setState }}>
      {children}
    </KaryawanSignInContext.Provider>
  );
};

export { KaryawanSignInProvider, useKaryawanSignInContext };
export type { StateType };
