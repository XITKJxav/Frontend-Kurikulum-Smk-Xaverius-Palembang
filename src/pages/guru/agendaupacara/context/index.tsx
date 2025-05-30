import {
  AgendaUpacaraModel,
  AgendaUpacaraResponseModel,
  CreateAgendaUpacaraModel,
  UpdateAgendaUpacaraModel,
} from "@api/agendaupacara/model";
import { StatusAgendaUpacaraOptionsModel } from "@api/HealthOption/model";
import { createContext, useContext, useState } from "react";

type StateType = {
  agendaUpacaraLoading: boolean;
  agendaUpacaraRequest: AgendaUpacaraResponseModel;
  agendaUpacaraByIdRequest: AgendaUpacaraModel[];
  statusAgendaUpacaraRequest: StatusAgendaUpacaraOptionsModel[];

  filters: {
    page: number;
    orderBy: boolean;
  };

  dialogLoading: boolean;
  agendaUpacarareqDetails: CreateAgendaUpacaraModel;
  agendaUpacaraUpdatereqDetails: UpdateAgendaUpacaraModel;
};

export const initialState: StateType = {
  agendaUpacaraByIdRequest: [],
  agendaUpacaraLoading: false,
  dialogLoading: false,
  statusAgendaUpacaraRequest: [],
  agendaUpacaraRequest: {
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

  agendaUpacarareqDetails: {} as AgendaUpacaraModel,
  agendaUpacaraUpdatereqDetails: {} as UpdateAgendaUpacaraModel,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const AgendaUpacarapageContext = createContext<ContextType | undefined>(
  undefined
);

const useAgendaUpacarapageContext = (): ContextType => {
  const context = useContext(AgendaUpacarapageContext);
  if (!context) {
    throw new Error(
      "useAgendaUpacarapageContext must be used within a AgendaUPacarapageProvider"
    );
  }
  return context;
};

const AgendaUpacarapageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <AgendaUpacarapageContext.Provider value={{ state, setState }}>
      {children}
    </AgendaUpacarapageContext.Provider>
  );
};

export { AgendaUpacarapageProvider, useAgendaUpacarapageContext };
export type { StateType };
