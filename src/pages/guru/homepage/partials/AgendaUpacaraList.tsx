import { useEffect } from "react";
import { useHomepageContext } from "../context";
import useHomePage from "../hook/useHomePage";

const AgendaUpacaraList = () => {
  const { fetchAgendaUpacara } = useHomePage();
  const { state } = useHomepageContext();
  const { agendaUpacaraReq } = state;

  useEffect(() => {
    fetchAgendaUpacara("status=Pending");
  }, []);

  const getHari = (tanggal: string) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", { weekday: "long" });
  };

  const getTanggal = (tanggal: string) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {agendaUpacaraReq.map((item) => (
        <div
          key={item?.kd_agendaupacara ?? "-"}
          className="flex justify-between items-center border-b py-2"
        >
          <div>
            <p className="font-bold">{getHari(item?.tanggal_upacara)}</p>
            <p className="text-sm text-gray-600">
              {getTanggal(item?.tanggal_upacara)}
            </p>
          </div>
          <div className="h-full flex justify-center items-center">
            <span className="px-2 py-1 rounded text-white text-xs font-medium bg-yellow-500 h-fit">
              {item.status_agenda_upacara?.nama}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AgendaUpacaraList;
