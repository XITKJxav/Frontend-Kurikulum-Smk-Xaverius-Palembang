import TabNavigation from "@components/TabNavigation";
import { FormProvider } from "react-hook-form";
import useCreateMataPelajaranForm from "../Create/hook/useCreateMataPelajaranForm";
import TabelMataPelajaran from "./TabelMataPelajaran";
import CreateMataPelajaran from "./CreateMataPelajaran";
import { useMataPelajaranpageContext } from "../context";
import { LoadingDialog } from "@components/Dialog";

const MataPelajaranBody = () => {
  const { mataPelajaranreqForm } = useCreateMataPelajaranForm();
  const { state } = useMataPelajaranpageContext();
  const listMenu = [
    {
      label: "Daftar Mata Pelajaran",
      partial: <TabelMataPelajaran />,
    },
    {
      label: "Tambah Mata Pelajaran",
      partial: (
        <FormProvider {...mataPelajaranreqForm}>
          <CreateMataPelajaran />
        </FormProvider>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      {state?.mataPelajaranLoading && (
        <LoadingDialog open={true} onClose={() => {}} />
      )}
      <h1 className="mb-1 text-2xl font-extrabold uppercase">Mata Pelajaran</h1>
      <TabNavigation listMenu={listMenu} />
    </div>
  );
};

export default MataPelajaranBody;
