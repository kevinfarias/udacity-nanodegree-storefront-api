import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

if (!process.env.ENV) {
  process.env.ENV = "dev";
}

const conn = new pg.Pool({
  connectionString: `postgres://${process.env.DB_USER}:${
    process.env.DB_PASSWORD
  }@${process.env.DB_HOST}:${process.env.DB_PORT}/${
    process.env.ENV == "test" ? process.env.DB_TEST_NAME : process.env.DB_NAME
  }`,
});

const types = require("pg").types;
types.setTypeParser(1700, function (val: string) {
  return parseFloat(val);
});

export default conn;
