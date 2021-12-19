import { Order, OrderProduct, OrderStore } from "../../src/models/order";

const store = new OrderStore();

describe("Order Model", () => {
  const data: Order = {
    userid: 2,
    complete: false,
  };
  const products: OrderProduct[] = [
    {
      product: 2,
      quantity: 10,
    },
  ];
  let lastId: number;
  beforeAll(async (): Promise<void> => {
    await store.cleanAll();
    lastId = await store.getLastId();
  });

  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(store.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(store.create).toBeDefined();
  });

  it("should have a update method", () => {
    expect(store.update).toBeDefined();
  });

  it("should have a delete method", () => {
    expect(store.delete).toBeDefined();
  });

  it("create method should add a order", async () => {
    const result = await store.create({ ...data, products });
    expect(result).toEqual({
      ...data,
      id: lastId,
      products: products,
    });
  });

  it("create method without quantity MUST throw an error", async () => {
    await expectAsync(
      store.create({ ...data, products: [{ ...products[0], quantity: 0 }] })
    ).toBeRejectedWithError("You must pass a real quantity!");
  });

  it("index method should return a list of orders", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        ...data,
        id: lastId,
      },
    ]);
  });

  it("show method should return the correct order", async () => {
    const result = await store.show(1);
    expect(result).toEqual({
      ...data,
      id: lastId,
      products: products,
    });
  });

  it("update method should update a order", async () => {
    const newData: Order = {
      ...data,
      id: lastId,
      complete: true,
    };
    const result = await store.update(newData);
    expect(result).toEqual(newData);
  });

  it("delete method should remove the order", async () => {
    await store.delete(1);
    const result = await store.index();

    expect(result).toEqual([]);
  });

  it("create method should add a order again", async () => {
    const result = await store.create({ ...data, products });
    expect(result).toEqual({
      ...data,
      products,
      id: lastId + 1,
    });
  });
});
