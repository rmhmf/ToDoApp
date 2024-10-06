import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";

function CardItem(props) {
  const { title, content } = props;

  function handleDelete() {}

  function handleEdit() {}

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
