import {
  ClassRoomCreateModel,
  ClassRoomModel,
  ClassRoomReponseModel,
  ClassRoomUpdateModel,
} from "@api/classroom/model";
import { JurusanModel } from "@api/jurusan/model";
import { createContext, useContext, useState } from "react";

type StateType = {
  classroomLoading: boolean;
  classroomRequest: ClassRoomReponseModel;
  classroomUpdatereqDetails: ClassRoomUpdateModel;
  classroomByIdRequest: ClassRoomModel[];
  jurusanRequest: JurusanModel[];

  filtersClassRoom: {
    page: number;
    orderBy: boolean;
  };

  classroomreqForm: ClassRoomCreateModel;
  classroomUpdatereqForm: ClassRoomUpdateModel;
};

export const initialState: StateType = {
  classroomLoading: false,
  jurusanRequest: [],
  classroomByIdRequest: [],

  classroomRequest: {
    total: 0,
    current_page: 2,
    last_page: 1,
    data: [],
    path: "",
    per_page: 10,
  },

  filtersClassRoom: {
    page: 0,
    orderBy: false,
  },

  classroomreqForm: {} as ClassRoomCreateModel,
  classroomUpdatereqForm: {} as ClassRoomUpdateModel,
  classroomUpdatereqDetails: {} as ClassRoomUpdateModel,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const ClassroompageContext = createContext<ContextType | undefined>(undefined);

const useClassroompageContext = (): ContextType => {
  const context = useContext(ClassroompageContext);
  if (!context) {
    throw new Error(
      "useClassRoompageContext must be used within a ClassRoompageProvider"
    );
  }
  return context;
};

const ClassroompageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <ClassroompageContext.Provider value={{ state, setState }}>
      {children}
    </ClassroompageContext.Provider>
  );
};

export { ClassroompageProvider, useClassroompageContext };
export type { StateType };
