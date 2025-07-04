import {
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  Typography,
} from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import ActionButton from "../../Button/ActionButton";
import { JSX } from "@emotion/react/jsx-runtime";

interface Props {
  className?: string;
  open: boolean;
  onClose: () => void;
  onClickDelete: () => void;
}
function ConfirmDeleteDialog(props: Props): JSX.Element {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        style: {
          width: 360,
          margin: "0",
          borderRadius: 20,
          backgroundColor: "#373737",
          color: "white",
          opacity: 0.9,
        },
      }}
      disableRestoreFocus={true}
    >
      <DialogContent className="flex flex-col items-center">
        <Icon style={{ width: 64, height: 64 }}>
          <DeleteForever style={{ width: 64, height: 64 }} />
        </Icon>
        <Typography align="center" className="font-bold">
          Are you sure deleting this?
        </Typography>
      </DialogContent>
      <DialogActions className="justify-center mx-auto my-2">
        <ActionButton
          label="Cancel"
          onClick={props.onClose}
          variant="outlined"
          color="inherit"
        />
        <ActionButton
          label="Delete"
          onClick={props.onClickDelete}
          variant="contained"
          color="secondary"
          className="opacity-90"
          autoFocus
        />
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDeleteDialog;
