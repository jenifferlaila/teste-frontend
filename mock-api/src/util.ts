import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { getEmailOccurrenceCount, getUserByColumn } from "./users";
import { Database } from "sqlite3";

export type Role = "ADMIN" | "USER";

export type LoginInfo = {
  email: string;
  password: string;
};

export type NewUser = LoginInfo & {
  role: Role;
  phone: string;
  username: string;
};

export type User = NewUser & {
  id: number;
  token?: string;
};

export type TokenPayload = NewUser;

export function isThisLoginInfoValid(info: any) {
  if (typeof info !== "object" || !info) return false;

  return info.email && info.password
    ? typeof info.email === "string" && typeof info.password === "string"
    : false;
}

export function getAccessToken(payload: TokenPayload, secret: string) {
  return jwt.sign(payload, secret, { expiresIn: 36000 });
}

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
  db: Database
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(400);

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, user: any) => {
      if (
        err ||
        !(await isThisAValidUser(db, {
          email: user.email,
          password: user.password,
        }))
      )
        return res.sendStatus(401);

      const u = user as LoginInfo;
      const actualUser = await getUserByColumn(db, u.email);
      if (!actualUser) return res.sendStatus(403);

      req.body = {
        user: { ...actualUser, password: "********" } as User,
        data: req.body,
      };

      next();
    }
  );
}

export function refreshToken(token: string) {
  return jwt.decode(token, { json: true });
}

export async function insertUser(db: Database, info: NewUser) {
  const res = await getEmailOccurrenceCount(db, info.email);
  if (res > 0) return false;

  insertUser(db, info);
  return true;
}

export async function isThisAValidUser(
  db: Database,
  { email, password }: LoginInfo
) {
  const user = await getUserByColumn(db, email);

  if (!user) return false;

  return user.password === password;
}
