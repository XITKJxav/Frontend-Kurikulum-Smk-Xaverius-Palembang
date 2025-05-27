import { ActionButton } from "@components/Button";
import { BaseDialog, LoadingDialog } from "@components/Dialog";
import { DialogContent } from "@mui/material";
import { useEffect, useRef } from "react";
import { useClassCoordinatorPageContext } from "../context";
import { useFormContext, Controller } from "react-hook-form";
import useUpdateClassCoordinator from "../Update/hook/useUpdateClassCoordinator";
import InputTextField from "@components/Input/InputText";
import InputSelect from "@components/Input/InputSelect";
import InputAutocomplete from "@components/Input/InputAutoComplate";

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

  const { control, setValue, reset } = useFormContext();
  const fetchStatus = useRef<{ [key: string]: boolean }>({});
  const data = classCoordinatorByIdRequest[0];

  useEffect(() => {
    if (!idClassCoordinator || fetchStatus.current[idClassCoordinator]) return;
    if (classCoordinatorByIdRequest.length === 0) {
      fetchClassCoordinatorById(idClassCoordinator);
      fetchStatus.current[idClassCoordinator] = true;
    }
  }, [
    idClassCoordinator,
    classCoordinatorByIdRequest.length,
    fetchClassCoordinatorById,
  ]);

  useEffect(() => {
    if (data?.status !== undefined) {
      setValue("status", data?.status);
    }
  }, [data?.status, setValue]);

  const handleCloseDialog = () => {
    setState((prevState) => ({
      ...prevState,
      classCoordinatorByIdRequest: [],
    }));
    reset();
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
      message={data.kd_siswa || ""}
    >
      <DialogContent>
        <form className="flex flex-col items-center justify-center gap-4 mt-3 ">
          <Controller
            name="name"
            control={control}
            defaultValue={data.name || ""}
            render={({ field, fieldState }) => (
              <InputTextField
                field={field}
                fieldState={fieldState}
                label="name"
                id="name"
                autoComplete="name"
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            defaultValue={data.email || ""}
            render={({ field, fieldState }) => (
              <InputTextField
                field={field}
                fieldState={fieldState}
                label="email"
                id="email"
                autoComplete="email"
              />
            )}
          />

          <Controller
            name="no_telp"
            control={control}
            defaultValue={data.no_telp || ""}
            render={({ field, fieldState }) => (
              <InputTextField
                field={field}
                fieldState={fieldState}
                label="No Telepon"
                id="no_telp"
                autoComplete="tel"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field, fieldState }) => (
              <InputTextField
                field={field}
                fieldState={fieldState}
                label="new Password"
                id="password"
                type="password"
                autoComplete="new-password"
              />
            )}
          />

          <Controller
            name="id_ruang_kelas"
            control={control}
            defaultValue={data.id_ruang_kelas || ""}
            render={({ field, fieldState }) => (
              <InputSelect
                field={field}
                fieldState={fieldState}
                label="Pilih Ruangan"
                id="id_ruang_kelas-native"
                data={classRoomRequest.map((item) => ({
                  id: item.id,
                  label: item.nama_ruangan,
                }))}
                size="small"
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            defaultValue={!!data.status}
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
              handleUpdateForm(idClassCoordinator || "", handleCloseDialog)
            }
            color="primary"
            className="w-full"
          />
        </form>
      </DialogContent>
    </BaseDialog>
  );
};

export default CardUpdateClassCoordinator;
