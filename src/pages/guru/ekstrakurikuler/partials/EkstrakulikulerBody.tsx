import TabNavigation from "@components/TabNavigation";
import { FormProvider } from "react-hook-form";
import TabelEkstrakurikuler from "./TabelEkstrakurikuler";
import useCreateEkstrakurikulerForm from "../Create/hook/useCreateEkstrakurikulerForm";
import CreateEkstrakurikuler from "./CreateEkstrakurikuler";
import useAuthInterceptor from "@hooks/useAuthInterceptor";

const EkstrakurikulerBody = () => {
  const { ekstrakurikulerareqForm } = useCreateEkstrakurikulerForm();
  useAuthInterceptor("karyawan");
  const listMenu = [
    {
      label: "Ekstrakurikuler",
      partial: <TabelEkstrakurikuler />,
    },
    {
      label: "Tambah Ekstrakurikuler",
      partial: (
        <FormProvider {...ekstrakurikulerareqForm}>
          <CreateEkstrakurikuler />
        </FormProvider>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <h1 className="mb-1 text-2xl font-extrabold uppercase">
        Ekstrakurikuler
      </h1>
      <TabNavigation listMenu={listMenu} />
    </div>
  );
};

export default EkstrakurikulerBody;
