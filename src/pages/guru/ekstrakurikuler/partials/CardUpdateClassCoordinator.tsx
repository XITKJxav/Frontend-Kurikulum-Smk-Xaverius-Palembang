import { ActionButton } from "@components/Button";
import { BaseDialog, LoadingDialog } from "@components/Dialog";
import {
  DialogContent,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useEkstrakurikulerpageContext } from "../context";
import { useFormContext, Controller } from "react-hook-form";
import InputTextField from "@components/Input/InputText";
import useUpdateEkstrakurikuler from "../Update/hook/useUpdateEkstrakurikuler";

interface Props {
  isOpen: boolean;
  idEkstra: number;
  onClose: () => void;
}

const CardUpdateEkstrakurikuler = ({ isOpen, idEkstra, onClose }: Props) => {
  const { state, setState } = useEkstrakurikulerpageContext();
  const { updateEkstrakurikulerRequest, fetchEkstrakurikulerByidRequest } =
    useUpdateEkstrakurikuler();
  const {
    dayRequest,
    classRoomRequest,
    ekstrakurikulerByIdRequest,
    ekstrakurikulerLoading,
  } = state;

  const { control, setValue, reset } = useFormContext();
  const fetchStatus = useRef<{ [key: string]: boolean }>({});
  const data = ekstrakurikulerByIdRequest[0];

  useEffect(() => {
    if (!idEkstra || fetchStatus.current[idEkstra]) return;
    if (ekstrakurikulerByIdRequest.length === 0) {
      fetchEkstrakurikulerByidRequest(idEkstra);
      fetchStatus.current[idEkstra] = true;
    }
  }, [
    idEkstra,
    ekstrakurikulerByIdRequest.length,
    fetchEkstrakurikulerByidRequest,
  ]);

  const handleCloseDialog = () => {
    setState((prevState) => ({
      ...prevState,
      ekstrakurikulerByIdRequest: [],
    }));
    reset();
    if (idEkstra) fetchStatus.current[idEkstra] = false;
    onClose();
  };

  if (ekstrakurikulerLoading || !data) {
    return <LoadingDialog open={isOpen} onClose={onClose} />;
  }
  useEffect(() => {
    if (data) {
      setValue("id_ruangan_kelas", data?.id_ruang_kelas);
      setValue("id_hari", data.id_hari);
      setValue("jam_mulai_ekstra", data.jam_mulai_ekstra?.slice(0, 5)); // format ke "HH:mm"
      setValue("jam_mulai_selesai", data.jam_mulai_selesai?.slice(0, 5)); // format ke "HH:mm"
      setValue("deskripsi", data.deskripsi);
    }
  }, []);

  return (
    <BaseDialog
      open={isOpen}
      onClose={handleCloseDialog}
      title="Pengaturan Koordinator Kelas"
      message={data.deskripsi || ""}
    >
      <DialogContent>
        <div className="flex flex-col items-center justify-center">
          {state.ekstrakurikulerLoading && (
            <LoadingDialog
              open={state.ekstrakurikulerLoading}
              onClose={() => {}}
            />
          )}
          <div className="w-[60%]">
            <form>
              <div className="flex flex-col gap-3 mt-3 mb-3">
                <Controller
                  name="id_hari"
                  control={control}
                  defaultValue={0}
                  render={({ field, fieldState }) => (
                    <FormControl
                      fullWidth
                      error={!!fieldState.error}
                      variant="outlined"
                    >
                      <InputLabel id="durasi-label">
                        Durasi Pembelajaran
                      </InputLabel>
                      <Select
                        {...field}
                        labelId="durasi-label"
                        label="Durasi Pembelajaran"
                        size="medium"
                      >
                        {dayRequest.map((item) => (
                          <MenuItem value={item.id} key={item.id}>
                            {item.nama}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldState.error && (
                        <FormHelperText>
                          {fieldState.error.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
                <Controller
                  name="id_ruangan_kelas"
                  control={control}
                  defaultValue={0}
                  render={({ field, fieldState }) => (
                    <FormControl
                      fullWidth
                      error={!!fieldState.error}
                      variant="outlined"
                    >
                      <InputLabel id="kelas">Ruangan Kelas</InputLabel>
                      <Select
                        {...field}
                        labelId="kelas"
                        label="Kelas"
                        size="medium"
                      >
                        {classRoomRequest.map((item) => (
                          <MenuItem value={item.id} key={item.id}>
                            {item.nama_ruangan}
                          </MenuItem>
                        ))}
                      </Select>
                      {fieldState.error && (
                        <FormHelperText>
                          {fieldState.error.message}
                        </FormHelperText>
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
                      placeholder="HH:mm:ss"
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
                  label="Save"
                  color="primary"
                  className="w-full"
                  onClick={() =>
                    updateEkstrakurikulerRequest(idEkstra, handleCloseDialog)
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </BaseDialog>
  );
};

export default CardUpdateEkstrakurikuler;
