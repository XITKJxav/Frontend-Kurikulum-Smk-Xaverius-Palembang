import { useSchedulePageContext } from "@pages/siswa/SchedulePage/context";
import useSchendule from "./../hooks/useSchendule";
import { useCallback, useEffect, useState } from "react";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

const Body = () => {
  const { fetchDayRequest, fetchTimeRegulerRequest } = useSchendule();
  const { state } = useSchedulePageContext();
  const { schenduleTimeRegulerReq, schenduleDayReq } = state;

  const [day, setDay] = useState<number | string>("");

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

  const fetchData = useCallback(() => {
    fetchTimeRegulerRequest();
    fetchDayRequest();
  }, [fetchDayRequest, fetchTimeRegulerRequest]);

  useEffect(() => {
    fetchData();
  }, []);

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

      <table className="w-[70%] rounded table-auto">
        <thead className="bg-[#261FB3] text-white">
          <tr>
            <th className="px-4 py-2">Waktu</th>
            <th className="px-4 py-2">Mata Pelajaran</th>
          </tr>
        </thead>
        <tbody>
          {schenduleTimeRegulerReq?.map((item, index) => {
            const jamMulai = item?.jam_mulai ?? "-";
            const jamSelesai = item?.jam_selesai ?? "-";

            return (
              <tr key={index} className="border-b-2 border-indigo-500">
                <td className="px-4 py-2 border-b-1">
                  {jamMulai} - {jamSelesai}
                </td>
                <td className="px-4 py-2 text-center border-b-1">
                  {item.type == "istirahat" && "ISTIRAHAT"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Body;
