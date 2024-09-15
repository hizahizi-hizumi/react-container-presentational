import { Alert, Snackbar } from "@mui/material";

interface SuccessSnackbarProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export function SuccessSnackbar(props: SuccessSnackbarProps): JSX.Element {
  const { isOpen, onClose, message } = props;

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
