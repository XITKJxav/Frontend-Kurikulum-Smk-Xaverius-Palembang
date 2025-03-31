import {
  JurusanCreateModel,
  JurusanModel,
  JurusanResponse,
  JurusanUpdateModel,
} from "@api/jurusan/model";
import { createContext, useContext, useState } from "react";

type StateType = {
  manageJurusanLoading: boolean;
  jurusanRequest: JurusanResponse;
  jurusanByIdRequest: JurusanModel[];
  filters: {
    orderBy: boolean;
  };
  dialogLoading: boolean;
  jurusanreqDetails: JurusanCreateModel;
  jurusanUpdatereqDetails: JurusanUpdateModel;
};

export const initialState: StateType = {
  jurusanByIdRequest: [],
  manageJurusanLoading: false,
  dialogLoading: false,
  jurusanRequest: {
    total: 0,
    current_page: 2,
    last_page: 1,
    data: [],
    path: "",
    per_page: 10,
  },

  filters: {
    orderBy: false,
  },

  jurusanreqDetails: {} as JurusanCreateModel,
  jurusanUpdatereqDetails: {} as JurusanUpdateModel,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const JurusanpageContext = createContext<ContextType | undefined>(undefined);

const usejurusanpageContext = (): ContextType => {
  const context = useContext(JurusanpageContext);
  if (!context) {
    throw new Error(
      "useDashboardpageContext must be used within a DashboardpageProvider"
    );
  }
  return context;
};

const JurusanpageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <JurusanpageContext.Provider value={{ state, setState }}>
      {children}
    </JurusanpageContext.Provider>
  );
};

export { JurusanpageProvider, usejurusanpageContext };
export type { StateType };
