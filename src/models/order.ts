// @ts-ignore
import Client from "../database";

export type Order = {
  id?: number;
  product: number;
  quantity: number;
  userid: number;
  complete: boolean;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = "SELECT * FROM orders";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(b: Order): Promise<Order> {
    if (!b.quantity) {
      throw new Error("You must pass a real quantity!");
    }
    try {
      const sql =
        "INSERT INTO orders (product, quantity, userid, complete) VALUES ($1, $2, $3, $4) RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        b.product,
        b.quantity,
        b.userid,
        b.complete,
      ]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order ${b.product}. Error: ${err}`);
    }
  }

  async update(b: Order): Promise<Order> {
    try {
      const sql =
        "UPDATE orders set product = $1, quantity = $2, userid = $3, complete = $4 where id = $5 RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        b.product,
        b.quantity,
        b.userid,
        b.complete,
        b.id,
      ]);
      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not update order ${b.id}. Error: ${err}`);
    }
  }

  async getLastId(): Promise<number> {
    try {
      const sql = "SELECT max(id) as id FROM orders";
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
      const sql = "TRUNCATE orders RESTART IDENTITY CASCADE;";
      // @ts-ignore
      const conn = await Client.connect();

      await conn.query(sql, []);

      conn.release();

      return true;
    } catch (err) {
      throw new Error(`Could not clean the table. Error: ${err}`);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = "DELETE FROM orders WHERE id=($1)";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
