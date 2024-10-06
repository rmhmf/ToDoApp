import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../services/db.js";

const footer = (req, res) => {
  const footerText = "Designed by Reza";
  res.json({ text: footerText });
};

const register = async (req, res) => {
  console.log(req.body);
  const { email, password, birthDate } = req.body;

  const saltRound = parseInt(process.env.SALTROUND);

  try {
    const result = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    const item = result.rows;
    if (item.length == 1) {
      res
        .status(400)
        .json({ error: "The user already exists! Please log in." });
    } else {
      const hashPass = await bcrypt.hash(password, saltRound);
      const result = await db.query(
        "INSERT INTO users(email, password, birthday) VALUES($1, $2, $3)",
        [email, hashPass, birthDate]
      );
      res.sendStatus(200);
    }
  } catch (err) {
    res.status(500).json({ error: "Something went wrong!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (result.rows.length === 0) {
      res.status(400).json({ error: "Email address or password is wrong." });
    } else {
      const rightPass = await bcrypt.compare(password, result.rows[0].password);
      if (rightPass) {
        const userDB = result.rows[0];
        const payload = { id: userDB.id, email: userDB.email };
        const token = jwt.sign(payload, process.env.SECRETKEY, {
          expiresIn: "1h",
        });
        res.cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict", // CSRF protection
          maxAge: 30 * 60 * 1000,
        });
        res.status(200).json({ message: "Logged in successfully." });
      } else {
        res.status(400).json({ error: "Email address or password is wrong." });
      }
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ error: "Oops, something went wrong!" });
  }
};

const getAllTasks = async (req, res) => {
  const user = req.user;
  try {
    const result = await db.query("SELECT * FROM tasks WHERE userid = $1", [
      user.id,
    ]);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
  }
};

const verify = (req, res) => {
  try {
    const token = req.cookies[process.env.COOKIE_NAME];
    const user = jwt.verify(token, process.env.SECRETKEY);
    if (user) {
      res.status(200).json({ message: "verified." });
    } else {
      res.status(400).json({ message: "Not verified." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error in server. Not verified." });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(200).json({ message: "logged out successfully." });
  } catch (err) {
    res.status(500).json({ message: "can't logout." });
  }
};

const addTask = async (req, res) => {
  const user = req.user;
  const task = req.body;
  try {
    const result = await db.query(
      "INSERT INTO tasks(title, content, userid) VALUES ($1, $2, $3) RETURNING *",
      [task.title, task.content, user.id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "something is wrong" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskId = req.params.id;
    const result = await db.query(
      "DELETE FROM tasks WHERE id=$1 and userid=$2 RETURNING *",
      [taskId, userId]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
  }
};

const updateTask = async (req, res) => {
  try {
    const updatedTask = req.body;
    const user = req.user;
    const taskId = req.params.id;
    const result = await db.query(
      "UPDATE tasks SET title=$1, content=$2 WHERE id=$3 and userid=$4 RETURNING *",
      [updatedTask.title, updatedTask.content, taskId, user.id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "something went wrong" });
    console.log(err);
  }
};

export {
  footer,
  register,
  login,
  getAllTasks,
  verify,
  logout,
  addTask,
  deleteTask,
  updateTask,
};
