import express from "express";
import protect from "../middlewares/middlewares.js";
import { login, register, user } from "../controllers/controllers.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/user", protect, user);

export default router;
