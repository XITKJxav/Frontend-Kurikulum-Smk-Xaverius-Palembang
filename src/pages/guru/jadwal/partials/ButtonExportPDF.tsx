import { useFormContext } from "react-hook-form";
import useExportPembelajaranPDF from "../ExportPDF/hook/useExportPembelajarranForm";
import { useEffect } from "react";
import { PictureAsPdfSharp } from "@mui/icons-material";
interface Props {
  id_kelas: number;
}
const ButtonExportPDF = ({ id_kelas }: Props) => {
  const { exportPembelajaranPDF } = useExportPembelajaranPDF();
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue("id_ruangan_kelas", id_kelas);
  }, [id_kelas, setValue]);

  return (
    <div className="mt-3 mb-3 ms-auto w-[10rem]">
      <button
        onClick={() => exportPembelajaranPDF()}
        className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-800"
      >
        <PictureAsPdfSharp /> Export PDF
      </button>
    </div>
  );
};
export default ButtonExportPDF;
