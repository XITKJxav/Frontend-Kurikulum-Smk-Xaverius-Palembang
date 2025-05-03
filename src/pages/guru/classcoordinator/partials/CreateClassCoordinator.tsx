import { ActionButton } from "@components/Button";
import { Controller, useFormContext } from "react-hook-form";
import { FormControl, MenuItem, TextField } from "@mui/material";
import ErrorMessage from "@components/ErrorMessage";
import { useClassCoordinatorPageContext } from "../context";
import useClassCoordinator from "../Create/hook/useClassCoordinator";

const CreateClassCoordinator = () => {
  const { control } = useFormContext();
  const { handleSubmitForm } = useClassCoordinator();
  const { state } = useClassCoordinatorPageContext();
  const { classRoomRequest } = state;

  return (
    <div className="flex flex-col items-center justify-center">
      <form className="w-[60%] space-y-4 mt-4">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <FormControl fullWidth size="small" error={!!fieldState.error}>
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Nama Lengkap"
                variant="outlined"
              />
              <ErrorMessage messageError={fieldState.error?.message} />
            </FormControl>
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <FormControl fullWidth size="small" error={!!fieldState.error}>
              <TextField
                {...field}
                fullWidth
                size="small"
                type="email"
                label="Email"
                autoComplete="email"
                variant="outlined"
              />
              <ErrorMessage messageError={fieldState.error?.message} />
            </FormControl>
          )}
        />

        <Controller
          name="no_telp"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <FormControl fullWidth size="small" error={!!fieldState.error}>
              <TextField
                {...field}
                fullWidth
                size="small"
                label="No Telepon"
                variant="outlined"
              />
              <ErrorMessage messageError={fieldState.error?.message} />
            </FormControl>
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <FormControl fullWidth size="small" error={!!fieldState.error}>
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Password"
                type="password"
                autoComplete="new-password"
                variant="outlined"
              />
              <ErrorMessage messageError={fieldState.error?.message} />
            </FormControl>
          )}
        />

        <Controller
          name="password_confirmation"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <FormControl fullWidth size="small" error={!!fieldState.error}>
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Konfirmasi Password"
                type="password"
                autoComplete="new-password"
                variant="outlined"
              />
              <ErrorMessage messageError={fieldState.error?.message} />
            </FormControl>
          )}
        />

        <Controller
          name="id_ruang_kelas"
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <FormControl fullWidth size="small" error={!!fieldState.error}>
              <TextField
                {...field}
                select
                label="Pilih Ruangan"
                value={field.value || ""}
                onChange={(e) => field.onChange(e.target.value)}
              >
                {classRoomRequest.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.nama_ruangan}
                  </MenuItem>
                ))}
              </TextField>
              <ErrorMessage messageError={fieldState.error?.message} />
            </FormControl>
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
