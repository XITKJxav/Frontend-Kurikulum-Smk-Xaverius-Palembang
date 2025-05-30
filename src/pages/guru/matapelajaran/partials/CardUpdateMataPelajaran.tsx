import { ActionButton } from "@components/Button";
import { BaseDialog, LoadingDialog } from "@components/Dialog";
import { DialogContent } from "@mui/material";
import { useEffect, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import InputTextField from "@components/Input/InputText";
import useUpdateMataPelajaran from "../Update/hook/useUpdateMataPelajaran";
import { useMataPelajaranpageContext } from "../context";
import InputAutocomplete from "@components/Input/InputAutoComplate";

interface Props {
  isOpen: boolean;
  id_mata_pelajaran?: string;
  onClose: () => void;
}

const CardUpdateMataPelajaran = ({
  isOpen,
  id_mata_pelajaran,
  onClose,
}: Props) => {
  const { state, setState } = useMataPelajaranpageContext();
  const { fetchMataPelajaranById, handleSubmitForm } = useUpdateMataPelajaran();
  const { mataPelajaranByIdRequest, mataPelajaranLoading } = state;
  const { control, setValue, reset } = useFormContext();

  const fetchStatus = useRef<{ [key: string]: boolean }>({});

  const data = mataPelajaranByIdRequest[0];

  useEffect(() => {
    if (!id_mata_pelajaran || fetchStatus.current[id_mata_pelajaran]) return;
    if (mataPelajaranByIdRequest.length === 0) {
      fetchMataPelajaranById(id_mata_pelajaran);
      fetchStatus.current[id_mata_pelajaran] = true;
    }
  }, [
    id_mata_pelajaran,
    mataPelajaranByIdRequest.length,
    fetchMataPelajaranById,
  ]);

  useEffect(() => {
    if (data?.status !== undefined) {
      setValue("status", data.status);
    }
  }, [data?.status, setValue]);

  const handleCloseDialog = () => {
    setState((prevState) => ({
      ...prevState,
      mataPelajaranByIdRequest: [],
    }));
    reset();
    if (id_mata_pelajaran) fetchStatus.current[id_mata_pelajaran] = false;
    onClose();
  };

  if (mataPelajaranLoading || !data) {
    return <LoadingDialog open={isOpen} onClose={onClose} />;
  }

  return (
    <BaseDialog
      open={isOpen}
      onClose={handleCloseDialog}
      title="Pengaturan Karyawan"
      message={id_mata_pelajaran || ""}
    >
      <DialogContent>
        <form className="flex flex-col gap-3 mt-3 mb-3">
          <Controller
            name="nama"
            control={control}
            defaultValue={data?.nama || ""}
            render={({ field, fieldState }) => (
              <InputTextField
                field={field}
                fieldState={fieldState}
                label="Nama Mata Pelajaran"
                id="nama_pelajaran"
                type="text"
                autoComplete="off"
              />
            )}
          />

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

          <ActionButton
            label="Submit"
            onClick={() =>
              handleSubmitForm(id_mata_pelajaran || "", handleCloseDialog)
            }
            color="primary"
            className="w-full mt-4"
          />
        </form>
      </DialogContent>
    </BaseDialog>
  );
};

export default CardUpdateMataPelajaran;
