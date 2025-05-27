import { ActionButton } from "@components/Button";
import { Controller, useFormContext } from "react-hook-form";
import InputTextField from "@components/Input/InputText";
import { LoadingDialog } from "@components/Dialog";
import { useMataPelajaranpageContext } from "../context";
import useCreateMataPelajaran from "../Create/hook/useCreateMataPelajaran";

const CreateMataPelajaran = () => {
  const { control } = useFormContext();
  const { handleSubmitForm } = useCreateMataPelajaran();
  const { state } = useMataPelajaranpageContext();
  const { mataPelajaranLoading } = state;

  return (
    <div className="flex flex-col items-center justify-center">
      {mataPelajaranLoading && (
        <LoadingDialog open={mataPelajaranLoading} onClose={() => {}} />
      )}
      <div className="w-[60%]">
        <form>
          <div className="flex flex-col gap-3 mt-3 mb-3">
            <Controller
              name="nama"
              control={control}
              render={({ field, fieldState }) => (
                <InputTextField
                  field={field}
                  fieldState={fieldState}
                  label="Nama Mata Pelajaran"
                  id="nama_Mata_Pelajaran"
                  type="text"
                  autoComplete="off"
                />
              )}
            />

            <ActionButton
              onClick={() => handleSubmitForm()}
              label="submit"
              color="primary"
              className="w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateMataPelajaran;
