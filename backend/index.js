import express from "express";
import cors from "cors";

import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3001;

console.log(__dirname);

app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/footer", (req, res) => {
  console.log(req.body);
  const footerText = "Designed by Reza";
  res.json({ text: footerText });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
