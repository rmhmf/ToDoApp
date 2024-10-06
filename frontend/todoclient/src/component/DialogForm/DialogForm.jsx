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
  const { open, setOpen, setTasks } = props;
  const [newTask, setNewTask] = useState({ title: "", content: "" });

  function handleClose() {
    setNewTask({ title: "", content: "" });
    setOpen(false);
  }

  async function handleAdd() {
    try {
      const result = await axiosInstance.post("/add/task", newTask);
      setTasks((tasks) => [
        ...tasks,
        { title: newTask.title, content: newTask.content },
      ]);
      setOpen(false);
      setNewTask({ title: "", content: "" });
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
        <Button onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogForm;
