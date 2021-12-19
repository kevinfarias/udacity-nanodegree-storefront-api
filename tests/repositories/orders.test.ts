import * as repository from "../../src/repositories/orders";
import { OrderStore } from "../../src/models/order";

const store = new OrderStore();

describe("Orders repository", () => {
  beforeAll(async () => {
    await store.cleanAll();
  });

  it("retrieveOrders method should return an empty list", async () => {
    const result = await repository.retrieveOrders(1, true);
    expect(result).toEqual([]);
  });
});
