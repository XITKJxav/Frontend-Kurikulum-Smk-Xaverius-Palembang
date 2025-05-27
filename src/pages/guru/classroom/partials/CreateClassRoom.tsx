import { ActionButton } from "@components/Button";
import { Controller, useFormContext } from "react-hook-form";
import useClassRoom from "../Create/hook/useClassRoom";
import { useClassroompageContext } from "../context";
import InputAutocomplete from "@components/Input/InputAutoComplate";

const CreateClassRoom = () => {
  const { control } = useFormContext();
  const { handleSubmitForm } = useClassRoom();
  const { state } = useClassroompageContext();
  const { jurusanRequest, waliKelasRequest } = state;

  const romanOptions = [
    { value: "X", label: "10" },
    { value: "XI", label: "11" },
    { value: "XII", label: "12" },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[60%]">
        <div className="flex flex-col mt-3 mb-3">
          <Controller
            name="nomor_ruangan"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputAutocomplete
                field={field}
                fieldState={fieldState}
                label="Pilih Nomor Ruangan"
                id="nomor_kelas"
                data={romanOptions.map((item) => ({
                  id: item.value,
                  label: item.label,
                }))}
                size="small"
              />
            )}
          />
        </div>

        <div className="flex flex-col mt-3 mb-3">
          <Controller
            name="kd_jurusan"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputAutocomplete
                field={field}
                fieldState={fieldState}
                label="Pilih Jurusan"
                id="kd_jurusan"
                data={jurusanRequest.map((item) => ({
                  id: item.kd_jurusan,
                  label: item.nama_jurusan,
                }))}
                size="small"
              />
            )}
          />
        </div>
        <div className="flex flex-col mt-3 mb-3">
          <Controller
            name="kd_wali_kelas"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputAutocomplete
                field={field}
                fieldState={fieldState}
                label="Pilih Wali Kelas"
                id="kd_wali_kelas"
                data={waliKelasRequest.map((item) => ({
                  id: item.kd_karyawan,
                  label: item.name,
                }))}
                size="small"
              />
            )}
          />
        </div>

        <ActionButton
          label="Submit"
          onClick={handleSubmitForm}
          color="primary"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CreateClassRoom;
