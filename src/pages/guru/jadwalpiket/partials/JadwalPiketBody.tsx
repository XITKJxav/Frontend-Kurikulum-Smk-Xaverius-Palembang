import { useCallback, useEffect, useState } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { LocalStorage } from "@utils/localStorage";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import { LoadingDialog } from "@components/Dialog";
import { useJadwalPiketpageContext } from "../context";
import useJadwalPiket from "../List/hook/useJadwalPiket";
import { FiltersJadwal } from "../List/utils/filtersJadwal";
import { FiltersHari } from "../List/utils/filtersHari";
import TableJadwalPiket from "./TableJadwalPiket";

const JadwalPiketBody = () => {
  const { state } = useJadwalPiketpageContext();
  const { dayReq, classRoomRequest, jadwalPiketLoading } = state;
  const [day, setDay] = useState<string>("1");
  const [kelas, setKelas] = useState<string>("1");
  const handleChangeClass = useCallback((event: SelectChangeEvent<string>) => {
    setKelas(event.target.value);
  }, []);
  const { getItem } = LocalStorage();

  const {
    fetchDayRequest,
    fetchJadwalRequest,
    fetchTimeRequest,
    fetchClassRoom,
  } = useJadwalPiket();

  const karyawanData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];

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

  const handleChangeDay = useCallback((event: SelectChangeEvent<string>) => {
    const day = event.target.value;
    setDay(day);
  }, []);

  const fetchData = useCallback(() => {
    fetchClassRoom();
    fetchDayRequest();

    fetchJadwalRequest(
      FiltersJadwal({
        kdGuruPiket: karyawanData[0].kd_karyawan,
        kdKelas: kelas,
      })
    );
  }, []);

  useEffect(() => {
    fetchData();
    fetchTimeRequest(FiltersHari({ onDay: Number(day) }));
  }, [day, kelas]);

  return (
    <>
      {jadwalPiketLoading && <LoadingDialog open={true} onClose={() => {}} />}
      <div>
        <h1 className="text-4xl font-bold mb-5">Jadwal Piket</h1>
      </div>
      <div className="w-full mb-4 justify-center flex gap-3">
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
        <Select
          labelId="day-select-label"
          displayEmpty
          fullWidth
          value={day ? day.toString() : ""}
          onChange={handleChangeDay}
          variant="outlined"
          sx={{
            backgroundColor: "transparent",
            "& fieldset": {
              borderColor: "#667eea",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
          }}
        >
          <MenuItem value="" disabled>
            Pilih Hari
          </MenuItem>
          {dayReq?.map((data) => (
            <MenuItem
              key={data?.id}
              value={data?.id}
              sx={{
                background: "transparent",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.15)",
                },
              }}
            >
              {data?.nama}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="w-full">
        <TableJadwalPiket onDay={day} onClass={kelas} />
      </div>
    </>
  );
};
export default JadwalPiketBody;
