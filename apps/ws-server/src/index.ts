import { WebSocket, WebSocketServer } from "ws";
import jwt, { decode, JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "@repo/backend-common/config";
import { prisma } from "@repo/db/client";
const wss = new WebSocketServer({ port: 8080 });
interface usersIT {
  userId: string;
  ws: WebSocket;
  rooms: number[];
}

let compareWeb: String[] = [];
const users: usersIT[] = [];
function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_PASSWORD) as JwtPayload;
    if (!decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (err) {
    return null;
  }
}
wss.on("connection", (ws, req) => {
  compareWeb.push(JSON.stringify(ws));
  const cookies = req.headers.cookie || "";
  const token =
    cookies
      .split("; ")
      .find((c: any) => c.startsWith("token="))
      ?.split("=")[1] || "";
  const userId = checkUser(token);
  if (!userId) {
    ws.close();
    return;
  }
  users.push({ userId, rooms: [], ws });
  ws.on("message", async (data) => {
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data);
    }
    if (parsedData.type === "join_room") {
      const user = users.find((u) => u.userId === userId);
      if (user) {
        user.rooms.push(parsedData.roomId);
        ws.send("room joined");
      } else {
        ws.send("user does not exist");
      }
    } else if (parsedData.type === "leave_room") {
      const user = users.find((u) => u.userId === userId);
      if (user) {
        user.rooms = user?.rooms.filter((room) => room != parsedData.roomId);
        ws.send("you have left the room");
      } else {
        ws.send("user does not exist");
      }
    } else if (parsedData.type === "message") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;
      users.forEach((user) => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message,
              roomId,
            })
          );
        }
      });
      try {
        await prisma.chat.create({
          data: {
            userId,
            roomId,
            message,
          },
        });
      } catch (e) {
        return null;
      }
    }
  });
  ws.on("close", () => {
    const index = users.findIndex((user) => user.ws === ws);
    if (index !== -1) {
      users.splice(index, 1);
    }
  });
});
