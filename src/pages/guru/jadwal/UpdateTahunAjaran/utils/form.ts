import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateTahunAjaranModel } from "@api/jadwal/model";

export const updatetahunajaranreqDefaultValues: UpdateTahunAjaranModel = {
  tahun_ajaran_akhir: "",
  tahun_ajaran_awal: "",
};

const yearDateStringSchema = yup
  .string()
  .required("Tahun wajib diisi")
  .test("valid-date", "Format tahun tidak valid", (value) => {
    const date = new Date(value ?? "");
    return !isNaN(date.getTime());
  })
  .test("year-range", "Tahun harus antara 2000 dan 2100", (value) => {
    if (!value) return false;
    const year = new Date(value).getFullYear();
    return year >= 2000 && year <= 2100;
  });

export const updatetahunajaranValidations = yupResolver(
  yup.object().shape({
    tahun_ajaran_awal: yearDateStringSchema.label("Tahun ajaran awal"),
    tahun_ajaran_akhir: yearDateStringSchema
      .label("Tahun ajaran akhir")
      .test(
        "is-greater",
        "Tahun ajaran akhir harus lebih besar dari tahun ajaran awal",
        function (value) {
          const { tahun_ajaran_awal } = this.parent;
          if (!value || !tahun_ajaran_awal) return false;
          return (
            new Date(value).getFullYear() >
            new Date(tahun_ajaran_awal).getFullYear()
          );
        }
      ),
  })
);

export const updatetahunajaranFormatter = (
  values: UpdateTahunAjaranModel
): UpdateTahunAjaranModel => {
  return {
    tahun_ajaran_awal: values.tahun_ajaran_awal,
    tahun_ajaran_akhir: values.tahun_ajaran_akhir,
  };
};
