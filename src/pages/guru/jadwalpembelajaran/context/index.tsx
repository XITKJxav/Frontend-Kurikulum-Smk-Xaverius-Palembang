import { ClassRoomModel } from "@api/classcoordinator/model";
import { DayModel, JadwalModel, RegulerTimeModel } from "@api/jadwal/model";

import { createContext, useContext, useState } from "react";

type StateType = {
  jadwalPembelajaranLoading: boolean;
  dayReq: DayModel[];
  timeReq: RegulerTimeModel[];
  jadwalPembelajaranReq: JadwalModel[];
  classRoomRequest: ClassRoomModel[];
};

export const initialState: StateType = {
  jadwalPembelajaranLoading: false,
  jadwalPembelajaranReq: [],
  dayReq: [],
  timeReq: [],
  classRoomRequest: [],
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const JadwalPembelajaranpageContext = createContext<ContextType | undefined>(
  undefined
);

const useJadwalPembelajaranpageContext = (): ContextType => {
  const context = useContext(JadwalPembelajaranpageContext);
  if (!context) {
    throw new Error(
      "useJadwalPembelajaranpageContext must be used within a JadwalPembelajaranpageProvider"
    );
  }
  return context;
};

const JadwalPembelajaranpageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <JadwalPembelajaranpageContext.Provider value={{ state, setState }}>
      {children}
    </JadwalPembelajaranpageContext.Provider>
  );
};

export { JadwalPembelajaranpageProvider, useJadwalPembelajaranpageContext };
export type { StateType };
