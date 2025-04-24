import { createContext, useContext, useState } from "react";

type StateType = {};

export const initialState: StateType = {};

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
