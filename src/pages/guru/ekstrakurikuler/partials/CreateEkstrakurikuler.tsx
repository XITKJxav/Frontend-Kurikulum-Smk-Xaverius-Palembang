import { ActionButton } from "@components/Button";
import { Controller, useFormContext } from "react-hook-form";
import InputTextField from "@components/Input/InputText";
import { LoadingDialog } from "@components/Dialog";
import { useEkstrakurikulerpageContext } from "../context";
import useCreateEkstrakurikuler from "../Create/hook/useCreateEkstrakurikuler";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const CreateEkstrakurikuler = () => {
  const { control } = useFormContext();
  const { handleSubmitForm } = useCreateEkstrakurikuler();
  const { state } = useEkstrakurikulerpageContext();
  const { dayRequest } = state;
  return (
    <div className="flex flex-col items-center justify-center">
      {state.ekstrakurikulerLoading && (
        <LoadingDialog open={state.ekstrakurikulerLoading} onClose={() => {}} />
      )}
      <div className="w-[60%]">
        <form>
          <div className="flex flex-col gap-3 mt-3 mb-3">
            <Controller
              name="id_hari"
              control={control}
              defaultValue={1}
              render={({ field, fieldState }) => (
                <FormControl
                  fullWidth
                  error={!!fieldState.error}
                  variant="outlined"
                >
                  <InputLabel id="durasi-label">Durasi Pembelajaran</InputLabel>
                  <Select
                    {...field}
                    labelId="durasi-label"
                    label="Durasi Pembelajaran"
                    size="medium"
                  >
                    {dayRequest.map((item) => (
                      <MenuItem value={item.id}>{item.nama}</MenuItem>
                    ))}
                  </Select>
                  {fieldState.error && (
                    <FormHelperText>{fieldState.error.message}</FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Controller
              name="jam_mulai_ekstra"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputTextField
                  field={field}
                  fieldState={fieldState}
                  label="Jam Mulai Ekstra"
                  id="jam_mulai_ekstra"
                  type="time"
                  autoComplete="off"
                />
              )}
            />

            <Controller
              name="jam_mulai_selesai"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputTextField
                  field={field}
                  fieldState={fieldState}
                  label="Jam Selesai Ekstra"
                  id="jam_mulai_selesai"
                  type="time"
                  autoComplete="off"
                />
              )}
            />

            <Controller
              name="deskripsi"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputTextField
                  field={field}
                  fieldState={fieldState}
                  label="Deskripsi"
                  id="deskripsi"
                  type="text"
                  autoComplete="off"
                />
              )}
            />

            <ActionButton
              onClick={() => handleSubmitForm()}
              label="Submit"
              color="primary"
              className="w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEkstrakurikuler;
