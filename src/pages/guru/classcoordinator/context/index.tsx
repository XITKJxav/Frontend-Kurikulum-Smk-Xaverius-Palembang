import {
  ClassCoordinatorModel,
  ClassCoordinatorResponseModel,
  CreateClassCoordinatorModel,
  UpdateClassCoordinatorModel,
} from "@api/classcoordinator/model";
import { ClassRoomModel } from "@api/classroom/model";
import { createContext, useContext, useState } from "react";

type StateType = {
  classCoordinatorLoading: boolean;
  classCoordinatorRequest: ClassCoordinatorResponseModel;
  classCoordinatorByIdRequest: ClassCoordinatorModel[];
  classRoomRequest: ClassRoomModel[];

  filtersClassCoordinator: {
    page: number;
    orderBy: boolean;
  };

  classCoordinatorCreateReqForm: CreateClassCoordinatorModel;
  classCoordinatorUpdateReqForm: UpdateClassCoordinatorModel;
};

export const initialState: StateType = {
  classCoordinatorLoading: false,
  classRoomRequest: [],
  classCoordinatorByIdRequest: [],

  classCoordinatorRequest: {
    total: 0,
    current_page: 1,
    last_page: 1,
    data: [],
    path: "",
    per_page: 10,
  },

  filtersClassCoordinator: {
    page: 0,
    orderBy: false,
  },

  classCoordinatorCreateReqForm: {} as CreateClassCoordinatorModel,
  classCoordinatorUpdateReqForm: {} as UpdateClassCoordinatorModel,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const ClassCoordinatorPageContext = createContext<ContextType | undefined>(
  undefined
);

const useClassCoordinatorPageContext = (): ContextType => {
  const context = useContext(ClassCoordinatorPageContext);
  if (!context) {
    throw new Error(
      "useClassCoordinatorPageContext must be used within a ClassCoordinatorPageProvider"
    );
  }
  return context;
};

const ClassCoordinatorPageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <ClassCoordinatorPageContext.Provider value={{ state, setState }}>
      {children}
    </ClassCoordinatorPageContext.Provider>
  );
};

export { ClassCoordinatorPageProvider, useClassCoordinatorPageContext };
export type { StateType };
