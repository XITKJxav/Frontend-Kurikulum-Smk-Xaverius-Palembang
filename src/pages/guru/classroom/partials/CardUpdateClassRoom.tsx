import { ActionButton } from "@components/Button";
import { BaseDialog, LoadingDialog } from "@components/Dialog";
import { DialogContent } from "@mui/material";
import { useEffect, useRef } from "react";
import { useClassroompageContext } from "../context";
import { useFormContext, Controller } from "react-hook-form";
import useUpdateClassRoom from "../Update/hook/useUpdateClassRoom";
import InputAutocomplete from "@components/Input/InputAutoComplate";

interface Props {
  isOpen: boolean;
  idClassRoom?: number;
  onClose: () => void;
}
const CardUpdateClassRoom = ({ isOpen, idClassRoom, onClose }: Props) => {
  const { state, setState } = useClassroompageContext();
  const { handleUpdateForm, fetchClassRoomById } = useUpdateClassRoom();
  const { classroomByIdRequest, jurusanRequest, waliKelasRequest } = state;
  const { control, setValue, reset } = useFormContext();
  const fetchStatus = useRef<{ [key: number]: boolean }>({});
  const classRoomData = classroomByIdRequest[0];

  const romanOptions = [
    { value: "X", label: "10" },
    { value: "XI", label: "11" },
    { value: "XII", label: "12" },
  ];

  useEffect(() => {
    if (
      !idClassRoom ||
      fetchStatus.current[idClassRoom] ||
      classroomByIdRequest.length !== 0
    )
      return;
    fetchStatus.current[idClassRoom] = true;
    fetchClassRoomById(idClassRoom);
  }, []);

  useEffect(() => {
    if (classRoomData?.status !== undefined) {
      setValue("status", classRoomData.status);
    }
  }, []);

  const handleCloseDialog = () => {
    setState((prevState) => ({
      ...prevState,
      classroomByIdRequest: [],
    }));
    reset();
    if (idClassRoom) fetchStatus.current[idClassRoom] = false;
    onClose();
  };

  if (!classRoomData) {
    return <LoadingDialog open={isOpen} onClose={onClose} />;
  }

  return (
    <BaseDialog
      open={isOpen}
      onClose={handleCloseDialog}
      title="Pengaturan Program Jurusan"
      message={classRoomData?.nama_ruangan}
    >
      <DialogContent>
        <div className="flex flex-col items-center justify-center gap-4 mt-3">
          <Controller
            name="nomor_ruangan"
            control={control}
            defaultValue={classRoomData?.nama_ruangan.split("-")[0]}
            render={({ field, fieldState }) => (
              <InputAutocomplete
                field={field}
                fieldState={fieldState}
                label="Pilih Nomor Ruangan"
                id="nomor_kelas"
                data={romanOptions.map((item) => ({
                  id: item.value,
                  label: item.label,
                }))}
                size="small"
                allowClear={false}
              />
            )}
          />

          <Controller
            name="kd_jurusan"
            control={control}
            defaultValue={classRoomData?.jurusan?.kd_jurusan || ""}
            render={({ field, fieldState }) => (
              <InputAutocomplete
                field={field}
                fieldState={fieldState}
                label="Pilih Jurusan"
                id="kd_jurusan"
                data={jurusanRequest.map((item) => ({
                  id: item.kd_jurusan,
                  label: item.nama_jurusan,
                }))}
                size="small"
                allowClear={false}
              />
            )}
          />

          <Controller
            name="kd_wali_kelas"
            control={control}
            defaultValue={classRoomData?.kd_wali_kelas || ""}
            render={({ field, fieldState }) => (
              <InputAutocomplete
                field={field}
                fieldState={fieldState}
                label="Pilih wali kelas"
                id="kd_wali_kelas"
                data={waliKelasRequest.map((item) => ({
                  id: item.kd_karyawan,
                  label: item.name,
                }))}
                size="small"
                allowClear={false}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
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
            onClick={() => {
              handleUpdateForm(idClassRoom || 0, handleCloseDialog);
            }}
            color="primary"
            className="w-full mt-4"
          />
        </div>
      </DialogContent>
    </BaseDialog>
  );
};

export default CardUpdateClassRoom;
