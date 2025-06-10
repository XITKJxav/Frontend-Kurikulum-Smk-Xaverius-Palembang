import { useEffect } from "react";
import { useSchedulePageContext } from "../context";
import useSchendule from "../hooks/useSchendule";
import { FiltersHari } from "../utils/filtersHari";

interface Props {
  onDay: string | number;
  idRuanganKelas: string;
}

const TableJadwalEkstrakurikuler = ({ onDay, idRuanganKelas }: Props) => {
  const { state } = useSchedulePageContext();
  const { ekstraReq } = state;
  const { fetchEkstrakurikuler } = useSchendule();

  useEffect(() => {
    fetchEkstrakurikuler(FiltersHari({ onDay, idRuanganKelas }));
  }, [onDay, idRuanganKelas]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full overflow-hidden border border-gray-200 shadow-md table-auto rounded-xl">
        <thead className="bg-[#261FB3] text-white">
          <tr>
            <th className="px-6 py-3 text-left">Hari</th>
            <th className="px-6 py-3 text-left">Jam</th>
            <th className="px-6 py-3 text-left">Kegiatan</th>
          </tr>
        </thead>
        <tbody>
          {ekstraReq?.map((item, index) => {
            return (
              <tr key={index} className="transition duration-200 border-b">
                <td className="px-6 py-4">{item.hari?.nama}</td>
                <td className="px-6 py-4 font-medium">
                  {item.jam_mulai_ekstra} - {item.jam_mulai_selesai}
                </td>
                <td className="px-6 py-4">{item.deskripsi}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TableJadwalEkstrakurikuler;
