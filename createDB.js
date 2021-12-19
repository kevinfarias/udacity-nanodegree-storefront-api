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

conn.connect().then((connection) => {
    const sql = `CREATE DATABASE ${process.env.DB_NAME}`;
    connection.query(sql);

    process.exit();
}).catch((err) => {
    console.log('err', err)
    process.exit();
});
