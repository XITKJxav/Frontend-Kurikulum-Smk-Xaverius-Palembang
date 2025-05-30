import { useEffect, useState } from "react";

interface AgendaUpacara {
  id: number;
  tanggal_upacara: string; // Format: "2025-06-01"
  status: string;
}

// Array nama hari dan bulan dalam bahasa Indonesia
const hariIndonesia = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const bulanIndonesia = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const formatTanggal = (tanggalStr: string) => {
  const date = new Date(tanggalStr);
  const hari = hariIndonesia[date.getDay()];
  const tanggal = date.getDate();
  const bulan = bulanIndonesia[date.getMonth()];
  const tahun = date.getFullYear();

  return { hari, tanggal, bulan, tahun };
};

const AgendaUpacaraList = () => {
  const [data, setData] = useState<AgendaUpacara[]>([]);

  useEffect(() => {
    const fetchAgenda = async () => {
      const result: AgendaUpacara[] = [
        { id: 1, tanggal_upacara: "2025-06-01", status: "Pending" },
      ];
      setData(result);
    };

    fetchAgenda();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      {data.map((item) => {
        const { hari, tanggal, bulan, tahun } = formatTanggal(
          item.tanggal_upacara
        );

        return (
          <div
            key={item.id}
            className="flex justify-between items-center border-b py-2"
          >
            <div>
              <p className="font-semibold">{hari}</p>
              <p className="text-sm text-gray-600">
                {tanggal} {bulan} {tahun}
              </p>
            </div>
            <span
              className={`px-2 py-1 rounded text-white text-xs font-medium ${
                item.status === "Pending"
                  ? "bg-yellow-500"
                  : item.status === "Completed"
                  ? "bg-green-600"
                  : "bg-gray-500"
              }`}
            >
              {item.status}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default AgendaUpacaraList;
