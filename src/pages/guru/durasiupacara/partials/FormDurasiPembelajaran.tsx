import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import useUpdateDurasiPembelajaran from "../Update/hook/useUpdateDurasiPembelajaran";
import { ActionButton } from "@components/Button";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";

const FormDurasiPembelajaran = () => {
  const { control } = useFormContext();
  const { fetchDurasiPembelajaran, updateDurasiPembelajaran } =
    useUpdateDurasiPembelajaran();

  useEffect(() => {
    fetchDurasiPembelajaran();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-2 ">
      <div className="w-[50%]">
        <Controller
          name="duration_time_study"
          control={control}
          defaultValue={45}
          render={({ field, fieldState }) => (
            <FormControl
              fullWidth
              error={!!fieldState.error}
              sx={{ mb: 3 }}
              variant="outlined"
            >
              <InputLabel id="durasi-label">Durasi Pembelajaran</InputLabel>
              <Select
                {...field}
                labelId="durasi-label"
                label="Durasi Pembelajaran"
                size="small"
              >
                <MenuItem value={45}>Jam Reguler (45 menit)</MenuItem>
                <MenuItem value={35}>Jam Puasa (35 menit)</MenuItem>
              </Select>
              {fieldState.error && (
                <FormHelperText>{fieldState.error.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        <ActionButton
          label="Save"
          onClick={updateDurasiPembelajaran}
          color="primary"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default FormDurasiPembelajaran;
