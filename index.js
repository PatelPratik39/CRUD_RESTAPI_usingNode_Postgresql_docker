import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import pool from "./src/config/db.js";
import userRoutes from "./src/routes/userRoute.js";
import errorHandling from "./src/middlewares/errorHandler.js";
import createUserTable from "./src/data/createUserTable.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// -------------Middleware block------------

app.use(express.json());
app.use(cors());

// -------- ROUTES ---------------

app.use("/api", userRoutes);

// ------------ Error handling ----------------
app.use(errorHandling);

// Create table before startig server
createUserTable();

// --------- TESTING Database Connection

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT current_database()");
  console.log("end");
  res
    .status(200)
    .send(`The database name is : ${result.rows[0].current_database}`);
});

// -------- Server Running -----------
app.listen(port, () => {
  console.log(chalk.bold.cyan(`Server is running on http://localhost:${port}`));
});
