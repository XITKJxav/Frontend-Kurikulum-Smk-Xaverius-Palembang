import useSchendule from "./../hooks/useSchendule";
import { useCallback, useEffect, useState } from "react";
import { FiltersJadwal } from "../utils/filterJadwal";
import { LocalStorage } from "@utils/localStorage";
import { siswaSignInResponseRequestModel } from "@api/authentication/model";

import TabNavigation from "@components/TabNavigation";
import TableJadwalReguler from "./TableJadwalReguler";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useSchedulePageContext } from "../context";
import TableJadwalUpacara from "./TableJadwalUpacara";
import TableJadwalEkstrakurikuler from "./TableJadwalEkstrakulikuler";

const Body = () => {
  const {
    fetchDayRequest,
    fetchTimeRegulerRequest,
    fetchByIdJadwal,
    fetchJamUpacara,
  } = useSchendule();
  const { state } = useSchedulePageContext();
  const { schenduleDayReq } = state;

  const [day, setDay] = useState<number | string>(1);
  const handleChangeDay = (event: SelectChangeEvent<string | number>) => {
    const selectedValue = Number(event.target.value);
    setDay(selectedValue);
  };
  const menuProps = {
    PaperProps: {
      sx: {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        color: "white",
      },
    },
  };
  const { getItem } = LocalStorage();
  const user: siswaSignInResponseRequestModel[] = getItem("userData") ?? [];
  const dataUser = user[0];

  const listMenu = [
    {
      label: "Jadwal Reguler",
      partial: <TableJadwalReguler onDay={day} onUser={dataUser} />,
    },
    {
      label: "Kegiatan Ekstrakurikuler",
      partial: <TableJadwalEkstrakurikuler />,
    },
    {
      label: "Jadwal Upacara",
      partial: <TableJadwalUpacara onDay={day} onUser={dataUser} />,
    },
  ];

  const fetchData = useCallback(() => {
    fetchTimeRegulerRequest(
      FiltersJadwal({
        onDay: day,
      })
    );
    fetchJamUpacara(day);
    fetchDayRequest();
    fetchByIdJadwal("");
  }, [fetchDayRequest, fetchTimeRegulerRequest]);

  useEffect(() => {
    fetchData();
  }, [day]);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full mb-4">
        <Select
          labelId="day-select-label"
          displayEmpty
          fullWidth
          value={day ? day.toString() : ""}
          onChange={handleChangeDay}
          variant="outlined"
          sx={{
            color: "white",
            backgroundColor: "transparent",
            "& fieldset": {
              borderColor: "#667eea",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
          }}
          MenuProps={menuProps}
        >
          <MenuItem value="" disabled sx={{ color: "white" }}>
            Pilih Hari
          </MenuItem>
          {schenduleDayReq?.map((data) => (
            <MenuItem
              key={data.id}
              value={data?.id}
              sx={{
                color: "white",
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
        <TabNavigation listMenu={listMenu} className="text-white" />
      </div>
    </div>
  );
};

export default Body;
