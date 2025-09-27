import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";

const API_URL = "https://api.escuelajs.co/api/v1/users";
const Register_URL = "https://api.escuelajs.co/api/v1/users";

const AuthPage = () => {
  const [serverError, setServerError] = useState(null);

  const handleSubmit = async ({ email, password }) => {
    setServerError(null);
    try {
      const { data } = await axios.get(API_URL);

      const users = Array.isArray(data) ? data : data.data ?? [];

      // DEMO rule: password === username
      const user = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );

      if (!user) {
        setServerError("Invalid email or password");
        return;
      }

      // success → save and redirect
      localStorage.setItem("user", JSON.stringify(user));
      // window.location.href = "/"; // change route if needed
      console.log("✅ Yup! We are logged in:", user);
    } catch (err) {
      setServerError(err.response?.data?.message || "Login failed");
    }
  };

  const handleRegister = async ({ name, email, password, role, avatar }) => {
    setServerError(null);

    try {
      const payload = {
        name,
        email,
        password,
        role,
        avatar: avatar ?? null,
      };
      const { newUser } = await axios.post(Register_URL, payload);

      localStorage.setItem("user", JSON.stringify(newUser));
      console.log("✅ Registered user:", newUser);
      window.location.href = "/";
    } catch (err) {
      setServerError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="px-[16px] lg:px-[100px] pt-[80px] pb-[168px]">
      <h1 className="text-2xl font-bold mb-6">Authentication</h1>

      <div className="w-full max-w-md mx-auto">
        <Tab.Group>
          <Tab.List className="flex border-b border-gray-300">
            <Tab className="flex-1 px-4 py-2 text-center font-medium ui-selected:border-b-2 ui-selected:border-black ui-selected:text-black">
              Login
            </Tab>
            <Tab className="flex-1 px-4 py-2 text-center font-medium ui-selected:border-b-2 ui-selected:border-black ui-selected:text-black">
              Register
            </Tab>
          </Tab.List>

          <Tab.Panels className="mt-6">
            {/* Login Form */}
            <Tab.Panel>
              <Login onSubmit={handleSubmit} serverError={serverError} />
            </Tab.Panel>

            {/* Register Form */}
            <Tab.Panel>
              <Register onSubmit={handleRegister} serverError={serverError} />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default AuthPage;
