"use client";
import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: number;
}) {
  const [chats, setChats] = useState(messages);
  const [currMessage, setCurrMessage] = useState("");
  const { socket, loading } = useSocket();
  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: id,
        }),
      );
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        alert(parsedData);

        if (parsedData.type === "chat") {
          alert(parsedData.message);
          setChats((c) => [...c, { message: parsedData.message }]);
        }
      };
    }
  }, [socket, loading, id]);
  if (loading) {
    return <div>Loading.....</div>;
  }

  return (
    <div>
      {chats.map((m, index) => (
        <div key={index}>{m.message}</div>
      ))}
      <input
        type="text"
        onChange={(e) => setCurrMessage(e.target.value)}
        value={currMessage}
      />

      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              roomId: id,
              type: "message",
              message: currMessage,
            }),
          );
          console.log("sent : ", currMessage);
          setCurrMessage("");
        }}
      >
        Send
      </button>
    </div>
  );
}
