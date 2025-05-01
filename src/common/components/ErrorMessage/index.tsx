import { Alert } from "@mui/material";

interface Props {
  messageError?: string;
  className?: string;
}

const ErrorMessage = ({ messageError, className }: Props) => {
  if (!messageError) return null;

  return (
    <Alert
      severity="error"
      variant="outlined"
      className={className}
      sx={{
        mt: 1,
        fontSize: "0.875rem",
        borderRadius: 2,
        alignItems: "center",
        px: 2,
        py: 1,
        bgcolor: "rgba(255, 235, 238, 0.6)",
        backdropFilter: "blur(6px)",
      }}
    >
      {messageError}
    </Alert>
  );
};

export default ErrorMessage;
