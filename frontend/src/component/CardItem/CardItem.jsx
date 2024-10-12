import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import axiosInstance from "../../axiosConfig";

function CardItem(props) {
  const { id, title, content, setTasks, setOpen, newTask, setNewTask, isDone } =
    props;

  const [done, setDone] = useState(isDone);

  async function handleDelete() {
    try {
      const result = await axiosInstance.delete(`/delete/task/${id}`);
      const taskId = result.data.id;
      setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleIsDone() {
    try {
      const result = await axiosInstance.put(`/update/task/${id}`, {
        title: title,
        content: content,
        is_done: !done,
      });
      setDone(result.data.is_done);
    } catch (err) {}
  }

  function handleEdit() {
    setNewTask({ id: id, title: title, content: content, addMode: false });
    setOpen(true);
  }

  return (
    <Card className="shadow-lg">
      <CardContent>
        <Typography
          onClick={handleIsDone}
          variant="h5"
          className={`cursor-pointer ${done ? "line-through" : null}`}
        >
          {title}
        </Typography>
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
