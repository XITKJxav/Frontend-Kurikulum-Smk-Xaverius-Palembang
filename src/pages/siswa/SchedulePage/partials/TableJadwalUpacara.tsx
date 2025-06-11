import { useEffect } from "react";
import { useSchedulePageContext } from "../context";
import { siswaSignInResponseRequestModel } from "@api/authentication/model";
import useSchendule from "../hooks/useSchendule";

interface Props {
  onUser: siswaSignInResponseRequestModel;
  onDay: string | number;
}

const TableJadwalUpacara = (props: Props) => {
  const { onUser, onDay } = props;
  const { state } = useSchedulePageContext();
  const { schenduleTimeUpacaraReq, schenduleIdreq } = state;
  const { fetchJamUpacara } = useSchendule();

  useEffect(() => {
    fetchJamUpacara(onDay);
  }, [onDay]);

  return (
    <table className="w-full border-collapse rounded table-auto ">
      <thead className="bg-[#261FB3] text-white">
        <tr>
          <td colSpan={2} className="py-2 font-semibold text-center">
            {schenduleTimeUpacaraReq?.tanggal_upacara ?? "Tidak ada upacara"}
          </td>
        </tr>
        <tr>
          <th className="px-4 py-2 text-left">Waktu</th>
          <th className="px-4 py-2 text-left">Keterangan</th>
        </tr>
      </thead>
      <tbody>
        {schenduleTimeUpacaraReq.ada_upacara &&
          schenduleTimeUpacaraReq?.jadwal?.map((item, index) => {
            const jamMulai = item?.jam_mulai ?? "-";
            const jamSelesai = item?.jam_selesai ?? "-";

            const matchedSchedule = schenduleIdreq.find(
              (s) =>
                s.kd_jam_pembelajaran === item.id_jam &&
                s.id_ruangan_kelas === Number(onUser.id_ruang_kelas) &&
                s.id_hari === Number(onDay)
            );

            return (
              <tr key={index} className="border-b border-indigo-500">
                <td className="px-4 py-2">
                  {jamMulai} - {jamSelesai}
                </td>
                <td className="px-4 py-2">
                  {item?.type !== "pembelajaran" ? (
                    <p className="text-center capitalize">{item?.type}</p>
                  ) : (
                    <div className="flex flex-col gap-1">
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
                  )}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default TableJadwalUpacara;
