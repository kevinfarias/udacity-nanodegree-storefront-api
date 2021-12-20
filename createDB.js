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

const createUser = async (connection, username, password) => {
  const sql = `CREATE USER ${username} WITH ENCRYPTED PASSWORD '${password}';`;
  await connection.query(sql);
  const sqlPermission = `ALTER USER ${username} WITH SUPERUSER;`;
  await connection.query(sqlPermission);
}

const createDatabase = async (connection, database) => {
    const sql = `CREATE DATABASE ${database};`;
    await connection.query(sql);
}

conn.connect().then((connection) => {
    await createUser(connection, process.env.DB_USER, process.env.DB_PASSWORD);
    await createDatabase(connection, process.env.DB_NAME)
    await createDatabase(connection, process.env.DB_TEST_NAME)

    process.exit();
}).catch((err) => {
    console.log('err', err)
    process.exit();
});
