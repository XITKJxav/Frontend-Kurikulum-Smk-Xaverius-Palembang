import TabNavigation from "@components/TabNavigation";
import TabelProgramJurusan from "./TabelProgramJurusan";
import CreateJurusan from "./CreateJurusan";
import { FormProvider } from "react-hook-form";
import useCreateJurusanForm from "../Create/hook/useCreateProgramJurusanForm";

const JurusanBody = () => {
  const { jurusanreqForm } = useCreateJurusanForm();

  const listMenu = [
    {
      label: "Daftar Program Jurusan",
      partial: <TabelProgramJurusan />,
    },
    {
      label: "Tambah Program Jurusan",
      partial: (
        <FormProvider {...jurusanreqForm}>
          <CreateJurusan />
        </FormProvider>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <h1 className="mb-1 text-2xl font-extrabold uppercase">Manage Jurusan</h1>
      <TabNavigation listMenu={listMenu} />
    </div>
  );
};

export default JurusanBody;
