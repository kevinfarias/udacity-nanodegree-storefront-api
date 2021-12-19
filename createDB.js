const dotenv = require("dotenv");
const pg = require("pg");

dotenv.config();

if (!process.env.ENV) {
  process.env.ENV = "dev";
}

const conn = new pg.Pool({
  connectionString: `postgres://${process.env.DB_USER}:${
    process.env.DB_PASSWORD
  }@${process.env.DB_HOST}:${process.env.DB_PORT}/postgres`,
});

const conn = await Client.connect();
const sql = `CREATE DATABASE ${process.env.DB_NAME}`;

await conn.query(sql);

conn.release();
