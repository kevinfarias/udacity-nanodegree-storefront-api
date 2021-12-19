import { Request } from "express";

export interface RequestWithUser extends Request {
  userId?: number; // or any other type
}
