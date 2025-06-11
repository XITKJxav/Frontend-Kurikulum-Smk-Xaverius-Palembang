import { ActionButton } from "@components/Button";
import useGenerateJadwal from "../GenerateJadwal/hook/useGenerateJadwal";
import { Controller, useFormContext } from "react-hook-form";
import InputAutocomplete from "@components/Input/InputAutoComplate";
import { useJadwalpageContext } from "../context";
import { LoadingDialog } from "@components/Dialog";

interface Props {
  id_kelas: number;
  id_hari: number;
}

const GenerateJadwal = ({ id_kelas, id_hari }: Props) => {
  const { updateGenerateJadwalRequest } = useGenerateJadwal();
  const { control } = useFormContext();
  const { state } = useJadwalpageContext();
  const { schendulePageLoading, mataPelajaranreq, schenduleTimeRegulerReq } =
    state;
  return (
    <>
      {schendulePageLoading && <LoadingDialog open={true} onClose={() => {}} />}
      <Controller
        name="id_mata_pelajaran"
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <InputAutocomplete
            field={field}
            fieldState={fieldState}
            label="Mata Pelajaran"
            id="id_mata_pelajaran"
            allowClear={false}
            onSearch={false}
            data={mataPelajaranreq.map((item) => ({
              id: item?.id_mata_pelajaran,
              label: item?.nama,
            }))}
            size="small"
          />
        )}
      />
      {id_hari}
      <ActionButton
        label="Open Class"
        color="primary"
        className="font-medium text-white me-auto"
        onClick={updateGenerateJadwalRequest}
      />
    </>
  );
};
export default GenerateJadwal;
