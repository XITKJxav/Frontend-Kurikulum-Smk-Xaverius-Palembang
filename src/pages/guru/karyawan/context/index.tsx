import { RoleOptionModel } from "@api/HealthOption/model";
import {
  CreateKaryawanRequestModel,
  KaryawanModel,
  KaryawanResponseRequestModel,
  UpdateKaryawanRequestModel,
} from "@api/karyawan/model";
import { createContext, useContext, useState } from "react";

type StateType = {
  KaryawanLoading: boolean;
  karyawanRequest: KaryawanResponseRequestModel;
  karyawanByIdRequest: KaryawanModel[];
  roleRequest: RoleOptionModel[];
  filters: {
    page: number;
    orderBy: boolean;
  };
  dialogLoading: boolean;
  karyawanreqDetails: CreateKaryawanRequestModel;
  karyawanUpdatereqDetails: UpdateKaryawanRequestModel;
};

export const initialState: StateType = {
  karyawanByIdRequest: [],
  roleRequest: [],
  KaryawanLoading: false,
  dialogLoading: false,
  karyawanRequest: {
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

  karyawanreqDetails: {} as CreateKaryawanRequestModel,
  karyawanUpdatereqDetails: {} as UpdateKaryawanRequestModel,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const KaryawanpageContext = createContext<ContextType | undefined>(undefined);

const usekaryawanpageContext = (): ContextType => {
  const context = useContext(KaryawanpageContext);
  if (!context) {
    throw new Error(
      "useDashboardpageContext must be used within a DashboardpageProvider"
    );
  }
  return context;
};

const KaryawanpageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <KaryawanpageContext.Provider value={{ state, setState }}>
      {children}
    </KaryawanpageContext.Provider>
  );
};

export { KaryawanpageProvider, usekaryawanpageContext };
export type { StateType };
