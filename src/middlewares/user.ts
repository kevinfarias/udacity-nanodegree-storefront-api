import express from "express";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../definitions/request";

interface JwtPayload {
  id: string;
}

const isAuthenticated = async (
  req: RequestWithUser,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as jwt.Secret
    ) as JwtPayload;

    req.userId = Number(payload.id);
    next();
  } catch (err: any) {
    res.status(403).send("Unauthenticated");
    return;
  }
};

export { isAuthenticated };
