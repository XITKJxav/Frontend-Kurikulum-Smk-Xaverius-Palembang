import { ActionButton } from "@components/Button";
import useGenerateJadwal from "../GenerateJadwal/hook/useGenerateJadwal";
import { Controller, useFormContext } from "react-hook-form";
import InputAutocomplete from "@components/Input/InputAutoComplate";
import { useJadwalpageContext } from "../context";
import { LoadingDialog } from "@components/Dialog";
import { useEffect } from "react";
import { Autocomplete, TextField, MenuItem, Select } from "@mui/material";

interface Props {
  onClass: number;
  onDay: number;
}

const GenerateJadwal = ({ onDay, onClass }: Props) => {
  const { updateGenerateJadwalRequest } = useGenerateJadwal();
  const { control, setValue } = useFormContext();
  const { state } = useJadwalpageContext();
  const {
    schendulePageLoading,
    mataPelajaranreq,
    karyawanreq,
    schenduleTimeRegulerReq,
  } = state;

  useEffect(() => {
    setValue("id_ruangan_kelas", onClass);
    setValue("id_hari", onDay);
  }, [onClass, onDay, setValue]);

  return (
    <div className="flex flex-wrap gap-3">
      {schendulePageLoading && <LoadingDialog open={true} onClose={() => {}} />}

      <Controller
        name="id_mata_pelajaran"
        control={control}
        defaultValue={0}
        render={({ field, fieldState }) => (
          <InputAutocomplete
            field={field}
            fieldState={fieldState}
            label="Mata Pelajaran"
            id="id_mata_pelajaran"
            allowClear={false}
            onSearch={false}
            data={mataPelajaranreq.map((item) => ({
              id: item?.id_mata_pelajaran,
              label: item?.nama,
            }))}
            size="small"
          />
        )}
      />

      <Controller
        name="id_pengajar"
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <Autocomplete
            value={
              karyawanreq.find((item) => item.kd_karyawan === field.value) ||
              null
            }
            onChange={(_, newValue) => {
              field.onChange(newValue?.kd_karyawan || "");
            }}
            options={karyawanreq}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) =>
              option.kd_karyawan === value.kd_karyawan
            }
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Pengajar"
                size="medium"
              />
            )}
          />
        )}
      />

      <Controller
        name="kd_guru_piket"
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <Autocomplete
            value={
              karyawanreq.find((item) => item.kd_karyawan === field.value) ||
              null
            }
            onChange={(_, newValue) => {
              field.onChange(newValue?.kd_karyawan || "");
            }}
            options={karyawanreq}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) =>
              option.kd_karyawan === value.kd_karyawan
            }
            renderOption={(props, option) => (
              <li {...props} key={`${option.kd_karyawan}-${option.name}`}>
                {option.name}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                label="Guru Piket"
                size="medium"
              />
            )}
          />
        )}
      />

      <Controller
        name="id_jam_awal"
        control={control}
        defaultValue={0}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            value={field.value}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            onChange={(e) => field.onChange(Number(e.target.value))}
          >
            <MenuItem value="">Pilih</MenuItem>
            {schenduleTimeRegulerReq.map((jam) => (
              <MenuItem key={jam.jam_ke} value={jam.jam_ke}>
                {jam.jam_ke}
              </MenuItem>
            ))}
          </Select>
        )}
      />

      <Controller
        name="id_jam_akhir"
        control={control}
        defaultValue={0}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            label="Jam Akhir"
            value={field?.value}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            size="small"
          >
            {schenduleTimeRegulerReq.map((jam) => (
              <MenuItem
                key={`${jam?.id_jam}_${jam?.jam_ke}_akhir`}
                value={String(jam?.jam_ke)}
              >
                {jam?.jam_ke}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <ActionButton
        label="Add"
        color="primary"
        className="font-medium text-white me-auto"
        onClick={() => updateGenerateJadwalRequest()}
      />
    </div>
  );
};

export default GenerateJadwal;
