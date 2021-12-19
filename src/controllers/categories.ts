import express from "express";
import { Category, CategoryStore } from "../models/category";

const store = new CategoryStore();

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
  const data: Category = {
    name: req.body.name,
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
