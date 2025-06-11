import { FormProvider } from "react-hook-form";
import TabNavigation from "@components/TabNavigation";
import useCreateClassCoordinatorForm from "../Create/hook/useCreateClassCoordinatorForm";
import CreateClassCoordinator from "./CreateClassCoordinator";
import TabelClassCoordinator from "./TabelClassCoordinator";

const ClassCoordinatorBody = () => {
  const { classcoordinatorreqForm } = useCreateClassCoordinatorForm();
  const listMenu = [
    {
      label: "Daftar Siswa",
      partial: <TabelClassCoordinator />,
    },
    {
      label: "Register Siswa",
      partial: (
        <FormProvider {...classcoordinatorreqForm}>
          <CreateClassCoordinator />
        </FormProvider>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <h1 className="mb-1 text-2xl font-extrabold uppercase">Siswa</h1>
      <TabNavigation listMenu={listMenu} />
    </div>
  );
};
export default ClassCoordinatorBody;
