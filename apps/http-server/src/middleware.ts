import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "@repo/backend-common/config";
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers["authorization"] || "";
  try {
    const decoded = jwt.verify(token, JWT_PASSWORD) as JwtPayload;
    req.userId = decoded.userId;
    next();
  } catch (e: any) {
    res.status(400).json({ error: "some error occurred : " + e });
  }
}
