import { ActionButton } from "@components/Button";
import { Controller, useFormContext } from "react-hook-form";
import InputTextField from "@components/Input/InputText";
import useCreateKaryawan from "../Create/hook/useCreateKaryawan";
import InputSelect from "@components/Input/InputSelect";
import { usekaryawanpageContext } from "../context";

const CreateKaryawan = () => {
  const { control } = useFormContext();
  const { handleSubmitForm } = useCreateKaryawan();
  const { state } = usekaryawanpageContext();
  const { roleRequest } = state;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-[60%]">
        <form>
          <div className="flex flex-col gap-3 mt-3 mb-3">
            <Controller
              name="niy"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputTextField
                  field={field}
                  fieldState={fieldState}
                  label="NIY"
                  id="NIY"
                  type="text"
                  autoComplete="off"
                />
              )}
            />
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputTextField
                  field={field}
                  fieldState={fieldState}
                  label="Nama Karyawan"
                  id="nama_karyawan"
                  type="text"
                  autoComplete="off"
                />
              )}
            />
            <Controller
              name="email"
              defaultValue=""
              control={control}
              render={({ field, fieldState }) => (
                <InputTextField
                  field={field}
                  fieldState={fieldState}
                  label="Email Karyawan"
                  id="email_karyawan"
                  type="email"
                  autoComplete="off"
                />
              )}
            />
            <Controller
              name="password"
              defaultValue=""
              control={control}
              render={({ field, fieldState }) => (
                <InputTextField
                  field={field}
                  fieldState={fieldState}
                  label="Password..."
                  id="password_karyawan"
                  type="password"
                  autoComplete="off"
                />
              )}
            />
            <Controller
              name="password_confirmation"
              defaultValue=""
              control={control}
              render={({ field, fieldState }) => (
                <InputTextField
                  field={field}
                  fieldState={fieldState}
                  label="konfirmasi Password"
                  id="password_confirmed"
                  type="password"
                  autoComplete="off"
                />
              )}
            />
            <Controller
              name="no_telp"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputTextField
                  field={field}
                  fieldState={fieldState}
                  label="Nomor Telphone"
                  id="nomor_karyawan"
                  type="text"
                  autoComplete="off"
                />
              )}
            />
            <Controller
              name="id_role"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputSelect
                  field={field}
                  fieldState={fieldState}
                  label="Pilih Role"
                  id="id_ruang_kelas-native"
                  data={roleRequest?.map((item) => ({
                    id: item.id_role,
                    label: item.name,
                  }))}
                  size="small"
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
export default CreateKaryawan;
