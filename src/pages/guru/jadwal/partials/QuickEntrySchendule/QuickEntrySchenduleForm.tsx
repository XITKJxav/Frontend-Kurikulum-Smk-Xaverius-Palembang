import { ActionButton } from "@components/Button";
import { FormProvider } from "react-hook-form";
import QuickEntrySchenduleDialog from "./QuickEntrySchenduleDialog";
import { useJadwalpageContext } from "../../context";
import { useState } from "react";
import useQuickEntrySchenduleForm from "../../QuickEntrySchendule/hook/useQuickEntrySchenduleForm";
import { AutoMode, Checklist } from "@mui/icons-material";

interface Props {
  onDay: string | number;
  onClass: string | number;
}

const QuickEntrySchenduleForm = (props: Props) => {
  const { onDay, onClass } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { state } = useJadwalpageContext();
  const { schenduleDayReq } = state;
  const { quickEntrySchendulereqForm } = useQuickEntrySchenduleForm();

  const handleCloseDialog = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {schenduleDayReq.length > 0 && (
        <>
          <ActionButton
            label="Quick Entry"
            color="primary"
            icon={<AutoMode />}
            onClick={() => handleCloseDialog()}
          />
          <FormProvider {...quickEntrySchendulereqForm}>
            <QuickEntrySchenduleDialog
              isOpen={isOpen}
              onClose={handleCloseDialog}
              onDay={Number(onDay)}
              onClass={Number(onClass)}
            />
          </FormProvider>
        </>
      )}
    </>
  );
};
export default QuickEntrySchenduleForm;
