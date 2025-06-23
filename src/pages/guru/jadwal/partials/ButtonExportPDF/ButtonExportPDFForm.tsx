import { FormProvider } from "react-hook-form";
import ButtonExportPDF from "./ButtonExportPDF";
import useDownloadJadwalPembelajaranPDFForm from "../../ExportPDF/hook/useExportPembelajarranPDFForm";

interface Props {
  onClass: string | number;
}
const ButtonExportPDFForm = ({ onClass }: Props) => {
  const { downloadJadwalPembelajaranreqForm } =
    useDownloadJadwalPembelajaranPDFForm();

  return (
    <div className="w-full">
      <FormProvider {...downloadJadwalPembelajaranreqForm}>
        <ButtonExportPDF onClass={Number(onClass)} />
      </FormProvider>
    </div>
  );
};
export default ButtonExportPDFForm;
