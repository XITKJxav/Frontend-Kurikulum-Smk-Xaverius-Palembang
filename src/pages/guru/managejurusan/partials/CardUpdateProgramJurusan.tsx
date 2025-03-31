import { ActionButton } from "@components/Button";
import { BaseDialog, LoadingDialog } from "@components/Dialog";
import { DialogContent } from "@mui/material";
import useUpdateProgramJurusan from "../Update/hook/useUpdateProgramJurusan";
import { useEffect, useRef } from "react";
import { usejurusanpageContext } from "../context";
import { useFormContext, Controller } from "react-hook-form";

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
    if (status !== undefined) {
      setValue("status", defaultStatus);
    }
  }, [status, setValue, defaultStatus]);

  return (
    <BaseDialog
      open={isOpen}
      onClose={handleCloseDialog}
      title="Pengaturan Program Jurusan"
      message={"Pengaturan Program Jurusan"}
    >
      <DialogContent>
        <div className="flex flex-col gap-3 mt-3 mb-3">
          <label className="text-md font-semibold">Kode Jurusan</label>
          {kd_jurusan}
        </div>
        <div className="flex flex-col gap-3 mt-3 mb-3">
          <label className="text-md font-semibold">Nama Jurusan</label>
          {jurusanByIdRequest[0]?.nama_jurusan}
        </div>
        <div className="flex flex-col gap-3 mt-3 mb-3">
          <label htmlFor="status" className="text-md font-semibold">
            Status Jurusan
          </label>

          <Controller
            name="status"
            control={control}
            defaultValue={defaultStatus}
            render={({ field, fieldState }) => (
              <>
                <select
                  {...field}
                  id="status"
                  className="border p-2 rounded-md"
                  value={field.value ? "1" : "0"}
                  onChange={(e) => {
                    field.onChange(e.target.value === "1" ? true : false);
                  }}
                >
                  <option value="0">Disable</option>
                  <option value="1">Active</option>
                </select>
                {fieldState?.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState?.error?.message}
                  </span>
                )}
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
