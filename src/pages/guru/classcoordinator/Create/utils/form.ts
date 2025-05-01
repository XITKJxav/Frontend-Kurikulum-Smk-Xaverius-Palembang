import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClassRoomCreateModel } from "@api/classroom/model";

export const classroomreqDefaultValues: ClassRoomCreateModel = {
  nomor_ruangan: "",
  kd_jurusan: "",
};

export const classRoomValidations = yupResolver(
  yup.object().shape({
    nomor_ruangan: yup.string().required("Name Class Room is required"),
    kd_jurusan: yup.string().required("jurusan is required"),
  })
);

export const classRoomDetailsFormatter = (
  data: ClassRoomCreateModel
): ClassRoomCreateModel => {
  return {
    nomor_ruangan: data.nomor_ruangan,
    kd_jurusan: data.kd_jurusan,
  };
};
