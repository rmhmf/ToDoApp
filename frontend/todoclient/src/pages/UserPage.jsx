import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import {
  AppBar,
  Drawer,
  Grid2,
  IconButton,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CardItem from "../component/CardItem";
import DialogForm from "../component/DialogForm";

function UserPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({ message: "" });
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    content: "",
    addMode: true,
  });

  const isLarge = useMediaQuery("(min-width: 640px)");

  const [isDrawer, setIsDrawer] = useState(isLarge);

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
    setNewTask((newTask) => {
      return { ...newTask, addMode: true };
    });
  }

  function toggleDrawer() {
    console.log("here");
    setIsDrawer(!isDrawer);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar position="sticky" className="h-16">
        <Toolbar className="space-x-4">
          <IconButton onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <p>Hello</p>
          <p>World</p>
        </Toolbar>
      </AppBar>

      <div className="flex flex-1">
        <Drawer
          variant={isLarge ? "persistent" : "temporary"}
          open={isDrawer}
          className={`transition-all duration-300 ease-in-out ${
            isDrawer ? "w-48" : "w-0"
          }`}
          onClose={toggleDrawer}
          PaperProps={{
            className: "mt-16 pl-2 pt-2 bg-gray-200",
            style: { backgroundColor: "#F9F9F9" },
          }}
        >
          <ul className="w-48">
            <li>Home</li>
            <li>Today</li>
            <li>Tomorrow</li>
            <li>This Week</li>
            <li>This Month</li>
            <li>This Year</li>
          </ul>
        </Drawer>

        <div className="flex-1 p-6">
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
        <DialogForm
          open={open}
          setOpen={setOpen}
          setTasks={setTasks}
          newTask={newTask}
          setNewTask={setNewTask}
        />
      </div>
    </div>
  );
}

export default UserPage;
