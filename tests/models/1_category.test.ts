import { Category, CategoryStore } from "../../src/models/category";

const store = new CategoryStore();

describe("Category Model", () => {
  const data: Category = {
    name: "Test",
  };
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

  it("create method should add a category", async () => {
    const result = await store.create(data);
    expect(result).toEqual({
      ...data,
      id: lastId,
    });
  });

  it("index method should return a list of categorys", async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        ...data,
        id: lastId,
      },
    ]);
  });

  it("show method should return the correct category", async () => {
    const result = await store.show(lastId);
    expect(result).toEqual({
      ...data,
      id: lastId,
    });
  });

  it("update method should update a category", async () => {
    const newData: Category = {
      ...data,
      id: lastId,
      name: "Name test",
    };
    const result = await store.update(newData);
    expect(result).toEqual(newData);
  });

  it("delete method should remove the category", async () => {
    await store.delete(lastId);
    const result = await store.index();

    expect(result).toEqual([]);
  });

  it("create method should add a category again", async () => {
    const result = await store.create(data);
    expect(result).toEqual({
      ...data,
      id: lastId + 1,
    });
  });
});
