"use client";

import { useEffect, useRef } from "react";
import { initDraw } from "../draw";

export function Canvas({
  roomId,
  socket,
}: {
  roomId: number;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("failed");
        return;
      }
      initDraw(canvas, ctx, roomId, socket);
    }
  }, [canvasRef, roomId, socket]);

  return (
    <div>
      <canvas height={500} width={500} ref={canvasRef} />
    </div>
  );
}
