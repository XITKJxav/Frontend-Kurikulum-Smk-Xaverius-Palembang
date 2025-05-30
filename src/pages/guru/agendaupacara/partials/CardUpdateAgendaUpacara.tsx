import { ActionButton } from "@components/Button";
import { BaseDialog, LoadingDialog } from "@components/Dialog";
import { DialogContent } from "@mui/material";
import { useEffect, useRef } from "react";
import { useFormContext, Controller } from "react-hook-form";
import InputAutocomplete from "@components/Input/InputAutoComplate";
import useUpdateAgendaUpacara from "../Update/hook/useUpdateAgendaUpacara";
import { useAgendaUpacarapageContext } from "../context";

interface Props {
  isOpen: boolean;
  kd_agendaupacara?: string;
  onClose: () => void;
}

const CardUpdateAgendaUpacara = ({
  isOpen,
  kd_agendaupacara,
  onClose,
}: Props) => {
  const { state, setState } = useAgendaUpacarapageContext();
  const { fetchAgendaUpacaraById, handleSubmitForm } = useUpdateAgendaUpacara();
  const {
    agendaUpacaraByIdRequest,
    agendaUpacaraLoading,
    statusAgendaUpacaraRequest,
  } = state;
  const { control, reset } = useFormContext();

  const fetchStatus = useRef<{ [key: string]: boolean }>({});

  const data = agendaUpacaraByIdRequest[0];

  useEffect(() => {
    if (!kd_agendaupacara || fetchStatus.current[kd_agendaupacara]) return;
    if (agendaUpacaraByIdRequest.length === 0) {
      fetchAgendaUpacaraById(kd_agendaupacara);

      fetchStatus.current[kd_agendaupacara] = true;
    }
  }, [
    kd_agendaupacara,
    agendaUpacaraByIdRequest.length,
    fetchAgendaUpacaraById,
  ]);

  const handleCloseDialog = () => {
    setState((prevState) => ({
      ...prevState,
      agendaUpacaraByIdRequest: [],
    }));
    reset();
    if (kd_agendaupacara) fetchStatus.current[kd_agendaupacara] = false;
    onClose();
  };

  if (agendaUpacaraLoading || !data) {
    return <LoadingDialog open={isOpen} onClose={onClose} />;
  }

  return (
    <BaseDialog
      open={isOpen}
      onClose={handleCloseDialog}
      title="Pengaturan Agenda Upacara"
      message={kd_agendaupacara || ""}
    >
      <DialogContent>
        <form className="flex flex-col gap-3 mt-3 mb-3">
          <Controller
            name="id_status_upacara"
            control={control}
            defaultValue={data.id_status_upacara}
            render={({ field, fieldState }) => (
              <InputAutocomplete
                field={field}
                fieldState={fieldState}
                label="Status Upacara"
                id="id_status_upacara"
                allowClear={false}
                onSearch={false}
                data={statusAgendaUpacaraRequest.map((data) => ({
                  id: data.id_status_upacara,
                  label: data.nama,
                }))}
                size="small"
              />
            )}
          />

          <ActionButton
            label="Submit"
            onClick={() =>
              handleSubmitForm(kd_agendaupacara || "", handleCloseDialog)
            }
            color="primary"
            className="w-full mt-4"
          />
        </form>
      </DialogContent>
    </BaseDialog>
  );
};

export default CardUpdateAgendaUpacara;
