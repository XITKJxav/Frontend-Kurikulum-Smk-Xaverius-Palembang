import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { GenerateJadwalModel } from "@api/jadwal/model";

export const generateJadwalreqDefaultValues: GenerateJadwalModel = {
  id_hari: 0,
  id_ruangan_kelas: 0,
  id_jam_awal: 0,
  id_jam_akhir: 0,
  id_mata_pelajaran: 0,
  id_pengajar: "",
  id_guru_piket: "",
};

export const generateJadwalValidations = yupResolver(
  yup.object().shape({
    id_hari: yup.number().required("Hari is Required"),
    id_ruangan_kelas: yup.number().required("Ruangan Kelas is Required"),
    id_jam_awal: yup.number().required("Jam Awal is Required"),
    id_jam_akhir: yup.number().required("Jam Akhir is Required"),
    id_mata_pelajaran: yup.number().required("Mata Pelajaran is Required"),
    id_pengajar: yup.string().required("Pengajar is Required"),
    id_guru_piket: yup.string().required("Guru Piket is Required"),
  })
);

export const generateJadwalFormatter = (
  values: GenerateJadwalModel
): GenerateJadwalModel => {
  return {
    id_hari: values?.id_hari,
    id_ruangan_kelas: values?.id_ruangan_kelas,
    id_jam_awal: values?.id_jam_awal,
    id_jam_akhir: values?.id_jam_akhir,
    id_mata_pelajaran: values?.id_mata_pelajaran,
    id_pengajar: values?.id_pengajar,
    id_guru_piket: values?.id_guru_piket,
  };
};
