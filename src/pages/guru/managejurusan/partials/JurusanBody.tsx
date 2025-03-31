import TabNavigation from "@components/TabNavigation";
import TableJurusan from "./Table";
import TambahJurusan from "./TambahJurusan";
import { FormProvider } from "react-hook-form";
import useCreateJurusanForm from "../Create/hook/useCreateProgramJurusanForm";

const JurusanBody = () => {
  const { jurusanreqForm } = useCreateJurusanForm();

  const listMenu = [
    {
      label: "Program Jurusan",
      partial: <TableJurusan />,
    },
    {
      label: "Tambah Jurusan",
      partial: (
        <FormProvider {...jurusanreqForm}>
          <TambahJurusan />
        </FormProvider>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <h1 className="text-2xl font-extrabold uppercase mb-1">Manage Jurusan</h1>
      <TabNavigation listMenu={listMenu} />
    </div>
  );
};

export default JurusanBody;
