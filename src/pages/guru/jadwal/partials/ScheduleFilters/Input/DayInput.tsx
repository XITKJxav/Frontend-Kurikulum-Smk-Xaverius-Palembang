import { DayModel } from "@api/jadwal/model";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { menuProps } from "../utils/menuProps";

interface Props {
  onChange: (event: SelectChangeEvent<string>) => void;
  data: DayModel[];
  value: string;
}

const DayInput = ({ onChange, value, data }: Props) => {
  return (
    <div className="flex items-center w-full gap-2">
      <label>Hari</label>
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
            Pilih Hari
          </MenuItem>
          {data.map((item) => (
            <MenuItem key={item.id} value={String(item.id)}>
              {item.nama}
            </MenuItem>
          ))}
        </Select>
      )}
    </div>
  );
};
export default DayInput;
