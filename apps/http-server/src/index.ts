import express, { Request, Response } from "express";
import { prisma } from "@repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createUserSchema, signInSchema, roomSchema } from "@repo/common/types";
import { JWT_PASSWORD } from "@repo/backend-common/config";
import { authMiddleware } from "./middleware";
import bcrypt, { compare } from "bcrypt";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
const saltRounds = 12;
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req: Request, res: Response) => {
  const { name, username, password } = req.body;
  const parse = createUserSchema.safeParse({ name, username, password });
  if (!parse.success) {
    res.status(400).json({ message: "you sent the wrong inputs" });
    return;
  }
  try {
    const userExists = await prisma.user.findFirst({ where: { username } });
    if (userExists) {
      res.status(403).json({ message: "username already exists please login" });
      return;
    }
    const hash = await bcrypt.hash(password, saltRounds);
    await prisma.user.create({ data: { name, username, password: hash } });
    res.status(200).json({ message: "account created please login" });
  } catch (e: any) {
    res.status(400).json({ error: "error occured : " + e });
  }
});

app.post("/signin", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const parse = signInSchema.safeParse({ username, password });
  if (!parse.success) {
    res.status(400).json({ message: "you sent the wrong inputs" });
    return;
  }
  try {
    const userExists = await prisma.user.findFirst({
      where: { username },
    });
    if (!userExists) {
      res
        .status(403)
        .json({ message: "username does not exists please create account" });
      return;
    }
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      res.json({ message: "password incorrect" });
      return;
    }
    const token = jwt.sign({ userId: userExists.id }, JWT_PASSWORD);
    console.log(token);
    res.cookie("token", token);
    res.status(200).json({ message: "logged in successfully" });
  } catch (e: any) {
    res.status(400).json({ error: "some error occcured : " + e });
  }
});

app.post("/room", authMiddleware, async (req: Request, res: Response) => {
  const parsedData = roomSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({ message: "you sent the wrong inputs" });
    return;
  }
  try {
    const roomExist = await prisma.room.findFirst({
      where: { slug: parsedData.data.name },
    });
    if (roomExist) {
      res.status(400).json({ message: "room already exists" });
      return;
    }
    const room = await prisma.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: req.userId,
      },
    });

    res.status(200).json({ roomId: room.id });
  } catch (e: any) {
    res.status(400).json({ error: "error occured : " + e });
  }
});

app.get("/chats/:roomId", authMiddleware, async (req, res) => {
  const roomId = Number(req.params.roomId);
  try {
    const roomData = await prisma.chat.findMany({
      where: {
        roomId,
      },
      orderBy: { id: "desc" },
      take: 50,
    });
    if (!roomData) {
      res.json({ message: "room does not exist" });
    } else {
      res.json({ messages: roomData });
    }
  } catch (err) {
    res.status(500).json({ error: "an error occured : " + err });
  }
});

app.get("/room/:slug", authMiddleware, async (req, res) => {
  const slug = req.params.slug;
  try {
    const roomData = await prisma.room.findFirst({
      where: {
        slug,
      },
    });
    if (!roomData) {
      res.json({ message: "room does not exist" });
    } else {
      res.json({ roomData });
    }
  } catch (err) {
    res.status(500).json({ error: "an error occured : " + err });
  }
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
