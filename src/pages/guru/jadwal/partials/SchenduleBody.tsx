import { FormProvider } from "react-hook-form";
import { useJadwalpageContext } from "../context";
import useSchenduleForm from "../CreateSchendule/hook/useSchenduleForm";
import { useCallback, useEffect, useState } from "react";
import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { FiltersHari } from "../List/utils/filtersJadwal";
import useSchendule from "../List/hook/useSchendule";
import CreateJadwalForm from "./CreateJadwalForm";
import TableSchendule from "./TableSchendule";
import { LoadingDialog } from "@components/Dialog";
import TahunAjaranForm from "./TahunAjaranForm";
import useTahunAjaranUpdateReqForm from "../UpdateTahunAjaran/hook/useUpdateTahunAjaranForm";
import useDownloadJadwalPembelajaranForm from "../ExportPDF/hook/useExportPembelajarranPDF";
import ButtonExportPDF from "./ButtonExportPDF";
import useGenerateJadwalUpdateReqForm from "../GenerateJadwal/hook/useGenerateJadwalForm";
import GenerateJadwal from "./GenerateJadwal";

const SchenduleBody = () => {
  const { state } = useJadwalpageContext();
  const { createJadwalreqForm } = useSchenduleForm();
  const {
    schendulePageLoading,
    schenduleDayReq,
    classRoomRequest,
    schendulereq,
  } = state;

  const {
    fetchJadwal,
    fetchDayRequest,
    fetchClassRoom,
    fetchTimeRegulerRequest,
  } = useSchendule();

  const [day, setDay] = useState<string>("1");
  const [kelas, setKelas] = useState<string>("1");
  const { updateTahunAjaranreqForm } = useTahunAjaranUpdateReqForm();
  const handleChangeDay = useCallback((event: SelectChangeEvent<string>) => {
    setDay(event.target.value);
  }, []);
  const handleChangeClass = useCallback((event: SelectChangeEvent<string>) => {
    setKelas(event.target.value);
  }, []);
  const { downloadJadwalPembelajaranreqForm } =
    useDownloadJadwalPembelajaranForm();
  const { generateJadwalreqForm } = useGenerateJadwalUpdateReqForm();

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
      {schendulePageLoading && <LoadingDialog open={true} onClose={() => {}} />}
      <h1>Rancang Jadwal</h1>
      {schendulereq.length > 0 && (
        <FormProvider {...updateTahunAjaranreqForm}>
          <TahunAjaranForm />
        </FormProvider>
      )}
      {schendulereq.length > 0 && (
        <div className="w-full">
          <FormProvider {...downloadJadwalPembelajaranreqForm}>
            <ButtonExportPDF id_kelas={Number(kelas)} />
          </FormProvider>
        </div>
      )}

      <div className="flex w-full gap-3 mb-4">
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
                <MenuItem key={data?.id} value={String(data?.id)}>
                  {data?.nama_ruangan}
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

      {schenduleDayReq.length > 0 && (
        <FormProvider {...generateJadwalreqForm}>
          <GenerateJadwal onDay={Number(day)} onClass={Number(kelas)} />
        </FormProvider>
      )}

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
