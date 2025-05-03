import { ActionButton } from "@components/Button";
import { BaseDialog, LoadingDialog } from "@components/Dialog";
import { DialogContent, FormControl, MenuItem, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { useClassCoordinatorPageContext } from "../context";
import { useFormContext, Controller } from "react-hook-form";
import ErrorMessage from "@components/ErrorMessage";
import useUpdateClassCoordinator from "../Update/hook/useUpdateClassCoordinator";

interface Props {
  isOpen: boolean;
  idClassCoordinator?: string;
  onClose: () => void;
}

const CardUpdateClassCoordinator = ({
  isOpen,
  idClassCoordinator,
  onClose,
}: Props) => {
  const { state, setState } = useClassCoordinatorPageContext();
  const { handleUpdateForm, fetchClassCoordinatorById } =
    useUpdateClassCoordinator();
  const {
    classCoordinatorByIdRequest,
    classRoomRequest,
    classCoordinatorLoading,
  } = state;

  const { control, setValue } = useFormContext();
  const fetchStatus = useRef<{ [key: string]: boolean }>({});

  const data = classCoordinatorByIdRequest[0];

  useEffect(() => {
    if (
      !idClassCoordinator ||
      fetchStatus.current[idClassCoordinator] ||
      classCoordinatorByIdRequest.length !== 0
    )
      return;

    fetchClassCoordinatorById(idClassCoordinator);
    fetchStatus.current[idClassCoordinator] = true;
  }, []);

  useEffect(() => {
    if (data?.status !== undefined) {
      setValue("status", !!data.status);
    }
  }, [data?.status, setValue]);

  const handleCloseDialog = () => {
    setState((prevState) => ({
      ...prevState,
      coordinatorByIdRequest: [],
    }));
    if (idClassCoordinator) fetchStatus.current[idClassCoordinator] = false;
    onClose();
  };

  if (classCoordinatorLoading || !data) {
    return <LoadingDialog open={isOpen} onClose={onClose} />;
  }

  return (
    <BaseDialog
      open={isOpen}
      onClose={handleCloseDialog}
      title="Pengaturan Koordinator Kelas"
      message={data.kd_kepengurusan_kelas || ""}
    >
      <DialogContent>
        <Controller
          name="name"
          control={control}
          defaultValue={data.name || ""}
          render={({ field, fieldState }) => (
            <FormControl fullWidth size="small" error={!!fieldState.error}>
              <TextField {...field} label="Nama Lengkap" variant="outlined" />
              <ErrorMessage messageError={fieldState.error?.message} />
            </FormControl>
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue={data.email || ""}
          render={({ field, fieldState }) => (
            <FormControl fullWidth size="small" error={!!fieldState.error}>
              <TextField
                {...field}
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
          defaultValue={data.no_telp || ""}
          render={({ field, fieldState }) => (
            <FormControl fullWidth size="small" error={!!fieldState.error}>
              <TextField {...field} label="No Telepon" variant="outlined" />
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
                type="password"
                label="Password"
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
                type="password"
                label="Konfirmasi Password"
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
          defaultValue={data.id_ruang_kelas || ""}
          render={({ field, fieldState }) => (
            <FormControl fullWidth size="small" error={!!fieldState.error}>
              <TextField
                {...field}
                select
                label="Pilih Ruangan"
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

        <div className="flex flex-col gap-3 mt-3 mb-3">
          <Controller
            name="status"
            control={control}
            defaultValue={!!data.status}
            render={({ field, fieldState }) => (
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
            )}
          />
        </div>

        <ActionButton
          label="Submit"
          onClick={() =>
            handleUpdateForm(idClassCoordinator || "", handleCloseDialog)
          }
          color="primary"
          className="w-full mt-4"
        />
      </DialogContent>
    </BaseDialog>
  );
};

export default CardUpdateClassCoordinator;
