import { Product, ProductStore } from "../../src/models/product";
import { CategoryStore } from "../../src/models/category";

const store = new ProductStore();
const categoryStore = new CategoryStore();

describe("Product Model", () => {
  let lastId: number;
  let data: Product;
  beforeAll(async (): Promise<void> => {
    await store.cleanAll();
    lastId = await store.getLastId();
    data = {
      name: "Test",
      price: 5,
      category: (await categoryStore.getLastId()) - 1,
    };
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

  it("create method should add a product", async () => {
    const result = await store.create(data);
    expect(result).toEqual({
      ...data,
      id: lastId,
    });
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        ...data,
        id: lastId,
      },
    ]);
  });

  it("show method should return the correct product", async () => {
    const result = await store.show(lastId);
    expect(result).toEqual({
      ...data,
      id: lastId,
    });
  });

  it("update method should update a product", async () => {
    const newData: Product = {
      ...data,
      id: lastId,
      name: "New Test",
    };
    const result = await store.update(newData);
    expect(result).toEqual(newData);
  });

  it("delete method should remove the product", async () => {
    await store.delete(lastId);
    const result = await store.index();

    expect(result).toEqual([]);
  });

  it("create method should add a product again", async () => {
    const result = await store.create(data);
    expect(result).toEqual({
      ...data,
      id: lastId + 1,
    });
  });
});
