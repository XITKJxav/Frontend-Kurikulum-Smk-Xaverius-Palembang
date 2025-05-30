import {
  ClassRoomOptionModel,
  MataPelajaranModel,
} from "@api/HealthOption/model";
import {
  CreateJadwalModel,
  DayModel,
  JadwalModel,
  JadwalUpdateModel,
  RegulerTimeModel,
} from "@api/jadwal/model";
import { KaryawanModel } from "@api/karyawan/model";
import { createContext, useContext, useState } from "react";

type StateType = {
  schendulePageLoading: boolean;
  schenduleTimeRegulerReq: RegulerTimeModel[];
  schenduleTimeRegulerByIdReq: RegulerTimeModel[];
  schenduleDayReq: DayModel[];
  classRoomRequest: ClassRoomOptionModel[];
  mataPelajaranreq: MataPelajaranModel[];
  schendulereq: JadwalModel[];
  schenduleIdreq: JadwalModel[];
  karyawanreq: KaryawanModel[];

  jadwalUpdateReqForm: JadwalUpdateModel;
  jadwalCreateReqForm: CreateJadwalModel;
};

export const initialState: StateType = {
  schendulePageLoading: true,
  schenduleTimeRegulerReq: [],
  schenduleIdreq: [],
  schenduleTimeRegulerByIdReq: [],
  schenduleDayReq: [],
  classRoomRequest: [],
  mataPelajaranreq: [],
  schendulereq: [],
  karyawanreq: [],

  jadwalUpdateReqForm: {} as JadwalUpdateModel,
  jadwalCreateReqForm: {} as CreateJadwalModel,
};

type ContextType = {
  state: StateType;
  setState: React.Dispatch<React.SetStateAction<StateType>>;
};

const JadwalpageContext = createContext<ContextType | undefined>(undefined);

const useJadwalpageContext = (): ContextType => {
  const context = useContext(JadwalpageContext);
  if (!context) {
    throw new Error(
      "useSchendulepageContext must be used within a SchendulepageProvider"
    );
  }
  return context;
};

const JadwalpageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<StateType>(initialState);
  return (
    <JadwalpageContext.Provider value={{ state, setState }}>
      {children}
    </JadwalpageContext.Provider>
  );
};

export { JadwalpageProvider, useJadwalpageContext };
export type { StateType };
