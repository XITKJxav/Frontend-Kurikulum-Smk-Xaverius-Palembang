import { ActionButton } from "@components/Button";
import { BaseDialog, LoadingDialog } from "@components/Dialog";
import { DialogContent, FormControl, MenuItem, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { useClassroompageContext } from "../context";
import { useFormContext, Controller } from "react-hook-form";
import ErrorMessage from "@components/ErrorMessage";
import useUpdateClassRoom from "../Update/hook/useUpdateClassRoom";
import Autocomplete from "@mui/material/Autocomplete";

interface Props {
  isOpen: boolean;
  idClassRoom?: number;
  onClose: () => void;
}
const CardUpdateClassRoom = ({ isOpen, idClassRoom, onClose }: Props) => {
  const { state, setState } = useClassroompageContext();
  const { handleUpdateForm, fetchClassRoomById } = useUpdateClassRoom();
  const { classroomByIdRequest, jurusanRequest } = state;
  const { control, setValue } = useFormContext();

  const romanOptions = [
    { value: "X", label: "10" },
    { value: "XI", label: "11" },
    { value: "XII", label: "12" },
  ];

  const fetchStatus = useRef<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (
      !idClassRoom ||
      fetchStatus.current[idClassRoom] ||
      classroomByIdRequest.length !== 0
    )
      return;
    fetchClassRoomById(idClassRoom);
    fetchStatus.current[idClassRoom] = true;
  }, [idClassRoom, fetchClassRoomById, classroomByIdRequest]);

  const handleCloseDialog = () => {
    setState((prevState) => ({
      ...prevState,
      classroomByIdRequest: [],
    }));
    if (idClassRoom) fetchStatus.current[idClassRoom] = false;
    onClose();
  };

  const status = classroomByIdRequest[0]?.status;
  const defaultStatus = status ? true : false;

  useEffect(() => {
    if (status !== undefined) {
      setValue("status", defaultStatus);
    }
  }, [status, defaultStatus, setValue]);

  if (status === undefined) {
    return <LoadingDialog open={isOpen} onClose={onClose} />;
  }

  return (
    <BaseDialog
      open={isOpen}
      onClose={handleCloseDialog}
      title="Pengaturan Program Jurusan"
      message={classroomByIdRequest[0]?.nama_ruangan}
    >
      <DialogContent>
        <div className="flex flex-col mt-3 mb-3">
          <Controller
            name="nomor_ruangan"
            control={control}
            defaultValue={
              classroomByIdRequest && classroomByIdRequest[0]?.nama_ruangan
                ? classroomByIdRequest[0]?.nama_ruangan.split("-")[0]
                : ""
            }
            render={({ field, fieldState }) => (
              <>
                <FormControl fullWidth size="small" error={!!fieldState.error}>
                  <TextField
                    {...field}
                    select
                    label="Pilih Ruangan"
                    variant="outlined"
                    value={field.value}
                  >
                    {romanOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <ErrorMessage messageError={fieldState.error?.message} />
              </>
            )}
          />
        </div>

        <div className="flex flex-col mt-3 mb-3">
          <Controller
            name="kd_jurusan"
            control={control}
            defaultValue={classroomByIdRequest[0]?.jurusan?.kd_jurusan || ""}
            render={({ field, fieldState }) => {
              const selectedOption =
                jurusanRequest.find(
                  (item) => item.kd_jurusan === field.value
                ) || null;

              return (
                <>
                  <FormControl
                    fullWidth
                    size="small"
                    error={!!fieldState.error}
                  >
                    <Autocomplete
                      options={jurusanRequest}
                      getOptionLabel={(option) => option?.nama_jurusan || ""}
                      value={selectedOption}
                      onChange={(_, value) =>
                        field.onChange(value?.kd_jurusan || "")
                      }
                      isOptionEqualToValue={(option, value) =>
                        option.kd_jurusan === value?.kd_jurusan
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Pilih Jurusan"
                          variant="outlined"
                        />
                      )}
                    />
                  </FormControl>
                  <ErrorMessage messageError={fieldState.error?.message} />
                </>
              );
            }}
          />

          {/* <Controller
            name="kd_jurusan"
            control={control}
            defaultValue={classroomByIdRequest[0]?.jurusan?.kd_jurusan || ""}
            render={({ field, fieldState }) => (
              <>
                <FormControl fullWidth size="small" error={!!fieldState.error}>
                  <TextField
                    {...field}
                    select
                    label="Pilih Jurusan"
                    variant="outlined"
                    value={field.value}
                  >
                    {jurusanRequest.map((option) => (
                      <MenuItem
                        key={option.kd_jurusan}
                        value={option.kd_jurusan}
                      >
                        {option.nama_jurusan}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>
                <ErrorMessage messageError={fieldState.error?.message} />
              </>
            )}
          /> */}
        </div>
        <div className="flex flex-col gap-3 mt-3 mb-3">
          <Controller
            name="status"
            control={control}
            defaultValue={defaultStatus}
            render={({ field, fieldState }) => (
              <>
                <FormControl fullWidth size="small" error={!!fieldState?.error}>
                  <TextField
                    {...field}
                    select
                    label="Pilih Status"
                    value={field.value ? "1" : "0"}
                    onChange={(e) => field.onChange(e.target.value === "1")}
                    variant="outlined"
                  >
                    <MenuItem value="0">Disable</MenuItem>
                    <MenuItem value="1">Active</MenuItem>
                  </TextField>
                  <ErrorMessage messageError={fieldState.error?.message} />
                </FormControl>
              </>
            )}
          />
        </div>
        <ActionButton
          label="Submit"
          onClick={() => {
            handleUpdateForm(idClassRoom || 0, handleCloseDialog);
          }}
          color="primary"
          className="w-full mt-4"
        />
      </DialogContent>
    </BaseDialog>
  );
};

export default CardUpdateClassRoom;
