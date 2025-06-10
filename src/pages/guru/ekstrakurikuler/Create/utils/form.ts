import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateEkstrakurikulerRequestModel } from "@api/ekstrakurikuler/model";

export const ekstrakurikulerreqDefaultValues: CreateEkstrakurikulerRequestModel =
  {
    id_hari: 0,
    id_ruangan_kelas: 0,
    jam_mulai_ekstra: "",
    jam_mulai_selesai: "",
    deskripsi: "",
  };

export const ekstrakurikulerValidations = yupResolver(
  yup.object().shape({
    id_hari: yup
      .number()
      .required("Hari wajib dipilih")
      .moreThan(0, "Hari wajib dipilih"),

    id_ruangan_kelas: yup
      .number()
      .required("Ruangan wajib dipilih")
      .moreThan(0, "Ruangan wajib dipilih"),

    jam_mulai_ekstra: yup
      .string()
      .required("Jam mulai wajib diisi")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format jam harus HH:mm"),

    jam_mulai_selesai: yup
      .string()
      .required("Jam selesai wajib diisi")
      .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Format jam harus HH:mm")
      .test(
        "is-after",
        "Jam selesai harus setelah jam mulai",
        function (value) {
          const { jam_mulai_ekstra } = this.parent;
          if (!value || !jam_mulai_ekstra) return true;

          const [startH, startM] = jam_mulai_ekstra.split(":").map(Number);
          const [endH, endM] = value.split(":").map(Number);
          const startMinutes = startH * 60 + startM;
          const endMinutes = endH * 60 + endM;

          return endMinutes > startMinutes;
        }
      ),

    deskripsi: yup
      .string()
      .required("Deskripsi wajib diisi")
      .max(255, "Deskripsi maksimal 255 karakter"),
  })
);

export const ekstrakurikulerDetailsFormatter = (
  data: CreateEkstrakurikulerRequestModel
): CreateEkstrakurikulerRequestModel => {
  return {
    id_hari: data.id_hari,
    id_ruangan_kelas: data.id_ruangan_kelas,
    jam_mulai_ekstra: data.jam_mulai_ekstra,
    jam_mulai_selesai: data.jam_mulai_selesai,
    deskripsi: data.deskripsi,
  };
};
