import express from "express";
import protect from "../middlewares/middlewares.js";
import {
  login,
  register,
  logout,
  getAllTasks,
  verify,
  footer,
  addTask,
  deleteTask,
  updateTask,
} from "../controllers/controllers.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.get("/footer", footer);

router.get("/user/verify", verify);
router.get("/user/tasks", protect, getAllTasks);
router.post("/add/task", protect, addTask);
router.delete("/delete/task/:id", protect, deleteTask);
router.put("/update/task/:id", protect, updateTask);

export default router;
