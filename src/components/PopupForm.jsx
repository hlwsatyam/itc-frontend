import React, { useState } from "react";
import { toast } from "react-toastify";
import { backendUrl, validateGmail, validateIndianMobileNumber } from "../helpers";

function PopupForm({ isFormOpen, setIsFormOpen }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    address: "",
    willMailShare:"No",
    area: "",
    pincode: "",
    state: "",
    disctict: "",
    postOffice: "",
  });
  const [postOffices, setPostOffices] = useState([]);

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
      const response = await fetch(
        // "https://itc-backend-wa0t.onrender.com/api/submit",
         `${backendUrl}/api/submit` ,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify(formData),
        },
      );
      if (response.ok) {
        toast.success(
          "Thanks For Applying, Our Excutive Will Contact You Within 24 Hour",
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
        setIsFormOpen(false);
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    isFormOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="*: form max-h-screen w-full max-w-lg overflow-y-scroll rounded-lg border-2 border-blue-500 bg-blue-900/90 p-8 shadow-lg">
          <h2 className="relative mb-4 text-2xl font-bold text-green-400">
            Become Our Franchisee{" "}
            <img
              className="inline h-[40px] w-[110px]"
              src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnl6MGQwcXUxN2V4MjVjN3c1aGxzZTFpeTlyaXR0ZGgxa2NrNDUxYiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/i8cYLHptr8q1nwyvyp/giphy.webp"
              alt=""
              srcset=""
            />
            <button
              onClick={() => setIsFormOpen(false)}
              className="hover: absolute right-0 text-gray-200 text-gray-500"
            >
              X
            </button>
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
                required
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
                required
              />
            </div>
            <div>
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
            </div>
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
    )
  );
}
export default PopupForm;
