import { menuProps } from "../utils/menuProps";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ClassRoomOptionModel } from "@api/HealthOption/model";

interface Props {
  onChange: (event: SelectChangeEvent<string>) => void;
  data: ClassRoomOptionModel[];
  value: string;
}

const ClassInput = ({ onChange, value, data }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <label>Kelas</label>
      {data.length > 0 && (
        <Select
          displayEmpty
          fullWidth
          value={value}
          onChange={onChange}
          variant="outlined"
          MenuProps={menuProps}
        >
          <MenuItem value="" disabled>
            Pilih Kelas
          </MenuItem>
          {data.map((iitem) => (
            <MenuItem key={iitem?.id} value={String(iitem?.id)}>
              {iitem?.nama_ruangan}
            </MenuItem>
          ))}
        </Select>
      )}
    </div>
  );
};
export default ClassInput;
