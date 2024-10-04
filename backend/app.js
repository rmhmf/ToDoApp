import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import passport from "passport";
import cookieParser from "cookie-parser";

import routes from "./routes/routes.js";
import { passJwt } from "./config/passport.js";

const app = express();

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

passJwt(passport);

app.use("/api", routes);

export default app;
