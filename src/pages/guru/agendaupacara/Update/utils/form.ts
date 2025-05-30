import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateAgendaUpacaraModel } from "@api/agendaupacara/model";

export const agendaUpacarareqDefaultValues: UpdateAgendaUpacaraModel = {
  id_status_upacara: "",
};

export const agendaUpacaraValidations = yupResolver(
  yup.object().shape({
    id_status_upacara: yup
      .string()
      .required("Status upacara wajib dipilih")
      .min(1, "Status upacara tidak boleh kosong"),
  })
);

export const agendaUpacaraDetailsFormatter = (
  data: UpdateAgendaUpacaraModel
): UpdateAgendaUpacaraModel => {
  return {
    id_status_upacara: data.id_status_upacara,
  };
};
