import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { JadwalUpdateModel } from "@api/jadwal/model";

export const updateJadwalreqDefaultValues: JadwalUpdateModel = {
  id_ruangan_kelas: 0,
  id_hari: 0,
  kd_jam_pembelajaran: 0,
  id_mata_pelajaran: "",
  id_pengajar: "",
  kd_guru_piket: "",
};

export const updateJadwalValidations = yupResolver(
  yup
    .object()
    .shape({
      id_ruangan_kelas: yup
        .number()
        .required("ID Ruangan tidak valid")
        .min(1, "ID Ruangan tidak valid"),
      id_hari: yup
        .number()
        .required("Hari tidak valid")
        .min(1, "Hari tidak valid"),
      kd_jam_pembelajaran: yup
        .number()
        .required("Jam pembelajaran tidak valid")
        .min(1, "Jam pembelajaran tidak valid"),
      id_mata_pelajaran: yup.string().nullable(),
      id_pengajar: yup
        .string()
        .required("Pengajar wajib diisi")
        .notOneOf(
          [yup.ref("kd_guru_piket")],
          "Pengajar dan Guru Piket tidak boleh sama"
        ),
      kd_guru_piket: yup
        .string()
        .required("guru piket wajib diisi")
        .notOneOf(
          [yup.ref("id_pengajar")],
          "Pengajar dan Guru Piket tidak boleh sama"
        ),
    })
    .test(
      "pengajar-tidak-sama-dengan-piket",
      "Pengajar dan Guru Piket tidak boleh sama",
      function (value) {
        if (!value?.id_pengajar || !value?.kd_guru_piket) return true; // Boleh kosong
        return value.id_pengajar !== value.kd_guru_piket;
      }
    )
);

export const updateJadwalFormatter = (
  values: JadwalUpdateModel
): JadwalUpdateModel => {
  return {
    id_ruangan_kelas: values.id_ruangan_kelas,
    id_hari: values.id_hari,
    kd_jam_pembelajaran: values.kd_jam_pembelajaran,
    id_mata_pelajaran: values.id_mata_pelajaran,
    id_pengajar: values.id_pengajar,
    kd_guru_piket: values.kd_guru_piket,
  };
};
