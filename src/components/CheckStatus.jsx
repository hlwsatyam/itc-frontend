import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../helpers";

export const CheckStatus = () => {
  const [showForm, setShowForm] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
 

  const handleButtonClick = (formType) => {
    setShowForm(formType);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const role = showForm;

    try {
      const res = await axios.post(`${backendUrl}/api/login`, {
        email,
        password,
        role,
      });
       
      if (res.status === 200) {
        if (res.data.role === "admin") {
          localStorage.setItem("adminLogged", "true");
          window.location.href = "/admin-dashboard";
        }
        if (res.data.role === "customer") {
          localStorage.setItem("cutomerLogged", email);
          window.location.href = "/customer-dashboard";
        }
      } else {
        setError("Invalid credentials");
      }
      setError("");
    } catch (err) {
      alert(err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="my-6 flex flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-8 text-3xl font-bold">Check Status</h1>
      <div className="space-x-4">
        <button
          onClick={() => handleButtonClick("customer")}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Customer Login
        </button>
        <button
          onClick={() => handleButtonClick("admin")}
          className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Admin Login
        </button>
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {(showForm === "customer" || showForm === "admin") && (
        <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold">
            {showForm === "customer" ? "Customer" : "Admin"} Login
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Or Mobile
              </label>
              <input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
