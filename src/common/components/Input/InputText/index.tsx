import { useState } from "react";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  SxProps,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ErrorMessage from "@components/ErrorMessage";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { Theme } from "@emotion/react";

interface InputTextProps<T extends FieldValues = FieldValues> {
  field: ControllerRenderProps<T, any>;
  fieldState: {
    error?: {
      message?: string;
    };
  };
  placeholder?: string;
  type?: string;
  size?: "small" | "medium";
  autoComplete?: string;
  label?: string;
  id?: string;
  className?: string;
  sx?: SxProps<Theme>;
  color?: string;
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
    sx,
    color,
    placeholder,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (type === "date" || type === "time") {
    return (
      <TextField
        {...field}
        id={id}
        label={label}
        type={type}
        autoComplete={autoComplete}
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
        fullWidth
        size={size}
        className={className}
        sx={sx}
        InputLabelProps={{
          shrink: true,
        }}
      />
    );
  }

  return (
    <FormControl
      fullWidth
      size={size}
      variant="outlined"
      error={!!fieldState.error}
    >
      <InputLabel htmlFor={id}>
        <span className={color}>{label}</span>
      </InputLabel>

      <OutlinedInput
        {...field}
        id={id}
        type={isPassword && showPassword ? "text" : type}
        autoComplete={autoComplete}
        label={label}
        placeholder={placeholder}
        value={field.value}
        size={size}
        className={className}
        sx={sx}
        endAdornment={
          isPassword ? (
            <InputAdornment position="end">
              <IconButton onClick={handleToggleVisibility} edge="end">
                {showPassword ? (
                  <VisibilityOff className={color} />
                ) : (
                  <Visibility className={color} />
                )}
              </IconButton>
            </InputAdornment>
          ) : undefined
        }
      />
      <ErrorMessage messageError={fieldState.error?.message} />
    </FormControl>
  );
};

export default InputTextField;
