import { Resolver, useForm, UseFormReturn } from "react-hook-form";
import {
  ekstrakurikulerDetailsFormatter,
  ekstrakurikulerreqDefaultValues,
  ekstrakurikulerValidations,
} from "../utils/form";
import { useEkstrakurikulerpageContext } from "../../context";
import { UpdateEkstrakurikulerRequestModel } from "@api/ekstrakurikuler/model";

interface HookReturn {
  updateekstrakurikulerreqForm: UseFormReturn<UpdateEkstrakurikulerRequestModel>;
}

const useUpdateEkstrakurikulerForm = (): HookReturn => {
  const { state } = useEkstrakurikulerpageContext();

  const updateekstrakurikulerreqForm =
    useForm<UpdateEkstrakurikulerRequestModel>({
      defaultValues: ekstrakurikulerreqDefaultValues,
      values: ekstrakurikulerDetailsFormatter(
        state.ekstrakurikulerUpdatereqDetails
      ),
      resolver:
        ekstrakurikulerValidations as Resolver<UpdateEkstrakurikulerRequestModel>,
    });

  return {
    updateekstrakurikulerreqForm,
  };
};

export default useUpdateEkstrakurikulerForm;
