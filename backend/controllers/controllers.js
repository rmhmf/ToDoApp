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
          maxAge: 3 * 60 * 1000,
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

const user = (req, res) => {
  console.log("in /user");
  res.status(200).json({ message: "You have logged in successfully" });
};

export { footer, register, login, user };
