import { ActionButton } from "@components/Button";
import { BaseDialog, LoadingDialog } from "@components/Dialog";
import { DialogContent } from "@mui/material";
import useUpdateProgramJurusan from "../Update/hook/useUpdateProgramJurusan";
import { useEffect, useRef } from "react";
import { usejurusanpageContext } from "../context";
import { useFormContext, Controller } from "react-hook-form";
import InputAutocomplete from "@components/Input/InputAutoComplate";

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

  const data = jurusanByIdRequest[0];

  useEffect(() => {
    fetchJurusan();
    setValue("status", jurusanByIdRequest[0]?.status);
  }, [kd_jurusan, jurusanByIdRequest, fetchJurusanById]);

  if (data === undefined) {
    return <LoadingDialog open={isOpen} onClose={onClose} />;
  }

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
            defaultValue={0}
            render={({ field, fieldState }) => (
              <InputAutocomplete
                field={field}
                fieldState={fieldState}
                label="status"
                id="status"
                allowClear={false}
                onSearch={false}
                data={[
                  { id: 1, label: "Active" },
                  { id: 0, label: "Disable" },
                ]}
                size="small"
              />
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
