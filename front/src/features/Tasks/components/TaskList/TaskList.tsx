import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";

import type { Task } from "@/types/task";

interface TaskListProps {
  tasks: Task[];
  onEditButtonClick: (task: Task) => void;
  onDeleteButtonClick: (task: Task) => void;
}

export function TaskList(props: TaskListProps): JSX.Element {
  const { tasks, onEditButtonClick, onDeleteButtonClick } = props;

  if (tasks.length === 0) {
    return <p>タスクがありません</p>;
  }

  return (
    <List>
      {tasks.map((task) => (
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
      ))}
    </List>
  );
}
