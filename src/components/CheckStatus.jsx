import React, { useState } from "react";
import axios from "axios";
import { backendUrl } from "../helpers";
import { toast } from "react-toastify";

export const CheckStatus = () => {
  const [showForm, setShowForm] = useState("customer");
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
        if (res.data.role === "excutive") {
          localStorage.setItem("excutiveLogged", res.data.id);
          window.location.href = "/excutive-dashboard";
        }
      } else {
        return toast.error(
          res?.data.message || "Something went wrong, Please try again later",
          {
            position: "top-left",
            autoClose: 20000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          },
        );
      }
      setError("");
    } catch (err) {
      return toast.error(
        err.message || "Something went wrong, Please try again later",
        {
          position: "top-left",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        },
      );
    }
  };

  return (
    // <div className="my-6 flex flex-col items-center justify-center bg-gray-100">
    //   <h1 className="mb-8 text-3xl font-bold">Check Status</h1>
    //   <div className="space-x-4">
    //     <button
    //       onClick={() => handleButtonClick("customer")}
    //       className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    //     >
    //       Customer Login
    //     </button>
    //     <button
    //       onClick={() => handleButtonClick("admin")}
    //       className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
    //     >
    //       Admin Login
    //     </button>
    //   </div>

    //   {error && <p className="mt-4 text-red-500">{error}</p>}

    //   {(showForm === "customer" || showForm === "admin") && (
    //     <div className="mt-8 rounded-lg bg-white p-6 shadow-lg">
    //       <h2 className="mb-4 text-xl font-bold">
    //         {showForm === "customer" ? "Customer" : "Admin"} Login
    //       </h2>
    //       <form className="space-y-4" onSubmit={handleSubmit}>
    //         <div>
    //           <label
    //             htmlFor="email"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Email Or Mobile
    //           </label>
    //           <input
    //             id="email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
    //           />
    //         </div>
    //         <div>
    //           <label
    //             htmlFor="password"
    //             className="block text-sm font-medium text-gray-700"
    //           >
    //             Password
    //           </label>
    //           <input
    //             id="password"
    //             type="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
    //             required
    //           />
    //         </div>
    //         <button
    //           type="submit"
    //           className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         >
    //           Login
    //         </button>
    //       </form>
    //     </div>
    //   )}
    // </div>

    <div
      className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1499123785106-343e69e68db1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80')",
      }}
    >
      <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div className="text-white">
          <div className="mb-8 flex flex-col items-center">
            <img
              src="https://www.itcportal.com/images/logo_itc.png"
              className="h-[100px]"
              alt="Instagram Logo"
            />
            <h1 className="mb-2 text-2xl">Login</h1>
            <span className="text-gray-300">Enter Login Details</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              <p>Select Type</p>
              <select
                name=""
                onChange={(e) => setShowForm(e.target.value)}
                value={showForm}
                className="w-full rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                id=""
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Mobile Or Email"
              />
            </div>
            <div className="mb-4 text-lg">
              <input
                className="rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
              />
            </div>
            <div className="mt-8 flex justify-center text-lg text-black">
              <button
                type="submit"
                className="rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
