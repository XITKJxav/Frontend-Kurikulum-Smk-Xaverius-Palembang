import { ActionButton } from "@components/Button";
import { Controller, useFormContext } from "react-hook-form";
import InputTextField from "@components/Input/InputText";
import { LoadingDialog } from "@components/Dialog";
import { useAgendaUpacarapageContext } from "../context";
import useCreateAgendaUpacara from "../Create/hook/useCreateAgendaUpacara";

const CreateAgendaUpacara = () => {
  const { control } = useFormContext();
  const { handleSubmitForm } = useCreateAgendaUpacara();
  const { state } = useAgendaUpacarapageContext();
  const { agendaUpacaraLoading } = state;

  return (
    <div className="flex flex-col items-center justify-center">
      {agendaUpacaraLoading && (
        <LoadingDialog open={agendaUpacaraLoading} onClose={() => {}} />
      )}
      <div className="w-[60%]">
        <form>
          <div className="flex flex-col gap-3 mt-3 mb-3">
            <Controller
              name="tanggal_upacara"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => (
                <InputTextField
                  field={field}
                  fieldState={fieldState}
                  label="Tanggal Upacara"
                  id="tanggal_upacara"
                  type="date"
                  autoComplete="off"
                />
              )}
            />
            <ActionButton
              onClick={() => handleSubmitForm()}
              label="submit"
              color="primary"
              className="w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateAgendaUpacara;
