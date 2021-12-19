import express from "express";
import { Product, ProductStore } from "../models/product";
import * as repository from "../repositories/products";

const store = new ProductStore();

export const index = async (
  _req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const rows = await store.index();
    res.json({ data: rows });
  } catch (err: any) {
    res.status(500).send(String(err));
  }
};

export const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const data: Product = {
    name: req.body.name,
    price: Number(req.body.price),
    category: Number(req.body.category),
  };
  try {
    const row = await store.create(data);
    res.json(row);
  } catch (err: any) {
    res.status(500).send(String(err));
  }
};

export const show = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const id = Number(req.params.id);
  try {
    const row = await store.show(id);
    if (row) {
      res.json(row);
    } else {
      res.status(404).send("Record not found!");
    }
  } catch (err: any) {
    res.status(500).send(String(err));
  }
};

export const popular = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const qt = Number(req.params.qt);
  try {
    const row = await repository.retrievePopular(qt);
    if (row) {
      res.json(row);
    } else {
      res.status(404).send("Record not found!");
    }
  } catch (err: any) {
    res.status(500).send(String(err));
  }
};

export const category = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const category = Number(req.params.category);
  try {
    const row = await repository.retrieveByCategory(category);
    if (row) {
      res.json(row);
    } else {
      res.status(404).send("Records not found!");
    }
  } catch (err: any) {
    res.status(500).send(String(err));
  }
};
