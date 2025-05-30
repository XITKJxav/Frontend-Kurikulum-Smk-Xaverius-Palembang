import { FormProvider } from "react-hook-form";
import { useJadwalpageContext } from "../context";
import useSchenduleForm from "../CreateSchendule/hook/useSchenduleForm";
import { useCallback, useEffect, useState } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { FiltersHari } from "../List/utils/filtersJadwal";
import useSchendule from "../List/hook/useSchendule";
import CreateJadwalForm from "./CreateJadwalForm";
import TableSchendule from "./TableSchendule";

const SchenduleBody = () => {
  const { state } = useJadwalpageContext();
  const { createJadwalreqForm } = useSchenduleForm();
  const { schenduleDayReq, classRoomRequest, schendulereq } = state;

  const {
    fetchJadwal,
    fetchDayRequest,
    fetchClassRoom,
    fetchTimeRegulerRequest,
  } = useSchendule();

  const [day, setDay] = useState<string>("1");
  const [kelas, setKelas] = useState<string>("1");

  const handleChangeDay = useCallback((event: SelectChangeEvent<string>) => {
    setDay(event.target.value);
  }, []);

  const handleChangeClass = useCallback((event: SelectChangeEvent<string>) => {
    setKelas(event.target.value);
  }, []);

  const menuProps = {
    PaperProps: {
      sx: {
        backgroundColor: "white",
        borderRadius: "8px",
        border: "1px solid #667eea",
        color: "black",
        mt: 1,
      },
    },
  };

  const fetchData = useCallback(() => {
    fetchJadwal();
    fetchTimeRegulerRequest(FiltersHari({ onDay: Number(day) }));
    fetchDayRequest();
    fetchClassRoom();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const jadwalSudahAda = schendulereq.some(
    (jadwal) => jadwal.id_ruangan_kelas === Number(kelas)
  );

  return (
    <>
      <div className="flex w-full gap-3 mb-4">
        <h1>Rancang Jadwal</h1>
        <div className="flex items-center gap-2">
          <label>Kelas</label>
          {classRoomRequest.length > 0 && (
            <Select
              displayEmpty
              fullWidth
              value={kelas}
              onChange={handleChangeClass}
              variant="outlined"
              MenuProps={menuProps}
            >
              <MenuItem value="" disabled>
                Pilih Kelas
              </MenuItem>
              {classRoomRequest.map((data) => (
                <MenuItem key={data.id} value={String(data.id)}>
                  {data.nama_ruangan}
                </MenuItem>
              ))}
            </Select>
          )}
        </div>

        <div className="flex items-center w-full gap-2">
          <label>Hari</label>
          {schenduleDayReq.length > 0 && (
            <Select
              displayEmpty
              fullWidth
              value={day}
              onChange={handleChangeDay}
              variant="outlined"
              MenuProps={menuProps}
            >
              <MenuItem value="" disabled>
                Pilih Hari
              </MenuItem>
              {schenduleDayReq.map((data) => (
                <MenuItem key={data.id} value={String(data.id)}>
                  {data.nama}
                </MenuItem>
              ))}
            </Select>
          )}
        </div>
      </div>
      {jadwalSudahAda ? (
        <TableSchendule onDay={day} onKelas={kelas} />
      ) : (
        <FormProvider {...createJadwalreqForm}>
          <CreateJadwalForm id_ruangan_kelas={kelas} />
        </FormProvider>
      )}
    </>
  );
};

export default SchenduleBody;
