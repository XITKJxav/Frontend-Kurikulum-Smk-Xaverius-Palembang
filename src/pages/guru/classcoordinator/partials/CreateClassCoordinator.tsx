import { ActionButton } from "@components/Button";
import { Controller, useFormContext } from "react-hook-form";
import { useClassCoordinatorPageContext } from "../context";
import useClassCoordinator from "../Create/hook/useClassCoordinator";
import InputTextField from "@components/Input/InputText";
import InputAutocomplete from "@components/Input/InputAutoComplate";

const CreateClassCoordinator = () => {
  const { control } = useFormContext();
  const { handleSubmitForm } = useClassCoordinator();
  const { state } = useClassCoordinatorPageContext();
  const { classRoomRequest } = state;

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="w-[60%] space-y-4 mt-4">
        <Controller
          name="nisn"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <InputTextField
              field={field}
              fieldState={fieldState}
              label="nisn"
              id="nisn"
              autoComplete="nisn"
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
              label="name"
              id="name"
              autoComplete="name"
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <InputTextField
              field={field}
              fieldState={fieldState}
              label="email"
              id="email"
              autoComplete="email"
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
              label="No Telepon"
              id="no_telp"
              autoComplete="tel"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <InputTextField
              field={field}
              fieldState={fieldState}
              label="Password"
              id="password"
              type="password"
              autoComplete="new-password"
            />
          )}
        />

        <Controller
          name="password_confirmation"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <InputTextField
              field={field}
              fieldState={fieldState}
              label="Konfirmasi Password"
              id="password_confirmation"
              type="password"
              autoComplete="new-password"
            />
          )}
        />

        <Controller
          name="id_ruang_kelas"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <InputAutocomplete
              field={field}
              fieldState={fieldState}
              label="Pilih Ruangan"
              id="id_ruang_kelas"
              allowClear={false}
              onSearch={false}
              data={classRoomRequest?.map((item) => ({
                id: item?.id,
                label: item?.nama_ruangan,
              }))}
            />
          )}
        />

        <ActionButton
          label="Submit"
          onClick={handleSubmitForm}
          color="primary"
          className="w-full"
        />
      </form>
    </div>
  );
};

export default CreateClassCoordinator;
