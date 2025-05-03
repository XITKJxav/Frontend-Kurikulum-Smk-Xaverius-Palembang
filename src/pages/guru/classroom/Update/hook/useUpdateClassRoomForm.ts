import { useClassroompageContext } from "../../context";
import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  classroomreqDefaultValues,
  classRoomValidations,
  classRoomDetailsFormatter,
} from "../utils/form";
import { ClassRoomUpdateModel } from "@api/classroom/model";

interface HookReturn {
  classRoomUpdatereqForm: UseFormReturn<ClassRoomUpdateModel>;
}

const useUpdateClassRoomForm = (): HookReturn => {
  const { state } = useClassroompageContext();

  const classRoomUpdatereqForm = useForm<ClassRoomUpdateModel>({
    defaultValues: classroomreqDefaultValues,
    values: classRoomDetailsFormatter(state.classroomUpdatereqDetails),
    resolver: classRoomValidations as Resolver<ClassRoomUpdateModel>,
  });

  return {
    classRoomUpdatereqForm,
  };
};

export default useUpdateClassRoomForm;
