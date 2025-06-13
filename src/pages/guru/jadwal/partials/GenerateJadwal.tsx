import { ActionButton } from "@components/Button";
import useGenerateJadwal from "../GenerateJadwal/hook/useGenerateJadwal";
import { Controller, useFormContext } from "react-hook-form";
import InputAutocomplete from "@components/Input/InputAutoComplate";
import { useJadwalpageContext } from "../context";
import { useEffect } from "react";
import { Autocomplete, TextField, MenuItem } from "@mui/material";

interface Props {
  onClass: number;
  onDay: number;
}

const GenerateJadwal = ({ onDay, onClass }: Props) => {
  const { updateGenerateJadwalRequest } = useGenerateJadwal();
  const { control, setValue } = useFormContext();
  const { state } = useJadwalpageContext();
  const { mataPelajaranreq, karyawanreq, schenduleTimeRegulerReq } = state;

  useEffect(() => {
    setValue("id_ruangan_kelas", onClass);
    setValue("id_hari", onDay);
  }, [onClass, onDay, setValue]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div>
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
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Controller
            name="id_pengajar"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Autocomplete
                value={
                  karyawanreq.find(
                    (item) => item.kd_karyawan === field.value
                  ) || null
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
                    size="small"
                    className="w-full"
                  />
                )}
              />
            )}
          />
        </div>

        <div className="flex-1">
          <Controller
            name="kd_guru_piket"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <Autocomplete
                value={
                  karyawanreq.find(
                    (item) => item.kd_karyawan === field.value
                  ) || null
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
                    label="Guru Piket"
                    size="small"
                    className="w-full"
                  />
                )}
              />
            )}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="w-[15rem]">
          <Controller
            name="id_jam_awal"
            control={control}
            defaultValue={0}
            render={({ field, fieldState }) => (
              <TextField
                select
                label="Jam Awal"
                size="small"
                {...field}
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                className="w-full"
              >
                <MenuItem value="">Pilih</MenuItem>
                {schenduleTimeRegulerReq.map((jam) => (
                  <MenuItem key={jam.jam_ke} value={jam.jam_ke}>
                    {jam.jam_ke}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>

        <div className="w-[15rem]">
          <Controller
            name="id_jam_akhir"
            control={control}
            defaultValue={0}
            render={({ field, fieldState }) => (
              <TextField
                select
                label="Jam Akhir"
                size="small"
                value={field.value}
                onChange={(e) => field.onChange(Number(e.target.value))}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                className="w-full"
              >
                <MenuItem value="">Pilih</MenuItem>
                {schenduleTimeRegulerReq.map((jam) => (
                  <MenuItem
                    key={`${jam?.id_jam}_${jam?.jam_ke}_akhir`}
                    value={jam.jam_ke}
                  >
                    {jam.jam_ke}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>

        <div className="self-end">
          <ActionButton
            label="Add"
            color="primary"
            className="font-medium text-white"
            onClick={() => updateGenerateJadwalRequest()}
          />
        </div>
      </div>
    </div>
  );
};

export default GenerateJadwal;
