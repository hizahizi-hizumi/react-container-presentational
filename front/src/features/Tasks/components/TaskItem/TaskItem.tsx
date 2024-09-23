import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { Button, ButtonGroup, Grid, ListItem, Typography } from "@mui/material";

import type { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onEditButtonClick: (task: Task) => void;
  onDeleteButtonClick: (task: Task) => void;
}

export function TaskItem(props: TaskItemProps): JSX.Element {
  const { task, onEditButtonClick, onDeleteButtonClick } = props;

  return (
    <>
      <ListItem key={task.id} divider>
        <Grid container>
          <Grid item xs={10} sx={{ display: "flex", alignItems: "center" }}>
            <Typography>{task.title}</Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
            <ButtonGroup size="small">
              <Button
                color="inherit"
                onClick={() => onEditButtonClick(task)}
                variant="contained"
                disableElevation
              >
                <EditIcon />
              </Button>
              <Button
                color="error"
                onClick={() => onDeleteButtonClick(task)}
                variant="contained"
                disableElevation
              >
                <DeleteIcon />
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
}
