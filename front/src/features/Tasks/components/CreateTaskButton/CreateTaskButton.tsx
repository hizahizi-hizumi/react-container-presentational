import { Add as AddIcon } from "@mui/icons-material";
import { Fab, useTheme } from "@mui/material";

interface CreateTaskButtonProps {
  onClick: () => void;
}

export function CreateTaskButton(props: CreateTaskButtonProps): JSX.Element {
  const { onClick } = props;

  const theme = useTheme();

  return (
    <>
      <Fab
        color="primary"
        onClick={onClick}
        sx={{
          position: "fixed",
          bottom: theme.spacing(2),
          right: theme.spacing(2),
          opacity: 0.5,
          transition: "0.1s",
          "&:hover": {
            opacity: 1,
          },
        }}
      >
        <AddIcon />
      </Fab>
    </>
  );
}
