import { useFormContext } from "react-hook-form";
import useExportPembelajaranPDF from "../../ExportPDF/hook/useExportPembelajarranPDF";
import { useCallback } from "react";
import { PictureAsPdfSharp } from "@mui/icons-material";

interface Props {
  onClass: number;
}

const ButtonExportPDF = ({ onClass }: Props) => {
  const { exportPembelajaranPDF } = useExportPembelajaranPDF();
  const { setValue } = useFormContext();

  const handleSubmit = useCallback(async () => {
    setValue("id_ruangan_kelas", onClass);
    await exportPembelajaranPDF();
    console.log("onClass", onClass);
  }, [onClass]);

  return (
    <div className="mt-3 mb-3 ms-auto w-[10rem]">
      <button
        onClick={() => handleSubmit()}
        className="w-full px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-800"
      >
        <PictureAsPdfSharp /> Export PDF
      </button>
    </div>
  );
};
export default ButtonExportPDF;
