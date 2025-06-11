import { FormProvider } from "react-hook-form";
import CreateClassRoom from "./CreateClassRoom";
import TabelClassRoom from "./TabelClassRoom";
import useCreateClassRoomForm from "../Create/hook/useCreateClassRoomForm";
import TabNavigation from "@components/TabNavigation";

const ClassRoomBody = () => {
  const { classroomreqForm } = useCreateClassRoomForm();
  const listMenu = [
    {
      label: "Daftar Ruang Kelas",
      partial: <TabelClassRoom />,
    },
    {
      label: "Tambah Ruang Kelas",
      partial: (
        <FormProvider {...classroomreqForm}>
          <CreateClassRoom />
        </FormProvider>
      ),
    },
  ];
  return (
    <div className="w-full overflow-x-auto">
      <h1 className="mb-1 text-2xl font-extrabold uppercase">Ruang Kelas</h1>
      <TabNavigation listMenu={listMenu} />
    </div>
  );
};
export default ClassRoomBody;
