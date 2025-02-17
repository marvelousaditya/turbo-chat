import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../Components/ChatRoom";
async function getRoomId(slug: string) {
  try {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.roomData.id;
  } catch (error) {
    console.error("Error fetching room ID:", error);
    return null; // or handle it appropriately
  }
}

export default async function Room({ params }: { params: { slug: string } }) {
  // console.log(await params.slug);
  // const slug = (await params).slug;
  const slug = "bros";
  const roomId = await getRoomId(slug);
  return <ChatRoom id={roomId} />;
}
