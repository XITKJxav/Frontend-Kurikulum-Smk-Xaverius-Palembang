import { useState, useCallback, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { Edit } from "@mui/icons-material";
import { useJadwalpageContext } from "../context";
import useSchendule from "../List/hook/useSchendule";
import { FiltersHari } from "../List/utils/filtersJadwal";
import CardUpdateJadwal from "./CardUpdateJadwal";
import useSchenduleUpdateReqForm from "../UpdateSchendule/hook/useSchenduleUpdateForm";

interface Props {
  onDay: string;
  onKelas: string;
}

const TableSchendule = ({ onDay, onKelas }: Props) => {
  const { state } = useJadwalpageContext();
  const { schenduleTimeRegulerReq, schendulereq } = state;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<{
    id_jam: number;
    id_hari: string;
    id_kelas: string;
  } | null>(null);

  const { updateJadwalreqForm } = useSchenduleUpdateReqForm();
  const { fetchTimeRegulerRequest, fetchKaryawan, fetchMataPelajaran } =
    useSchendule();

  const fetchData = useCallback(() => {
    fetchMataPelajaran();
    fetchKaryawan();
    fetchTimeRegulerRequest(FiltersHari({ onDay: Number(onDay) }));
  }, [onDay]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenDialog = (id_jam: number, id_hari: string) => {
    setSelectedSchedule({
      id_jam,
      id_hari,
      id_kelas: onKelas,
    });
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    setSelectedSchedule(null);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6">
      <table className="w-full rounded table-auto">
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
            const matchedSchedule = schendulereq.find(
              (s) =>
                s.kd_jam_pembelajaran === item.id_jam &&
                s.id_ruangan_kelas === Number(onKelas) &&
                s.id_hari === Number(onDay)
            );
            return (
              <tr key={index} className="border-b-2 border-indigo-500">
                <td className="px-4 py-2">
                  {jamMulai} - {jamSelesai}
                </td>
                <td className="px-4 py-2">
                  {item.type !== "pembelajaran" ? (
                    item.type
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col gap-3 flex-wrap">
                        <span>
                          <strong>Mata Pelajaran:</strong>{" "}
                          {matchedSchedule?.mata_pelajaran?.nama ?? "-"}
                        </span>
                        <span>
                          <strong>Pengajar:</strong>{" "}
                          {matchedSchedule?.pengajar?.name ?? "-"}
                        </span>
                        <span>
                          <strong>Guru Piket:</strong>{" "}
                          {matchedSchedule?.guru_piket?.name ?? "-"}
                        </span>
                      </div>

                      <button
                        className="p-2 font-semibold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
                        onClick={() => handleOpenDialog(item.id_jam, onDay)}
                      >
                        <Edit />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isOpen && selectedSchedule && (
        <FormProvider {...updateJadwalreqForm}>
          <CardUpdateJadwal
            isOpen={isOpen}
            onClose={handleCloseDialog}
            id_jam={selectedSchedule.id_jam}
            id_hari={selectedSchedule.id_hari}
            id_kelas={selectedSchedule.id_kelas}
          />
        </FormProvider>
      )}
    </div>
  );
};

export default TableSchendule;
