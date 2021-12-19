// @ts-ignore
import Client from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export type User = {
  id?: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

const pepper: string = String(process.env.BCRYPT_PASSWORD);
const saltRounds: number = Number(process.env.SALT_ROUNDS);

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM users";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (username, "firstName", "lastName", password) VALUES($1, $2, $3, $4) RETURNING *';

      const hash = bcrypt.hashSync(u.password + pepper, saltRounds);

      const result = await conn.query(sql, [
        u.username,
        u.firstName,
        u.lastName,
        hash,
      ]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`);
    }
  }

  async update(b: User): Promise<User> {
    try {
      const sql =
        'UPDATE users set username = $1, "firstName" = $2, "lastName" = $3, password = $4 where id = $5 RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const hash = bcrypt.hashSync(b.password + pepper, saltRounds);
      const result = await conn.query(sql, [
        b.username,
        b.firstName,
        b.lastName,
        hash,
        b.id,
      ]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not update user ${b.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async getLastId(): Promise<number> {
    try {
      const sql = "SELECT max(id) as id FROM users";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, []);

      conn.release();

      return result.rows ? result.rows[0].id + 1 : 1;
    } catch (err) {
      throw new Error(`Could not find last id. Error: ${err}`);
    }
  }

  async cleanAll(): Promise<boolean> {
    try {
      const sql = "TRUNCATE users RESTART IDENTITY CASCADE;";
      // @ts-ignore
      const conn = await Client.connect();

      await conn.query(sql, []);

      conn.release();

      return true;
    } catch (err) {
      throw new Error(`Could not clean the table. Error: ${err}`);
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const conn = await Client.connect();
    const sql = "SELECT * FROM users WHERE username=($1)";

    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + pepper, user.password)) {
        return {
          ...user,
          jwt: jwt.sign(user, process.env.JWT_SECRET as jwt.Secret),
        };
      }
    }

    return null;
  }
}
