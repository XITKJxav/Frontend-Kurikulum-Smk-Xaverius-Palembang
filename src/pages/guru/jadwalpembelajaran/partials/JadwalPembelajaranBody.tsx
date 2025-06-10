import { useCallback, useEffect, useState } from "react";
import { useJadwalPembelajaranpageContext } from "../context";
import useJadwalPembelajaran from "../List/hook/useJadwalPembelajaran";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FiltersJadwal } from "../List/utils/filtersJadwal";
import { LocalStorage } from "@utils/localStorage";
import { KaryawanSignInResponseRequestModel } from "@api/authentication/model";
import TableJadwalPembelajaran from "./TableJadwalPembelajaran";
import { FiltersHari } from "../List/utils/filtersHari";
import { LoadingDialog } from "@components/Dialog";

const JadwalPembelajaranBody = () => {
  const { state } = useJadwalPembelajaranpageContext();
  const { dayReq, classRoomRequest, jadwalPembelajaranLoading } = state;
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
  } = useJadwalPembelajaran();

  const karyawanData: KaryawanSignInResponseRequestModel[] =
    getItem("karyawanData") || [];
  const fetchData = useCallback(() => {
    fetchDayRequest(),
      fetchJadwalRequest(
        FiltersJadwal({
          kdGuru: karyawanData[0].kd_karyawan,
          kdKelas: kelas,
          day: Number(day),
        })
      ),
      fetchClassRoom();
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
  const handleChangeDay = useCallback((event: SelectChangeEvent<string>) => {
    const day = event.target.value;
    setDay(day);
  }, []);

  useEffect(() => {
    fetchData();

    fetchTimeRequest(FiltersHari({ onDay: Number(day) }));
  }, [day, kelas]);

  return (
    <>
      {jadwalPembelajaranLoading && (
        <LoadingDialog open={true} onClose={() => {}} />
      )}
      <div>
        <h1 className="text-4xl font-bold mb-5">Jadwal Pembelajaran</h1>
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
              key={data.id}
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
        <TableJadwalPembelajaran onDay={day} onClass={kelas} />
      </div>
    </>
  );
};
export default JadwalPembelajaranBody;
