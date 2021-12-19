import { User, UserStore } from "../../src/models/user";

const store = new UserStore();

describe("User Model", () => {
  const data: User = {
    username: "kevin_farias",
    firstName: "Kevin",
    lastName: "Farias",
    password: "secret",
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

  it("create method should add a user", async () => {
    const result = await store.create(data);
    expect({ ...result, password: "secret" }).toEqual({
      ...data,
      id: lastId,
      password: "secret",
    });
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect([{ ...result[0], password: "secret" }]).toEqual([
      {
        ...data,
        id: lastId,
        password: "secret",
      },
    ]);
  });

  it("show method should return the correct user", async () => {
    const result = await store.show(lastId);
    expect({ ...result, password: "secret" }).toEqual({
      ...data,
      id: lastId,
      password: "secret",
    });
  });

  it("update method should update a user", async () => {
    const newData: User = {
      ...data,
      id: lastId,
      lastName: "de Farias",
    };
    const result = await store.update(newData);
    expect({ ...result, password: "secret" }).toEqual({
      ...newData,
      password: "secret",
    });
  });

  it("delete method should remove the user", async () => {
    await store.delete(lastId);
    const result = await store.index();

    expect(result).toEqual([]);
  });

  it("create method should add a user again", async () => {
    const result = await store.create(data);
    expect({ ...result, password: "secret" }).toEqual({
      ...data,
      id: lastId + 1,
      password: "secret",
    });
  });
});
