import { FormProvider } from "react-hook-form";
import { useJadwalpageContext } from "../context";
import useSchenduleForm from "../CreateSchendule/hook/useSchenduleForm";
import { useCallback, useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material";
import { FiltersHari } from "../List/utils/filtersJadwal";
import useSchendule from "../List/hook/useSchendule";
import CreateJadwalForm from "./CreateJadwalForm";
import TableSchendule from "./TableSchendule";
import { LoadingDialog } from "@components/Dialog";
import TahunAjaranForm from "./TahunAjaranForm";
import useTahunAjaranUpdateReqForm from "../UpdateTahunAjaran/hook/useUpdateTahunAjaranForm";
import useAuthInterceptor from "@hooks/useAuthInterceptor";
import QuickEntrySchenduleForm from "./QuickEntrySchendule/QuickEntrySchenduleForm";
import ButtonExportPDFForm from "./ButtonExportPDF/ButtonExportPDFForm";
import SchenduleFiltersBody from "./ScheduleFilters/SchenduleFiltersBody";

const SchenduleBody = () => {
  useAuthInterceptor("karyawan");
  const { state } = useJadwalpageContext();
  const { createJadwalreqForm } = useSchenduleForm();
  const [day, setDay] = useState<string>("1");
  const [kelas, setKelas] = useState<string>("1");
  const { schendulePageLoading, schendulereq } = state;

  const {
    fetchJadwal,
    fetchDayRequest,
    fetchMataPelajaran,
    fetchClassRoom,
    fetchTimeRegulerRequest,
  } = useSchendule();

  const { updateTahunAjaranreqForm } = useTahunAjaranUpdateReqForm();

  const handleChangeDay = useCallback((event: SelectChangeEvent<string>) => {
    setDay(event.target.value);
  }, []);

  const handleChangeClass = useCallback((event: SelectChangeEvent<string>) => {
    setKelas(event.target.value);
  }, []);

  const fetchData = useCallback(() => {
    fetchJadwal();
    fetchTimeRegulerRequest(FiltersHari({ onDay: Number(day) }));
    fetchDayRequest();
    fetchClassRoom();
    fetchMataPelajaran();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const jadwalSudahAda = schendulereq.some(
    (jadwal) => jadwal.id_ruangan_kelas === Number(kelas)
  );

  return (
    <>
      <h1>Rancang Jadwal</h1>
      {schendulePageLoading && <LoadingDialog open={true} onClose={() => {}} />}
      {schendulereq.length > 0 && (
        <FormProvider {...updateTahunAjaranreqForm}>
          <TahunAjaranForm />
        </FormProvider>
      )}

      {schendulereq.length > 0 && <ButtonExportPDFForm onClass={kelas} />}
      <SchenduleFiltersBody
        onDay={day}
        onChangeClass={handleChangeClass}
        onChangeDay={handleChangeDay}
        onClass={kelas}
      />

      {schendulereq.length > 0 && (
        <QuickEntrySchenduleForm onDay={day} onClass={kelas} />
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
