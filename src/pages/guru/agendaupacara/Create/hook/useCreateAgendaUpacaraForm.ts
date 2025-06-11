import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import { useAgendaUpacarapageContext } from "../../context";
import { CreateAgendaUpacaraModel } from "@api/agendaupacara/model";
import {
  AgendaUpacaraDetailsFormatter,
  agendaUpacarareqDefaultValues,
  AgendaUpacaraValidations,
} from "../utils/form";

interface HookReturn {
  agendaUpacarareqForm: UseFormReturn<CreateAgendaUpacaraModel>;
}

const useCreateAgendaUpacaraForm = (): HookReturn => {
  const { state } = useAgendaUpacarapageContext();

  const agendaUpacarareqForm = useForm<CreateAgendaUpacaraModel>({
    defaultValues: agendaUpacarareqDefaultValues,
    values: AgendaUpacaraDetailsFormatter(state.agendaUpacarareqDetails),
    resolver: AgendaUpacaraValidations as Resolver<CreateAgendaUpacaraModel>,
  });

  return {
    agendaUpacarareqForm,
  };
};

export default useCreateAgendaUpacaraForm;
