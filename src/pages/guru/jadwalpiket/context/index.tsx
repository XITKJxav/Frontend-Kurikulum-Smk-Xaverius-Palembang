import { ClassRoomModel } from "@api/classcoordinator/model";
import { DayModel, JadwalModel, RegulerTimeModel } from "@api/jadwal/model";

import { createContext, useContext, useState } from "react";

type StateType = {
  jadwalPiketLoading: boolean;
  dayReq: DayModel[];
  timeReq: RegulerTimeModel[];
  jadwalPiketReq: JadwalModel[];
  classRoomRequest: ClassRoomModel[];
};

export const initialState: StateType = {
  jadwalPiketLoading: false,
  jadwalPiketReq: [],
  dayReq: [],
  timeReq: [],
  classRoomRequest: [],
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const JadwalPiketpageContext = createContext<ContextType | undefined>(
  undefined
);

const useJadwalPiketpageContext = (): ContextType => {
  const context = useContext(JadwalPiketpageContext);
  if (!context) {
    throw new Error(
      "useJadwalPiketpageContext must be used within a JadwalPiketpageProvider"
    );
  }
  return context;
};

const JadwalPiketpageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <JadwalPiketpageContext.Provider value={{ state, setState }}>
      {children}
    </JadwalPiketpageContext.Provider>
  );
};

export { JadwalPiketpageProvider, useJadwalPiketpageContext };
export type { StateType };
