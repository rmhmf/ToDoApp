import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";

import pg from "pg";
import bcrypt from "bcrypt";
import env from "dotenv";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

env.config();

const app = express();
const port = process.env.PORT;

const db = new pg.Client({
  user: process.env.DBUSER,
  host: process.env.DBHOST,
  database: process.env.DBNAME,
  password: process.env.DBPASS,
  port: process.env.DBPORT,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use(passport.initialize());

app.get("/footer", (req, res) => {
  console.log(req.body);
  const footerText = "Designed by Reza";
  res.json({ text: footerText });
});

app.post("/register", async (req, res) => {
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
});

app.post("/login", async (req, res) => {
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
          expiresIn: ".5h",
        });
        res.status(200).json({ token });
      } else {
        res.status(400).json({ error: "Email address or password is wrong." });
      }
    }
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ error: "Oops, something went wrong!" });
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
