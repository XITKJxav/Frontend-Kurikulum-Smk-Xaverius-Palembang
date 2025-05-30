import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  agendaUpacaraDetailsFormatter,
  agendaUpacarareqDefaultValues,
  agendaUpacaraValidations,
} from "../utils/form";
import { useAgendaUpacarapageContext } from "../../context";
import { UpdateAgendaUpacaraModel } from "@api/agendaupacara/model";

interface HookReturn {
  agendaUpacaraUpdatereqForm: UseFormReturn<UpdateAgendaUpacaraModel>;
}

const useUpdateAgendaUpacaraForm = (): HookReturn => {
  const { state } = useAgendaUpacarapageContext();

  const agendaUpacaraUpdatereqForm = useForm<UpdateAgendaUpacaraModel>({
    defaultValues: agendaUpacarareqDefaultValues,
    values: agendaUpacaraDetailsFormatter(state.agendaUpacaraUpdatereqDetails),
    resolver: agendaUpacaraValidations as Resolver<UpdateAgendaUpacaraModel>,
  });

  return {
    agendaUpacaraUpdatereqForm,
  };
};

export default useUpdateAgendaUpacaraForm;
