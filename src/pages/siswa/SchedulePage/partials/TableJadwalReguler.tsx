import { useSchedulePageContext } from "../context";
import { siswaSignInResponseRequestModel } from "@api/authentication/model";

interface Props {
  onUser: siswaSignInResponseRequestModel;
  onDay: string | number;
}
const TableJadwalReguler = (props: Props) => {
  const { onUser, onDay } = props;
  const { state } = useSchedulePageContext();
  const { schenduleTimeRegulerReq, schenduleIdreq } = state;

  return (
    <table className="w-[100%] rounded table-auto">
      <thead className="bg-[#261FB3] text-white">
        <tr>
          <th className="px-4 py-2">Waktu</th>
          <th className="px-4 py-2">Keterangan</th>
        </tr>
      </thead>
      <tbody>
        {schenduleTimeRegulerReq?.map((item, index) => {
          const jamMulai = item?.jam_mulai ?? "-";
          const jamSelesai = item?.jam_selesai ?? "-";
          const matchedSchedule = schenduleIdreq.find(
            (s) =>
              s.kd_jam_pembelajaran === item.id_jam &&
              s.id_ruangan_kelas === Number(onUser.id_ruang_kelas) &&
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
                {item.type == "pembelajaran" && (
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
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default TableJadwalReguler;
