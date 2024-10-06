import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import Header from "../component/Header";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { Grid2 } from "@mui/material";
import CardItem from "../component/CardItem";
import DialogForm from "../component/DialogForm";

function UserPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({ message: "" });
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axiosInstance.get("/user/verify");
        const result = await axiosInstance.get("/user/tasks");
        setTasks(result.data);
      } catch (err) {
        navigate("/login");
      }
    };
    fetchData();
  }, []);

  function addClicked() {
    setOpen(true);
  }

  return (
    <div>
      <Header page="user" email={data.email} />
      <div className="flex flex-col sm:flex-row sm:h-screen">
        <div className="bg-pink-300 sm:w-1/6">
          <p>list</p>
        </div>

        <div className="bg-green-300 sm:w-5/6 p-4">
          <Grid2 container spacing={3}>
            {tasks.map((task) => (
              <Grid2 item xs={12} sm={6} md={4} lg={3}>
                <CardItem title={task.title} content={task.content} />
              </Grid2>
            ))}
          </Grid2>
          <Fab
            className="fixed bottom-5 right-5"
            color="primary"
            aria-label="add"
            onClick={addClicked}
          >
            <AddIcon />
          </Fab>
        </div>
        <DialogForm open={open} setOpen={setOpen} setTasks={setTasks} />
      </div>
    </div>
  );
}

export default UserPage;
