"use client";
import { Input } from "@repo/ui/input";
import { useState } from "react";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
  const [name, setName] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="p-8 m-4 bg-white rounded-lg shadow-lg w-96">
        {!isSignin && (
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-center">
          <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            {isSignin ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
}
