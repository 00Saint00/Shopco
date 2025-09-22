import React from "react";
import { Button } from "@headlessui/react";

const Login = () => {
  return (
    <div>
      {" "}
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <Button className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
