import { ClassRoomCreateModel } from "@api/classroom/model";
import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  classRoomDetailsFormatter,
  classroomreqDefaultValues,
  classRoomValidations,
} from "../utils/form";
import { useClassroompageContext } from "../../context";

interface HookReturn {
  classroomreqForm: UseFormReturn<ClassRoomCreateModel>;
}

const useCreateClassRoomForm = (): HookReturn => {
  const { state } = useClassroompageContext();

  const classroomreqForm = useForm<ClassRoomCreateModel>({
    defaultValues: classroomreqDefaultValues,
    values: classRoomDetailsFormatter(state.classroomreqForm),
    resolver: classRoomValidations as Resolver<ClassRoomCreateModel>,
  });

  return {
    classroomreqForm,
  };
};
export default useCreateClassRoomForm;
