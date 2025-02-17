import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(id: number) {
  const response = await axios.get(`${BACKEND_URL}/chats/${id}`);
  return response.data.messages;
}

export async function ChatRoom({ id }: { id: number }) {
  const messages = await getChats(id);

  return <ChatRoomClient messages={messages} id={id} />;
}
