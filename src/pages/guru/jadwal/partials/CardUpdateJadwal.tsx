import { ActionButton } from "@components/Button";
import { BaseDialog, LoadingDialog } from "@components/Dialog";
import { Autocomplete, DialogContent, TextField } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import InputAutocomplete from "@components/Input/InputAutoComplate";
import { useJadwalpageContext } from "../context";
import useSchendule from "../List/hook/useSchendule";
import { FiltersHari } from "../List/utils/filtersJadwal";
import useSchenduleUpdate from "../UpdateSchendule/hook/useSchenduleUpdate";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  id_hari: string;
  id_jam: number;
  id_kelas: string;
}

const CardUpdateJadwal = ({
  isOpen,
  id_hari,
  id_jam,
  id_kelas,
  onClose,
}: Props) => {
  const { state, setState } = useJadwalpageContext();
  const { fetchByIdJadwal } = useSchendule();
  const { updateSchendule } = useSchenduleUpdate();
  const {
    mataPelajaranreq,
    karyawanreq,
    schendulePageLoading,
    schenduleIdreq,
  } = state;

  const { control, reset, setValue } = useFormContext();

  const fetchStatus = useRef<{ [key: string]: boolean }>({});
  const data = schenduleIdreq[0];

  const handleCloseDialog = () => {
    setState((prevState) => ({
      ...prevState,
      schenduleIdreq: [],
    }));
    reset();

    if (id_hari) fetchStatus.current[id_hari] = false;
    onClose();
  };
  const handleSubmit = useCallback((handleCloseDialog: () => void) => {
    setValue("id_hari", Number(id_hari));
    setValue("kd_jam_pembelajaran", Number(id_jam));
    setValue("id_ruangan_kelas", Number(id_kelas));
    updateSchendule();
    handleCloseDialog();
  }, []);

  useEffect(() => {
    fetchByIdJadwal(
      FiltersHari({
        onDay: Number(id_hari),
        idRuanganKelas: Number(id_kelas),
        kdJamPembelajaran: Number(id_jam),
      })
    );
  }, []);
  if (schendulePageLoading || !data) {
    return <LoadingDialog open={isOpen} onClose={onClose} />;
  }

  return (
    <BaseDialog
      open={isOpen}
      onClose={handleCloseDialog}
      title="Pengaturan Jadwal Pelajaran"
      message={
        "kode hari = " +
        id_hari +
        "kode jam = " +
        id_jam +
        "kode kelas = " +
        id_kelas
      }
    >
      <DialogContent>
        <form className="flex flex-col gap-3 mt-3 mb-3">
          <Controller
            name="id_mata_pelajaran"
            control={control}
            defaultValue={data?.id_mata_pelajaran}
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
            defaultValue={data?.id_pengajar || 1}
            render={({ field }) => (
              <Autocomplete
                value={
                  karyawanreq.find(
                    (item) => item.kd_karyawan === field.value
                  ) || null
                }
                onChange={(_, newValue) => {
                  field.onChange(newValue?.kd_karyawan || 1);
                }}
                options={karyawanreq}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) =>
                  option.kd_karyawan === value.kd_karyawan
                }
                renderInput={(params) => (
                  <TextField {...params} label="Pengajar" size="medium" />
                )}
              />
            )}
          />

          <Controller
            name="kd_guru_piket"
            control={control}
            defaultValue={data?.kd_guru_piket}
            render={({ field }) => (
              <Autocomplete
                {...field}
                value={
                  karyawanreq.find(
                    (item) => item.kd_karyawan === field.value
                  ) || null
                }
                onChange={(_, newValue) => {
                  field.onChange(newValue?.kd_karyawan || 1);
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
                  <TextField {...params} label="Guru Piket" size="medium" />
                )}
              />
            )}
          />

          <ActionButton
            label="Simpan Perubahan"
            onClick={() => handleSubmit(handleCloseDialog)}
            color="primary"
            className="w-full mt-4"
          />
        </form>
      </DialogContent>
    </BaseDialog>
  );
};

export default CardUpdateJadwal;
