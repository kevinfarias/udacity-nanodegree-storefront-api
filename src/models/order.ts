// @ts-ignore
import Client from "../database";

export type OrderProduct = {
  product: number;
  quantity: number;
};

export type Order = {
  id?: number;
  userid: number;
  complete: boolean;
  products?: OrderProduct[];
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
      const conn = await Client.connect();

      const sql = "SELECT * FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);

      const sqlProducts =
        "SELECT product, quantity FROM orders_products WHERE orderid=($1)";
      const products = await conn.query(sqlProducts, [id]);

      conn.release();

      return { ...result.rows[0], products: products.rows };
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(b: Order): Promise<Order> {
    const totalQuantity: number | undefined = b.products
      ?.map((row) => row.quantity)
      .reduce((a: number, b: number) => {
        return a + b;
      });
    if (!b.products || !totalQuantity) {
      throw new Error("You must pass a real quantity!");
    }
    try {
      const conn = await Client.connect();
      let order;
      if (!b.id) {
        const sqlCreate =
          "INSERT INTO orders (userid, complete) VALUES ($1, $2) RETURNING *";
        const result = await conn.query(sqlCreate, [b.userid, b.complete]);
        order = result.rows[0];
      } else {
        order = await this.show(b.id);
      }
      const orderId = order.id;
      b.products.map(async (row: OrderProduct): Promise<void> => {
        const sql =
          "INSERT INTO orders_products (product, orderid, quantity) VALUES ($1, $2, $3) RETURNING *";
        await conn.query(sql, [row.product, orderId, row.quantity]);
      });

      const sqlProducts =
        "SELECT product, quantity FROM orders_products WHERE orderid=($1)";
      const products = (await conn.query(sqlProducts, [orderId])).rows;

      conn.release();

      return { ...order, products };
    } catch (err) {
      throw new Error(
        `Could not add new order ${JSON.stringify(b.products)}. Error: ${err}`
      );
    }
  }

  async update(b: Order): Promise<Order> {
    try {
      const sql =
        "UPDATE orders set userid = $1, complete = $2 where id = $3 RETURNING *";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [b.userid, b.complete, b.id]);
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
      const conn = await Client.connect();

      const sqlProducts = "DELETE FROM orders_products WHERE orderid=($1)";
      await conn.query(sqlProducts, [id]);

      const sql = "DELETE FROM orders WHERE id=($1)";
      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
