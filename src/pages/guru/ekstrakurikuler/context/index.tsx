import {
  CreateEkstrakurikulerRequestModel,
  EkstrakurikulerResponseModel,
} from "@api/ekstrakurikuler/model";
import { DayModel } from "@api/jadwal/model";
import { createContext, useContext, useState } from "react";

type StateType = {
  ekstrakurikulerLoading: boolean;
  ekstrakurikulerRequest: EkstrakurikulerResponseModel;
  dayRequest: DayModel[];
  filters: {
    page: number;
    orderBy: boolean;
  };

  ekstrakurikulerreqDetails: CreateEkstrakurikulerRequestModel;
};

export const initialState: StateType = {
  ekstrakurikulerLoading: false,
  dayRequest: [],
  ekstrakurikulerRequest: {
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

  ekstrakurikulerreqDetails: {} as CreateEkstrakurikulerRequestModel,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const EkstrakurikulerpageContext = createContext<ContextType | undefined>(
  undefined
);

const useEkstrakurikulerpageContext = (): ContextType => {
  const context = useContext(EkstrakurikulerpageContext);
  if (!context) {
    throw new Error(
      "useEkstrakurikulerpageContext must be used within a EkstrakurikulerpageProvider"
    );
  }
  return context;
};

const EkstrakurikulerpageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <EkstrakurikulerpageContext.Provider value={{ state, setState }}>
      {children}
    </EkstrakurikulerpageContext.Provider>
  );
};

export { EkstrakurikulerpageProvider, useEkstrakurikulerpageContext };
export type { StateType };
