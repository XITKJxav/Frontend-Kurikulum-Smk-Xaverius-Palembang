import { useSchedulePageContext } from "../context";

const TableJadwalEkstrakurikuler = () => {
  const { state } = useSchedulePageContext();
  const data = [
    { jam: "15:10:00 - 17:00:00", kegiatan: "Pramuka" },
    { jam: "17:00:00 - 18:20:00", kegiatan: "Ekstra Wajib" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full overflow-hidden border border-gray-200 shadow-md table-auto rounded-xl">
        <thead className="bg-[#261FB3] text-white">
          <tr>
            <th className="px-6 py-3 text-left">Jam</th>
            <th className="px-6 py-3 text-left">Kegiatan</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="transition duration-200 border-b">
              <td className="px-6 py-4 font-medium text-white">{item.jam}</td>
              <td className="px-6 py-4 text-white">{item.kegiatan}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableJadwalEkstrakurikuler;
