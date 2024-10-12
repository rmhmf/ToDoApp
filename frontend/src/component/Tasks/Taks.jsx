import { Fab, Grid2 } from "@mui/material";
import React from "react";
import CardItem from "../CardItem";
import AddIcon from "@mui/icons-material/Add";

function Tasks(props) {
  const { setOpen, setNewTask, tasks, setTasks, newTask } = props;

  function addClicked() {
    setOpen(true);
    setNewTask((newTask) => {
      return { ...newTask, addMode: true };
    });
  }

  return (
    <div className="flex-1 pt-6 pl-12">
      <Grid2 container spacing={3}>
        {tasks.map((task) => (
          <Grid2 key={task.id} item xs={12} sm={6} md={4} lg={3}>
            <CardItem
              id={task.id}
              title={task.title}
              content={task.content}
              setTasks={setTasks}
              setOpen={setOpen}
              newTask={newTask}
              setNewTask={setNewTask}
              isDone={task.is_done}
            />
          </Grid2>
        ))}
      </Grid2>
      <Fab
        sx={{ position: "fixed", bottom: 32, right: 32 }}
        color="primary"
        aria-label="add"
        onClick={addClicked}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default Tasks;
