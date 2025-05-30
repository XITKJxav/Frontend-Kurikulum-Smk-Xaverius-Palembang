import TabNavigation from "@components/TabNavigation";
import { FormProvider } from "react-hook-form";
import TabelAgendaUpacara from "./TabelAgendaUpacara";
import CreateAgendaUpacara from "./CreateAgendaUpacara";
import useCreateAgendaUpacaraForm from "../Create/hook/useCreateAgendaUpacaraForm";

const AgendaUpacaraBody = () => {
  const { agendaUpacarareqForm } = useCreateAgendaUpacaraForm();

  const listMenu = [
    {
      label: "Agenda Upacara",
      partial: <TabelAgendaUpacara />,
    },
    {
      label: "Tambah Agenda Upacara",
      partial: (
        <FormProvider {...agendaUpacarareqForm}>
          <CreateAgendaUpacara />
        </FormProvider>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <h1 className="mb-1 text-2xl font-extrabold uppercase">Agenda Upacara</h1>
      <TabNavigation listMenu={listMenu} />
    </div>
  );
};

export default AgendaUpacaraBody;
