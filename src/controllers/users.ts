import express from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";

const store = new UserStore();

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
  const data: User = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
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

export const login = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const row = await store.authenticate(username, password);
    if (row) {
      res.json(row);
    } else {
      res.status(500).send("It was not possible to authenticate!");
    }
  } catch (err: any) {
    res.status(500).send(String(err));
  }
};
