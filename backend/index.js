import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

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
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());

app.get("/footer", (req, res) => {
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
});

app.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("in /user");
    res.status(200).json({ message: "You have logged in successfully" });
  }
);

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req.cookies[process.env.COOKIE_NAME],
      ]),
      secretOrKey: process.env.SECRETKEY,
    },
    (jwtPayload, done) => {
      try {
        console.log(jwtPayload);
        if (jwtPayload) {
          done(null, jwtPayload);
        } else {
          done(null, false);
        }
      } catch (err) {
        done(err, false);
      }
    }
  )
);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
