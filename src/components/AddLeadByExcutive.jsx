import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  backendUrl,
  validateGmail,
  validateIndianMobileNumber,
} from "../helpers";
import axios from "axios";
import InputSelect from "./ui/InputSelect";

function PopupForm({ isFormOpen, setIsFormOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    willMailShare: "No",
    area: "",
    pincode: "",
    state: "",
    "available_investment_(select_one)": "",
    "preferred_franchisee_segment_(select_one)": "",
    disctict: "",
    postOffice: "",
  });
  const [postOffices, setPostOffices] = useState([]);
  const [selectedPostOffice, setSelectedPostOffice] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;
    setFormData({
      ...formData,
      pincode: pincode,
    });
    if (pincode.length === 6) {
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pincode}`,
        );
        const data = await response.json();
        if (data[0].Status === "Success") {
          setPostOffices(data[0].PostOffice);
          setFormData({
            ...formData,
            pincode: pincode,
            disctict: data[0].PostOffice[0].District,
            state: data[0].PostOffice[0].Circle,
          });
          console.log(data[0].PostOffice[0]);
        } else {
          setPostOffices([]);
        }
      } catch (error) {
        console.error("Error fetching post office data:", error);
      }
    } else {
      setPostOffices([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send formData to the backend
    if (!validateIndianMobileNumber(formData.mobile)) {
      return toast.error("Please Enter Valid Mobile Number Without +91", {
        position: "top-left",
        autoClose: 20000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    if (!validateGmail(formData.email)) {
      return toast.error("Please Enter Valid Gmail", {
        position: "top-left",
        autoClose: 20000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    try {
      const id = localStorage.getItem("excutiveLogged");
      const response = await axios.post(
        // "https://itc-backend-wa0t.onrender.com/api/submit",
        `${backendUrl}/api/addLeadByExcutive/${id}`,
        { ...formData, selectedPostOffice },
      );
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-left",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        window.location.href = "/excutive-dashboard";
      } else {
        return toast.error(
          response.data.message || "We Ara Updating Server SO Please Try Again",
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
    } catch (error) {
      return toast.error(error?.message, {
        position: "top-left",
        autoClose: 20000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <div className="inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="*: form max-h-screen w-full max-w-lg overflow-y-scroll rounded-lg border-2 border-blue-500 bg-blue-900/90 p-8 shadow-lg">
        <h2 className="relative mb-4 text-2xl font-bold text-green-400">
          Become Our Franchisee{" "}
          <img
            className="inline h-[40px] w-[110px]"
            src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnl6MGQwcXUxN2V4MjVjN3c1aGxzZTFpeTlyaXR0ZGgxa2NrNDUxYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/i8cYLHptr8q1nwyvyp/giphy.webp"
            alt=""
            srcset=""
          />
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-200"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-200"
            >
              Mobile Number
            </label>
            <input
              id="mobile"
              placeholder="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              placeholder="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          {/* <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-200"
              >
                Address
              </label>
              <input
                id="address"
                placeholder="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div> */}
          <div>
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-200"
            >
              Area
            </label>
            {/* <input
                id="area"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                required
              /> */}

            <select
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              required
            >
              <option value="">Select a Area</option>
              <option value="Rural ग्रामीण ">Rural ग्रामीण </option>
              <option value="Urban शहरी">Urban शहरी</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-gray-200"
            >
              Pincode
            </label>
            <input
              id="pincode"
              name="pincode"
              placeholder="Your Pincode"
              value={formData.pincode}
              onChange={handlePincodeChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          {postOffices.length > 0 && (
            <div className="flex flex-wrap gap-4 bg-green-500/40 p-1">
              {postOffices.map((office) => (
                <span
                  onClick={() => {
                    if (selectedPostOffice.includes(office)) {
                      setSelectedPostOffice(
                        selectedPostOffice.filter((val) => val !== office),
                      );
                    } else {
                      setSelectedPostOffice([...selectedPostOffice, office]);
                    }
                  }}
                  className={`rounded ${selectedPostOffice.includes(office) ? "bg-green-700 text-white" : "bg-white"} text-blackg-white p-2`}
                  key={office.Name}
                  value={office.Name}
                >
                  {office.Name}
                </span>
              ))}
            </div>
          )}

          <InputSelect
            name={"available_investment_(select_one)"}
            options={[
              "₹5_lakhs_to_₹10_lakhs",
              "₹10_lakhs_to_₹25_lakhs",
              "₹25_lakhs_and_above",
            ]}
            label={"Selct Your Estimated Investment Capacity"}
            placeholder={"Enter your name"}
            value={formData["available_investment_(select_one)"]}
            handleChange={handleChange}
          />
          <InputSelect
            name={"preferred_franchisee_segment_(select_one)"}
            options={[
              "cigarettes_and_cigars",
              "education",
              "fmcg",
              "personal_care",
            ]}
            label={"Preferred Franchisee Segment"}
            placeholder={"Enter your name"}
            value={formData["preferred_franchisee_segment_(select_one)"]}
            handleChange={handleChange}
          />

          {postOffices.length > 0 && (
            <div>
              <label
                htmlFor="postOffice"
                className="block text-sm font-medium text-gray-200"
              >
                Select Post Office
              </label>
              <select
                id="postOffice"
                name="postOffice"
                value={formData.postOffice}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                required
              >
                <option value="">Select a post office</option>
                {postOffices.map((office) => (
                  <option key={office.Name} value={office.Name}>
                    {office.Name}
                  </option>
                ))}
              </select>

              <label
                htmlFor="postOffice"
                className="block text-sm font-medium text-gray-200"
              >
                Distict
              </label>
              <input
                id="distict"
                name="distict"
                placeholder="Your Distict"
                value={formData.disctict}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                required
              />
              <label
                htmlFor="state"
                className="block text-sm font-medium text-gray-200"
              >
                State
              </label>
              <input
                id="state"
                placeholder="Your State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupForm;
