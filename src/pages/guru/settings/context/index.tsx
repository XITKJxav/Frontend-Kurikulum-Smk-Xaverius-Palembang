import { createContext, useContext, useState } from "react";

type StateType = {
  settingLoading: boolean;
};

export const initialState: StateType = {
  settingLoading: false,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const SettingsKaryawanpageContext = createContext<ContextType | undefined>(
  undefined
);

const useSettingsKaryawanpageContext = (): ContextType => {
  const context = useContext(SettingsKaryawanpageContext);
  if (!context) {
    throw new Error(
      "useSettingsKaryawanpageContext must be used within a SettingsKaryawanpageProvider"
    );
  }
  return context;
};

const SettingsKaryawanpageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <SettingsKaryawanpageContext.Provider value={{ state, setState }}>
      {children}
    </SettingsKaryawanpageContext.Provider>
  );
};

export { SettingsKaryawanpageProvider, useSettingsKaryawanpageContext };
export type { StateType };
