import { ActionButton } from "@components/Button";
import { Controller, useFormContext } from "react-hook-form";
import useCreateProgramJurusanForm from "../Create/hook/useCreateProgramJurusan";
import clsx from "clsx";
import ErrorMessage from "@components/ErrorMessage";
import glassmorphism from "@utils/glassmorphism";
import { TextField } from "@mui/material";

const CreateJurusan = () => {
  const { control } = useFormContext();
  const { handleSubmitForm } = useCreateProgramJurusanForm();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[60%]">
        <div className="flex flex-col mt-3 mb-3">
          <label htmlFor="jurusan">Nama Jurusan</label>
          <Controller
            name="nama_jurusan"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <>
                <TextField
                  {...field}
                  id="jurusan"
                  label="Nama Jurusan"
                  variant="outlined"
                  size="small"
                  fullWidth
                  autoComplete="off"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  onChange={(e) => field.onChange(e.target.value)}
                  className={clsx(glassmorphism({ input: true }))}
                />
                <ErrorMessage messageError={fieldState.error?.message} />
              </>
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
