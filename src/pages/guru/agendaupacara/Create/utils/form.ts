import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateAgendaUpacaraModel } from "@api/agendaupacara/model";

export const agendaUpacarareqDefaultValues: CreateAgendaUpacaraModel = {
  tanggal_upacara: "",
};
const today = new Date();
today.setHours(0, 0, 0, 0);
export const AgendaUpacaraValidations = yupResolver(
  yup.object().shape({
    tanggal_upacara: yup
      .string()
      .required("Tanggal Upacara wajib diisi")
      .test("is-valid-date", "Tanggal Upacara tidak valid", (value) =>
        value ? !isNaN(Date.parse(value)) : false
      )
      .test(
        "is-not-past",
        "Tanggal Upacara tidak boleh sebelum hari ini",
        (value) => {
          if (!value) return false;
          const selectedDate = new Date(value);
          selectedDate.setHours(0, 0, 0, 0);
          return selectedDate >= today;
        }
      ),
  })
);

export const AgendaUpacaraDetailsFormatter = (
  data: CreateAgendaUpacaraModel
): CreateAgendaUpacaraModel => {
  return {
    tanggal_upacara: data?.tanggal_upacara,
  };
};
