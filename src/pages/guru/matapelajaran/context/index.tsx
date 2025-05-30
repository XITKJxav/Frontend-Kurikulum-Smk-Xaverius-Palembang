import { RoleOptionModel } from "@api/HealthOption/model";
import {
  CreateMataPelajaranRequestModel,
  MataPelajaranModel,
  MataPelajaranResponseRequestModel,
  UpdateMataPelajaranRequestModel,
} from "@api/matapelajaran/model";

import { createContext, useContext, useState } from "react";

type StateType = {
  mataPelajaranLoading: boolean;
  mataPelajaranRequest: MataPelajaranResponseRequestModel;
  mataPelajaranByIdRequest: MataPelajaranModel[];

  filters: {
    page: number;
    orderBy: boolean;
  };

  dialogLoading: boolean;
  mataPelajaranreqDetails: CreateMataPelajaranRequestModel;
  mataPelajaranUpdatereqDetails: UpdateMataPelajaranRequestModel;
};

export const initialState: StateType = {
  mataPelajaranByIdRequest: [],
  mataPelajaranLoading: false,
  dialogLoading: false,
  mataPelajaranRequest: {
    total: 0,
    current_page: 2,
    last_page: 1,
    data: [],
    path: "",
    per_page: 10,
  },

  filters: {
    page: 0,
    orderBy: false,
  },

  mataPelajaranreqDetails: {} as CreateMataPelajaranRequestModel,
  mataPelajaranUpdatereqDetails: {} as UpdateMataPelajaranRequestModel,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const MataPelajaranpageContext = createContext<ContextType | undefined>(
  undefined
);

const useMataPelajaranpageContext = (): ContextType => {
  const context = useContext(MataPelajaranpageContext);
  if (!context) {
    throw new Error(
      "useMataPelajaranpageContext must be used within a MataPelajaranpageProvider"
    );
  }
  return context;
};

const MataPelajaranpageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <MataPelajaranpageContext.Provider value={{ state, setState }}>
      {children}
    </MataPelajaranpageContext.Provider>
  );
};

export { MataPelajaranpageProvider, useMataPelajaranpageContext };
export type { StateType };
