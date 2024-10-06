import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import axiosInstance from "../../axiosConfig";

function CardItem(props) {
  const { id, title, content, setTasks, setOpen, newTask, setNewTask } = props;

  async function handleDelete() {
    try {
      const result = await axiosInstance.delete(`/delete/task/${id}`);
      const taskId = result.data.id;
      setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.log(err);
    }
  }

  function handleEdit() {
    setNewTask({ id: id, title: title, content: content, addMode: false });
    setOpen(true);
  }

  return (
    <Card className="shadow-lg">
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Typography variant="body2">{content}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={handleEdit}>Edit</Button>
      </CardActions>
    </Card>
  );
}

export default CardItem;
