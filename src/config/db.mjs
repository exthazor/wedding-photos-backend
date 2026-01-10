import { Pool } from "pg";
import { env } from "./env.mjs";

const pool = new Pool({
  host: env.db.host,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  port: env.db.port,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("error", (err) => {
  console.log("Unexpected error on idle client", err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
