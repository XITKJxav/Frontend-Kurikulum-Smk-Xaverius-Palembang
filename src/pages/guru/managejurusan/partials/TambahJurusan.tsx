import { ActionButton } from "@components/Button";
import { Controller, useFormContext } from "react-hook-form";
import useCreateProgramJurusanForm from "../Create/hook/useCreateProgramJurusan";
import clsx from "clsx";

const TambahJurusan = () => {
  const { control } = useFormContext();
  const { handleSubmitForm } = useCreateProgramJurusanForm();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[60%]">
        <div className="mt-3 mb-3 flex flex-col">
          <label htmlFor="">Nama Jurusan</label>
          <Controller
            name="nama_jurusan"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <>
                <input
                  type="text"
                  {...field}
                  onChange={(e) => field.onChange(e)}
                  className={clsx(
                    `border text-black p-2 w-full rounded-lg`,
                    fieldState.error && "border-red-500"
                  )}
                  autoComplete="off"
                  placeholder="nama Jurusan..."
                />
                <div className="text-red-500 text-sm mt-1">
                  {fieldState.error?.message}
                </div>
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
export default TambahJurusan;
