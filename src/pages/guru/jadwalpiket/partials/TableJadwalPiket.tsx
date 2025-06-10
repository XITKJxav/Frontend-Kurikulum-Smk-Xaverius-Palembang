import { useJadwalPiketpageContext } from "../context";

interface Props {
  onClass: string;
  onDay: string;
}

const TableJadwalPiket = (props: Props) => {
  const { onDay, onClass } = props;
  const { state } = useJadwalPiketpageContext();
  const { timeReq, jadwalPiketReq } = state;

  return (
    <div className="flex justify-center item-center">
      <table className="lg:w-[70%] w-full rounded table-auto">
        <thead className="bg-[#261FB3] text-white">
          <tr>
            <th className="px-4 py-2">Waktu</th>
            <th className="px-4 py-2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {timeReq?.map((item, index) => {
            const jamMulai = item?.jam_mulai ?? "-";
            const jamSelesai = item?.jam_selesai ?? "-";
            const matchedSchedule = jadwalPiketReq?.find(
              (s) =>
                s.kd_jam_pembelajaran === item.id_jam &&
                s.id_ruangan_kelas === Number(onClass) &&
                s.id_hari === Number(onDay)
            );

            return (
              <tr key={index} className="border-b-2 border-indigo-500">
                <td className="px-4 py-2 border-b-1">
                  {jamMulai} - {jamSelesai}
                </td>
                <td className="px-4 py-2  border-b-1">
                  <p className="text-center">
                    {item.type != "pembelajaran" && item.type}
                  </p>
                  {item.type == "pembelajaran" &&
                    matchedSchedule?.guru_piket && (
                      <div className="bg-blue-100 text-blue-900 rounded-xl shadow p-4 w-full">
                        <div className="flex flex-col gap-2">
                          <span>
                            <strong className="text-blue-800 text-2xl">
                              {matchedSchedule?.mata_pelajaran?.nama ?? "-"}
                            </strong>
                          </span>
                          <span>
                            <strong className="text-blue-800 text-sm">
                              Guru Mapel:
                            </strong>
                            {matchedSchedule?.pengajar?.name ?? "-"}
                          </span>
                        </div>
                      </div>
                    )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableJadwalPiket;
