import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { QuickEntrySchenduleModel } from "@api/jadwal/model";

export const quickEntrySchendulereqDefaultValues: QuickEntrySchenduleModel = {
  id_hari: 0,
  id_ruangan_kelas: 0,
  id_jam_awal: 0,
  id_jam_akhir: 0,
  id_mata_pelajaran: "",
  id_pengajar: "",
  kd_guru_piket: "",
};

export const quickEntrySchenduleValidations = yupResolver(
  yup.object().shape({
    id_hari: yup.number().required("Hari is Required"),
    id_ruangan_kelas: yup.number().required("Ruangan Kelas is Required"),
    id_jam_awal: yup
      .number()
      .typeError("Jam Awal is Required")
      .moreThan(0, "Jam Awal is Required"),

    id_jam_akhir: yup
      .number()
      .typeError("Jam Akhir is Required")
      .moreThan(0, "Jam Akhir is Required")
      .min(
        yup.ref("id_jam_awal"),
        "Jam Akhir harus lebih besar atau sama dengan Jam Awal"
      ),

    id_mata_pelajaran: yup.string().required("Mata Pelajaran is Required"),
    id_pengajar: yup.string().required("Pengajar is Required"),
    kd_guru_piket: yup.string().required("Guru Piket is Required"),
  })
);

export const quickEntrySchenduleFormatter = (
  values: QuickEntrySchenduleModel
): QuickEntrySchenduleModel => {
  return {
    id_hari: values?.id_hari,
    id_ruangan_kelas: values?.id_ruangan_kelas,
    id_jam_awal: values?.id_jam_awal,
    id_jam_akhir: values?.id_jam_akhir,
    id_mata_pelajaran: values?.id_mata_pelajaran,
    id_pengajar: values?.id_pengajar,
    kd_guru_piket: values?.kd_guru_piket,
  };
};
