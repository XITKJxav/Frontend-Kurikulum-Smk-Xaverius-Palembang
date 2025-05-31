import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  ekstrakurikulerDetailsFormatter,
  ekstrakurikulerreqDefaultValues,
  ekstrakurikulerValidations,
} from "../utils/form";
import { useEkstrakurikulerpageContext } from "../../context";
import { CreateEkstrakurikulerRequestModel } from "@api/ekstrakurikuler/model";

interface HookReturn {
  ekstrakurikulerareqForm: UseFormReturn<CreateEkstrakurikulerRequestModel>;
}

const useCreateEkstrakurikulerForm = (): HookReturn => {
  const { state } = useEkstrakurikulerpageContext();

  const ekstrakurikulerareqForm = useForm<CreateEkstrakurikulerRequestModel>({
    defaultValues: ekstrakurikulerreqDefaultValues,
    values: ekstrakurikulerDetailsFormatter(state.ekstrakurikulerreqDetails),
    resolver:
      ekstrakurikulerValidations as Resolver<CreateEkstrakurikulerRequestModel>,
  });

  return {
    ekstrakurikulerareqForm,
  };
};

export default useCreateEkstrakurikulerForm;
