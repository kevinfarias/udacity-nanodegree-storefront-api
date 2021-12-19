import * as repository from "../../src/repositories/products";
import { ProductStore } from "../../src/models/product";

const store = new ProductStore();

describe("Products repository", () => {
  beforeAll(async () => {
    await store.cleanAll();
  });

  it("retrieveByCategory method should return an empty list", async () => {
    const result = await repository.retrieveByCategory(1);
    expect(result).toEqual([]);
  });

  it("retrievePopular method should return an empty list", async () => {
    const result = await repository.retrievePopular(1);
    expect(result).toEqual([]);
  });
});
