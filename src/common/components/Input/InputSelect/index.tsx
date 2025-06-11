import { FormControl, Select } from "@mui/material";
import ErrorMessage from "@components/ErrorMessage";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface Option {
  id: string | number;
  label: string;
}

interface InputTextProps<T extends FieldValues = FieldValues> {
  field: ControllerRenderProps<T, any>;
  fieldState: {
    error?: {
      message?: string;
    };
  };
  type?: string;
  size?: "small" | "medium";
  autoComplete?: string;
  label?: string;
  id?: string;
  className?: string;
  data?: Option[];
}

const InputSelect = <T extends FieldValues = FieldValues>(
  props: InputTextProps<T>
) => {
  const {
    field,
    fieldState,
    label = "Input",
    id = "input",
    className,
    size = "medium",
    data,
  } = props;

  return (
    <FormControl
      fullWidth
      size={size}
      error={!!fieldState.error}
      className={className}
    >
      <label htmlFor={id} className="block mb-1 text-sm text-gray-700">
        {label}
      </label>
      <Select
        native
        id={id}
        {...field}
        value={field.value || ""}
        onChange={(e) => field.onChange(e.target.value)}
      >
        <option value="" disabled>
          -- {label} --
        </option>
        {data?.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </Select>
      <ErrorMessage messageError={fieldState.error?.message} />
    </FormControl>
  );
};

export default InputSelect;
