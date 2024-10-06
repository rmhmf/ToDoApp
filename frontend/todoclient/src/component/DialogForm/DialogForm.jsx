import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axiosInstance from "../../axiosConfig";

function DialogForm(props) {
  const { open, setOpen, setTasks, newTask, setNewTask } = props;

  function handleClose() {
    setNewTask((newTask) => ({ ...newTask, title: "", content: "" }));
    setOpen(false);
  }

  async function handleAdd() {
    try {
      if (newTask.addMode) {
        const result = await axiosInstance.post("/add/task", newTask);
        setTasks((tasks) => [...tasks, result.data]);
      } else {
        const result = await axiosInstance.put(`/update/task/${newTask.id}`, {
          title: newTask.title,
          content: newTask.content,
        });
        const updatedTask = result.data;
        setTasks((tasks) => {
          return tasks.map((task) => {
            if (task.id === updatedTask.id) {
              return {
                ...task,
                title: updatedTask.title,
                content: updatedTask.content,
              };
            } else {
              return task;
            }
          });
        });
      }

      setOpen(false);
      setNewTask((newTask) => ({ ...newTask, title: "", content: "" }));
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new Task</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Task Title"
          name="title"
          fullWidth
          value={newTask.title}
          onChange={handleChange}
          required
        />
        <TextField
          margin="dense"
          label="Task Description"
          name="content"
          fullWidth
          multiline
          rows={4}
          value={newTask.content}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>close</Button>
        <Button onClick={handleAdd}>
          {newTask.addMode ? "Add" : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogForm;
