import { ActionButton } from "@components/Button";
import { Controller, useFormContext } from "react-hook-form";
import useCreateProgramJurusanForm from "../Create/hook/useCreateProgramJurusan";
import InputTextField from "@components/Input/InputText";

const CreateJurusan = () => {
  const { control } = useFormContext();
  const { handleSubmitForm } = useCreateProgramJurusanForm();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[60%]">
        <div className="flex flex-col mt-3 mb-3">
          <Controller
            name="nama_jurusan"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputTextField
                field={field}
                fieldState={fieldState}
                label="Nama Jurusan"
                id="nama_jurusan"
                type="text"
                autoComplete="off"
              />
            )}
          />
        </div>
        <ActionButton
          label="submit"
          onClick={handleSubmitForm}
          color="primary"
          className="w-full"
        />
      </div>
    </div>
  );
};
export default CreateJurusan;
