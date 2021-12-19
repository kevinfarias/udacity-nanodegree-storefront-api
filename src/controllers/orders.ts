import express from "express";
import { Order, OrderStore } from "../models/order";
import * as repository from "../repositories/orders";
import { RequestWithUser } from "../definitions/request";

const store = new OrderStore();

export const current = async (
  req: RequestWithUser,
  res: express.Response
): Promise<void> => {
  try {
    const rows = await repository.retrieveOrders(req.userId as number, false);
    res.json({ data: rows });
  } catch (err: any) {
    res.status(500).send(String(err));
  }
};

export const completed = async (
  req: RequestWithUser,
  res: express.Response
): Promise<void> => {
  try {
    const rows = await repository.retrieveOrders(req.userId as number, true);
    res.json({ data: rows });
  } catch (err: any) {
    res.status(500).send(String(err));
  }
};

export const create = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const data: Order = {
    product: Number(req.body.product),
    quantity: Number(req.body.quantity),
    userid: Number(req.body.userid),
    complete: Boolean(req.body.completed),
  };
  try {
    const row = await store.create(data);
    res.json(row);
  } catch (err: any) {
    res.status(500).send(String(err));
  }
};
