import {
  FormControl,
  TextField,
  Autocomplete,
  AutocompleteRenderInputParams,
} from "@mui/material";
import ErrorMessage from "@components/ErrorMessage";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface Option {
  id: string | number;
  label: string;
}

interface InputAutocompleteProps<T extends FieldValues = FieldValues> {
  field: ControllerRenderProps<T, any>;
  fieldState: {
    error?: {
      message?: string;
    };
  };
  size?: "small" | "medium";
  label?: string;
  id?: string;
  className?: string;
  data: Option[];
  allowClear?: boolean;
  onSearch?: boolean;
}

const InputAutocomplete = <T extends FieldValues = FieldValues>({
  field,
  fieldState,
  label = "Pilih",
  className,
  size = "medium",
  data,
  allowClear = true,
  onSearch = true,
}: InputAutocompleteProps<T>) => {
  const selectedOption = data.find((item) => item.id === field.value) || null;

  return (
    <>
      <FormControl
        fullWidth
        size={size}
        error={!!fieldState.error}
        className={className}
      >
        <Autocomplete
          disableClearable={!allowClear}
          options={data}
          getOptionLabel={(option) => option.label}
          value={selectedOption}
          onChange={(_, value) => field.onChange(value ? value.id : "")}
          isOptionEqualToValue={(option, value) => option.id === value?.id}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField
              {...params}
              label={label}
              variant="outlined"
              onKeyDown={(e) => !onSearch && e.preventDefault()}
            />
          )}
        />
      </FormControl>
      <ErrorMessage messageError={fieldState.error?.message} />
    </>
  );
};

export default InputAutocomplete;
