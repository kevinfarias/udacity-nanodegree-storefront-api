// @ts-ignore
import Client from "../database";

export type Category = {
  id?: number;
  name: string;
};

export class CategoryStore {
  async index(): Promise<Category[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM categories";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get categories. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Category> {
    try {
      const sql = "SELECT * FROM categories WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find category ${id}. Error: ${err}`);
    }
  }

  async getLastId(): Promise<number> {
    try {
      const sql = "SELECT max(id) as id FROM categories";
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
      const sql = "TRUNCATE categories RESTART IDENTITY CASCADE;";
      // @ts-ignore
      const conn = await Client.connect();

      await conn.query(sql, []);

      conn.release();

      return true;
    } catch (err) {
      throw new Error(`Could not clean the table. Error: ${err}`);
    }
  }

  async create(b: Category): Promise<Category> {
    try {
      const sql = "INSERT INTO categories (name) VALUES($1) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.name]);

      const category = result.rows[0];

      conn.release();

      return category;
    } catch (err) {
      throw new Error(`Could not add new category ${b.name}. Error: ${err}`);
    }
  }

  async update(b: Category): Promise<Category> {
    try {
      const sql = "UPDATE categories set name = $1 where id = $2 RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.name, b.id]);

      const category = result.rows[0];

      conn.release();

      return category;
    } catch (err) {
      throw new Error(`Could not update category ${b.name}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Category> {
    try {
      const sql = "DELETE FROM categories WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const category = result.rows[0];

      conn.release();

      return category;
    } catch (err) {
      throw new Error(`Could not delete category ${id}. Error: ${err}`);
    }
  }
}
