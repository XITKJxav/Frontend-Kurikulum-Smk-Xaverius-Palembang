import { DurasiPembelajaranModel } from "@api/durasipembelajaran/model";
import { createContext, useContext, useState } from "react";

type StateType = {
  durasiPembelajaranLoading: boolean;
  durasiPembelajaranRequest: number;
  durasiUpdatereqDetails: DurasiPembelajaranModel;
};

export const initialState: StateType = {
  durasiPembelajaranLoading: false,
  durasiPembelajaranRequest: 0,
  durasiUpdatereqDetails: {} as DurasiPembelajaranModel,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const DurasiPembelajaranpageContext = createContext<ContextType | undefined>(
  undefined
);

const useDurasiPembelajaranpageContext = (): ContextType => {
  const context = useContext(DurasiPembelajaranpageContext);
  if (!context) {
    throw new Error(
      "useDurasiPembelajaranpageContext must be used within a DurasiPembelajaranpageProvider"
    );
  }
  return context;
};

const DurasiPembelajaranpageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <DurasiPembelajaranpageContext.Provider value={{ state, setState }}>
      {children}
    </DurasiPembelajaranpageContext.Provider>
  );
};

export { DurasiPembelajaranpageProvider, useDurasiPembelajaranpageContext };

export type { StateType };
