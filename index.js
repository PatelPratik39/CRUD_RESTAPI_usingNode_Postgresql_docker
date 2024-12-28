import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// -------------Middleware block------------
app.use(express.json());
app.use(cors);

// -------- ROUTES ---------------

// ------------ Error handling ----------------

// -------- Server Running -----------
app.listen(port, () => {
  console.log(
    chalk.bold.green(`Server is running on http://localhost:${port}`)
  );
});
