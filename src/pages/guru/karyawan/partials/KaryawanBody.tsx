import TabNavigation from "@components/TabNavigation";
import { FormProvider } from "react-hook-form";
import TabelKaryawan from "./TabelKaryawan";
import useCreateKaryawanForm from "../Create/hook/useCreateKaryawanForm";
import CreateKaryawan from "./CreateKaryawan";
import { usekaryawanpageContext } from "../context";
import { LoadingDialog } from "@components/Dialog";

const KaryawanBody = () => {
  const { karyawanreqForm } = useCreateKaryawanForm();
  const { state } = usekaryawanpageContext();
  const { KaryawanLoading } = state;
  const listMenu = [
    {
      label: "Daftar Karyawan",
      partial: <TabelKaryawan />,
    },
    {
      label: "Tambah Karyawan",
      partial: (
        <FormProvider {...karyawanreqForm}>
          <CreateKaryawan />
        </FormProvider>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      {KaryawanLoading && (
        <LoadingDialog open={KaryawanLoading} onClose={() => {}} />
      )}
      <h1 className="mb-1 text-2xl font-extrabold uppercase">Karyawan</h1>
      <TabNavigation listMenu={listMenu} />
    </div>
  );
};

export default KaryawanBody;
