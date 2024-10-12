import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosConfig";
import {
  AppBar,
  Drawer,
  IconButton,
  Toolbar,
  useMediaQuery,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import DialogForm from "../component/DialogForm";
import Tasks from "../component/Tasks";
import CalendarPage from "../component/CalendarPage";
import BarChartIcon from "@mui/icons-material/BarChart";

function UserPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState("/Homepage");
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

  function toggleDrawer() {
    console.log("here");
    setIsDrawer(!isDrawer);
  }

  const listItems = [
    {
      icon: <HomeIcon />,
      text: "Homepage",
    },
    {
      icon: <CalendarMonthIcon />,
      text: "Calendar",
    },
    {
      icon: <BarChartIcon />,
      text: "Analysis",
    },
    {
      icon: <SettingsIcon />,
      text: "Setting",
    },
  ];

  function selectedContent() {
    switch (page) {
      case "/Homepage":
        return (
          <Tasks
            setOpen={setOpen}
            setNewTask={setNewTask}
            tasks={tasks}
            setTasks={setTasks}
            newTask={newTask}
          />
        );
      case "/Calendar":
        return <CalendarPage />;
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar position="sticky" className="h-16">
        <Toolbar className="space-x-4" sx={{ backgroundColor: "#FF921C" }}>
          <IconButton onClick={toggleDrawer}>
            {isDrawer ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
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
            className: "mt-16 bg-gray-200",
            style: { backgroundColor: "#F9F9F9" },
          }}
        >
          <List
            className="w-48 bg-gray-100"
            component="nav"
            // subheader={<ListSubheader>Items</ListSubheader>}
          >
            {listItems.map((item) => (
              <ListItemButton onClick={() => setPage(`/${item.text}`)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ))}
          </List>
        </Drawer>

        {selectedContent()}

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
