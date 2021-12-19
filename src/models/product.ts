// @ts-ignore
import Client from "../database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: number;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM products";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async cleanAll(): Promise<boolean> {
    try {
      const sql = "TRUNCATE products RESTART IDENTITY CASCADE;";
      // @ts-ignore
      const conn = await Client.connect();

      await conn.query(sql, []);

      conn.release();

      return true;
    } catch (err) {
      throw new Error(`Could not clean the table. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  async getLastId(): Promise<number> {
    try {
      const sql = "SELECT max(id) as id FROM products";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, []);

      conn.release();

      return result.rows ? result.rows[0].id + 1 : 1;
    } catch (err) {
      throw new Error(`Could not find last id. Error: ${err}`);
    }
  }

  async create(b: Product): Promise<Product> {
    try {
      const sql =
        "INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.name, b.price, b.category]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${b.name}. Error: ${err}`);
    }
  }

  async update(b: Product): Promise<Product> {
    try {
      const sql =
        "UPDATE products set name = $1, price = $2, category = $3 where id = $4 RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.name, b.price, b.category, b.id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not update product ${b.id}. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id in ($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}
