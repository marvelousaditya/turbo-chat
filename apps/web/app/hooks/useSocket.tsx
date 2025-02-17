"use client";
import { WS_URL } from "../config";
import { useEffect, useState } from "react";

export function useSocket() {
  const [loading, setLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwYTVkMmYzYi0yYjcwLTRhMTEtOGFhNS0zYThlYWQ2YmM3YmQiLCJpYXQiOjE3Mzk3OTEzNzJ9.NPdb1dmAiUXB9Lt8S_3n3zu2aJH5N2wWe-04mEmfG2w`,
    );
    ws.onopen = () => {
      setSocket(ws);
      setLoading(false);
    };
  }, []);

  return { socket, loading };
}
