import { createContext, useContext, useState } from "react";

type StateType = {
  SchedulePageLoading: boolean;
};

export const initialState: StateType = {
  SchedulePageLoading: false,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const SchedulePageContext = createContext<ContextType | null>(null);

const useSchedulePageContext = (): ContextType => {
  const context = useContext(SchedulePageContext);
  if (!context) {
    throw new Error(
      "useSchedulePageContext must be used within a SchedulePageProvider"
    );
  }
  return context;
};

const SchedulePageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);

  return (
    <SchedulePageContext.Provider value={{ state, setState }}>
      {children}
    </SchedulePageContext.Provider>
  );
};

export { SchedulePageProvider, useSchedulePageContext };
export type { StateType };
