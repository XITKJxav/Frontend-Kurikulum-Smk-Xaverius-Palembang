import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ClassRoomUpdateModel } from "@api/classroom/model";

export const classroomreqDefaultValues: ClassRoomUpdateModel = {
  nomor_ruangan: "",
  kd_jurusan: "",
  status: false,
};

export const classRoomValidations = yupResolver(
  yup.object().shape({
    nomor_ruangan: yup.string().required("nomor ruangan is Required"),
    kd_jurusan: yup.string().required("nomor ruangan is Required"),
    status: yup.boolean().required("Status is Required"),
  })
);

export const classRoomDetailsFormatter = (
  data: ClassRoomUpdateModel
): ClassRoomUpdateModel => {
  return {
    nomor_ruangan: data?.nomor_ruangan,
    kd_jurusan: data?.kd_jurusan,
    status: data?.status || false,
  };
};
