import Client from "../database";

export const retrieveOrders = async (
  userId: number,
  complete: boolean
): Promise<object[]> => {
  try {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = `SELECT pa.*, p.name as product_name 
                 FROM orders pa
                 JOIN products p on pa.product = p.id
                 WHERE pa.userid = $1 and pa.complete = $2`;

    const result = await conn.query(sql, [userId, complete]);

    conn.release();

    return result.rows;
  } catch (err) {
    throw new Error(`Could not get orders. Error: ${err}`);
  }
};
