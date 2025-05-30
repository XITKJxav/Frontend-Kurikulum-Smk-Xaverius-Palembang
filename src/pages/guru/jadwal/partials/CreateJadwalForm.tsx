import { ActionButton } from "@components/Button";
import { useFormContext } from "react-hook-form";
import useCreateSchendule from "../CreateSchendule/hook/useSchendule";
import { useCallback } from "react";

interface Props {
  id_ruangan_kelas: string;
}
const CreateJadwalForm = (props: Props) => {
  const { id_ruangan_kelas } = props;
  const { setValue } = useFormContext();
  const { handleSubmitForm } = useCreateSchendule();
  const handleSubmit = useCallback(async () => {
    setValue("id_ruangan_kelas", id_ruangan_kelas);
    await handleSubmitForm();
  }, []);
  return (
    <>
      <ActionButton
        label="Create Jadwal"
        color="primary"
        className="font-medium text-white me-auto"
        onClick={handleSubmit}
      />
    </>
  );
};
export default CreateJadwalForm;
