import { ActionButton } from "@components/Button";
import { BaseDialog, LoadingDialog } from "@components/Dialog";
import { DialogContent, FormControl, MenuItem, TextField } from "@mui/material";
import useUpdateProgramJurusan from "../Update/hook/useUpdateProgramJurusan";
import { useEffect, useRef } from "react";
import { usejurusanpageContext } from "../context";
import { useFormContext, Controller } from "react-hook-form";
import ErrorMessage from "@components/ErrorMessage";

interface Props {
  isOpen: boolean;
  kd_jurusan: string;
  onClose: () => void;
}

const CardUpdateProgramJurusan = (props: Props) => {
  const { isOpen, kd_jurusan, onClose } = props;
  const { state, setState } = usejurusanpageContext();
  const { handleSubmitForm, fetchJurusanById } = useUpdateProgramJurusan();
  const { jurusanByIdRequest } = state;
  const { control, setValue } = useFormContext();

  useEffect(() => {
    fetchJurusan();
  }, [kd_jurusan, jurusanByIdRequest, fetchJurusanById]);

  const fetchStatus = useRef<{ [key: string]: boolean }>({});

  const fetchJurusan = () => {
    if (fetchStatus.current[kd_jurusan] || jurusanByIdRequest.length !== 0) {
      return;
    }

    fetchJurusanById(kd_jurusan);
    fetchStatus.current[kd_jurusan] = true;
  };

  const handleCloseDialog = () => {
    setState((prevState) => ({
      ...prevState,
      jurusanByIdRequest: [],
    }));
    fetchStatus.current[kd_jurusan] = false;
    onClose();
  };

  const status = jurusanByIdRequest[0]?.status;

  if (status === undefined) {
    return <LoadingDialog open={isOpen} onClose={onClose} />;
  }

  const defaultStatus = status ? true : false;

  useEffect(() => {
    status !== undefined && setValue("status", defaultStatus);
  }, [status, setValue, defaultStatus]);

  return (
    <BaseDialog
      open={isOpen}
      onClose={handleCloseDialog}
      title="Pengaturan Program Jurusan"
      message={kd_jurusan}
    >
      <DialogContent>
        <div className="flex flex-col gap-3 mt-3 mb-6 ">
          <label className="font-semibold text-md">Nama Jurusan</label>
          {jurusanByIdRequest[0]?.nama_jurusan}
        </div>
        <div className="flex flex-col gap-3 mt-3 mb-3 ">
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
          onClick={() => handleSubmitForm(kd_jurusan, handleCloseDialog)}
          color="primary"
          className="w-full mt-4"
        />
      </DialogContent>
    </BaseDialog>
  );
};

export default CardUpdateProgramJurusan;
