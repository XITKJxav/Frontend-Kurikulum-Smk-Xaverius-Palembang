import { SelectChangeEvent } from "@mui/material";
import { useJadwalpageContext } from "../../context";
import ClassInput from "./Input/ClassInput";
import DayInput from "./Input/DayInput";
interface Props {
  onDay: string;
  onClass: string;
  onChangeDay: (event: SelectChangeEvent<string>) => void;
  onChangeClass: (event: SelectChangeEvent<string>) => void;
}
const SchenduleFiltersBody = ({
  onDay,
  onClass,
  onChangeDay,
  onChangeClass,
}: Props) => {
  const { state } = useJadwalpageContext();
  const { schenduleDayReq, classRoomRequest } = state;

  return (
    <div className="flex w-full gap-3 mb-4">
      <ClassInput
        value={onClass}
        onChange={onChangeClass}
        data={classRoomRequest}
      />
      <DayInput value={onDay} onChange={onChangeDay} data={schenduleDayReq} />
    </div>
  );
};
export default SchenduleFiltersBody;
