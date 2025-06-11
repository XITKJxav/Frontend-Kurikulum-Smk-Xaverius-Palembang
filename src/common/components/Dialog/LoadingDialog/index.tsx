import { JSX } from "@emotion/react/jsx-runtime";
import { CircularProgress, Dialog } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
}

function LoadingDialog(props: Props): JSX.Element {
  const { open, onClose } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: "fit-content",
          padding: "1rem",
          borderRadius: 10,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          color: "white",
          userSelect: "text",
        },
      }}
      disableRestoreFocus={true}
    >
      <CircularProgress sx={{ color: "#4D55CC" }} />
    </Dialog>
  );
}

export default LoadingDialog;
