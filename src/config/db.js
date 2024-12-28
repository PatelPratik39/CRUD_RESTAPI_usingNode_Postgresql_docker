import chalk from "chalk";
import pkg from "pg";
import dotenv from "dotenv";

const { Pool } = pkg;
dotenv.config();

console.log(process.env.USER);
console.log(process.env.HOST);

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DBPORT
});

pool.on("connect", () => {
  console.log(chalk.bold.magenta("Connection pool established with Docker .."));
});

export default pool;
