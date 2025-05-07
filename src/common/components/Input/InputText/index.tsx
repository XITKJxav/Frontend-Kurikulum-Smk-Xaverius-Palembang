import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ErrorMessage from "@components/ErrorMessage";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

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
}

const InputTextField = (props: InputTextProps) => {
  const {
    field,
    fieldState,
    label = "Input",
    id = "input",
    autoComplete = "off",
    type = "text",
    className,
    size = "medium",
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormControl
      fullWidth
      size={size}
      variant="outlined"
      error={!!fieldState.error}
    >
      <InputLabel htmlFor={id}>{label}</InputLabel>

      <OutlinedInput
        {...field}
        id={id}
        type={isPassword && showPassword ? "text" : type}
        autoComplete={autoComplete}
        label={label}
        value={field.value}
        size={size}
        className={className}
        endAdornment={
          isPassword ? (
            <InputAdornment position="end">
              <IconButton onClick={handleToggleVisibility} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : undefined
        }
      />
    </FormControl>
  );
};

export default InputTextField;
