import { ActionButton } from "@components/Button";
import { BaseDialog, LoadingDialog } from "@components/Dialog";
import { DialogContent } from "@mui/material";
import { useEffect, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import InputAutocomplete from "@components/Input/InputAutoComplate";
import { usekaryawanpageContext } from "../context";
import useUpdateKaryawan from "../Update/hook/useUpdateKaryawan";
import InputTextField from "@components/Input/InputText";
import InputSelect from "@components/Input/InputSelect";

interface Props {
  isOpen: boolean;
  kd_karyawan?: string;
  onClose: () => void;
}

const CardUpdateKaryawan = ({ isOpen, kd_karyawan, onClose }: Props) => {
  const { state, setState } = usekaryawanpageContext();
  const { fetchKaryawanById, handleSubmitForm } = useUpdateKaryawan();
  const { karyawanByIdRequest, roleRequest, KaryawanLoading } = state;
  const { control, setValue, reset } = useFormContext();

  const fetchStatus = useRef<{ [key: string]: boolean }>({});

  const data = karyawanByIdRequest[0];

  useEffect(() => {
    if (!kd_karyawan || fetchStatus.current[kd_karyawan]) return;
    if (karyawanByIdRequest.length === 0) {
      fetchKaryawanById(kd_karyawan);
      fetchStatus.current[kd_karyawan] = true;
    }
  }, [kd_karyawan, karyawanByIdRequest.length, fetchKaryawanById]);

  useEffect(() => {
    if (data?.status !== undefined) {
      setValue("status", data.status);
    }
  }, [data?.status, setValue]);

  const handleCloseDialog = () => {
    setState((prevState) => ({
      ...prevState,
      karyawanByIdRequest: [],
    }));
    reset();
    if (kd_karyawan) fetchStatus.current[kd_karyawan] = false;
    onClose();
  };

  if (KaryawanLoading || !data) {
    return <LoadingDialog open={isOpen} onClose={onClose} />;
  }

  return (
    <BaseDialog
      open={isOpen}
      onClose={handleCloseDialog}
      title="Pengaturan Karyawan"
      message={kd_karyawan || ""}
    >
      <DialogContent>
        <form className="flex flex-col gap-3 mt-3 mb-3">
          <Controller
            name="name"
            control={control}
            defaultValue={data?.name || ""}
            render={({ field, fieldState }) => (
              <InputTextField
                field={field}
                fieldState={fieldState}
                label="Nama Karyawan"
                id="nama_karyawan"
                type="text"
                autoComplete="off"
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue={data?.email || ""}
            render={({ field, fieldState }) => (
              <InputTextField
                field={field}
                fieldState={fieldState}
                label="Email Karyawan"
                id="email_karyawan"
                type="email"
                autoComplete="off"
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue={""}
            render={({ field, fieldState }) => (
              <InputTextField
                field={field}
                fieldState={fieldState}
                label="New Password Karyawan"
                id="password_karyawan"
                type="password"
                autoComplete="off"
              />
            )}
          />
          <Controller
            name="no_telp"
            control={control}
            defaultValue={data?.no_telp || ""}
            render={({ field, fieldState }) => (
              <InputTextField
                field={field}
                fieldState={fieldState}
                label="Nomor Telphone"
                id="nomor_karyawan"
                type="text"
                autoComplete="off"
              />
            )}
          />
          <Controller
            name="id_role"
            control={control}
            defaultValue={data?.id_role || ""}
            render={({ field, fieldState }) => (
              <InputSelect
                field={field}
                fieldState={fieldState}
                label="Pilih Role"
                id="id_role_select"
                data={roleRequest?.map((item) => ({
                  id: item.id_role,
                  label: item.name,
                }))}
                size="small"
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
              handleSubmitForm(kd_karyawan || "", handleCloseDialog)
            }
            color="primary"
            className="w-full mt-4"
          />
        </form>
      </DialogContent>
    </BaseDialog>
  );
};

export default CardUpdateKaryawan;
