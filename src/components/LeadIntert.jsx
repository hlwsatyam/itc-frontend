import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../helpers";
import { toast } from "react-toastify";

const XLSFileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    const isExcutiveLogged = localStorage.getItem("adminLogged");

    if (!isExcutiveLogged) {
      toast.error("You are not authorized to access this page.", {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!file) {
      toast.success("Please Upload a Vlid Exel FIle", {
        position: "top-left",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }

    const formData = new FormData();
    formData.append("file", file);
    let isExcutiveMode = localStorage.getItem("excutiveLogged");
    formData.append("isExcutiveMode", isExcutiveMode);
    try {
      const response = await axios.post(
        `${backendUrl}/api/lead/insert`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      } else {
        toast.error(response?.data?.message, {
          position: "top-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message, {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
          Upload XLS File
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="file"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
          />
          {loading ? (
            <div className="flex justify-center">
              <div className="loader">
                <img
                  className="h-[50px] w-[100%]"
                  src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
                  alt=""
                  srcset=""
                />
              </div>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 py-2 text-lg font-semibold text-white transition duration-300 hover:bg-blue-700"
            >
              Upload
            </button>
          )}
        </form>
        {message && (
          <div className="mt-6 text-center text-sm text-gray-600">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default XLSFileUpload;
