import Client from "../database";

export const retrievePopular = async (amount: number): Promise<object[]> => {
  try {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = `SELECT p.*, count(distinct pa.id) as order_quantity 
                 FROM orders pa
                 JOIN products p on pa.product = p.id
                 GROUP BY p.id
                 ORDER BY count(distinct pa.id) DESC
                 LIMIT $1`;

    const result = await conn.query(sql, [amount]);

    conn.release();

    return result.rows;
  } catch (err) {
    throw new Error(`Could not get popular products. Error: ${err}`);
  }
};

export const retrieveByCategory = async (
  categoryId: number
): Promise<object[]> => {
  try {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = `SELECT pa.*
                 FROM products pa
                 WHERE pa.category = $1`;

    const result = await conn.query(sql, [categoryId]);

    conn.release();

    return result.rows;
  } catch (err) {
    throw new Error(`Could not get products by category. Error: ${err}`);
  }
};
