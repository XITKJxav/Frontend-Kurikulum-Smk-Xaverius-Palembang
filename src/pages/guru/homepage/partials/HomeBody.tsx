import { useEffect, useState } from "react";
import AgendaUpacaraList from "./AgendaUpacaraList";

const HomeBody = () => {
  const [data, setData] = useState({
    siswa: 0,
    guru: 0,
    alumni: 0,
    kurikulum: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = {
        siswa: 1,
        guru: 1,
        kurikulum: 1,
        alumni: 1,
      };
      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Home</h1>
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <Card
          title="Jumlah Siswa"
          count={data.siswa}
          color="bg-gradient-to-r from-blue-600 to-blue-800"
        />
        <Card
          title="Jumlah Guru"
          count={data.guru}
          color="bg-gradient-to-r from-blue-600 to-blue-800"
        />
        <Card
          title="Jumlah Kurikulum"
          count={data.kurikulum}
          color="bg-gradient-to-r from-blue-600 to-blue-800"
        />
        <Card
          title="Jumlah Alumni"
          count={data.alumni}
          color="bg-gradient-to-r from-blue-600 to-blue-800"
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Agenda Upacara</h2>
      <AgendaUpacaraList />
    </div>
  );
};

const Card = ({
  title,
  count,
  color,
}: {
  title: string;
  count: number;
  color: string;
}) => {
  return (
    <div
      className={`${color} rounded-xl p-4 text-white shadow-lg w-[200px] flex flex-col items-center`}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{count}</p>
    </div>
  );
};

export default HomeBody;
