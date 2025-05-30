import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateJadwalModel } from "@api/jadwal/model";

export const createJadwalreqDefaultValues: CreateJadwalModel = {
  id_ruangan_kelas: 0,
};

export const createJadwalValidations = yupResolver(
  yup.object().shape({
    id_ruangan_kelas: yup.number().required("ID Ruangan tidak valid"),
  })
);

export const createJadwalFormatter = (
  data: CreateJadwalModel
): CreateJadwalModel => {
  return {
    id_ruangan_kelas: data?.id_ruangan_kelas,
  };
};
