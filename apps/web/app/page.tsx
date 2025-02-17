"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const roomIdRef = useRef<HTMLInputElement>(null);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div>
        <input
          ref={roomIdRef}
          placeholder={"room id"}
          style={{ padding: 10 }}
        />
        <button
          style={{ padding: 10 }}
          onClick={() => {
            router.push(`/room/${roomIdRef.current?.value}`);
          }}
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
