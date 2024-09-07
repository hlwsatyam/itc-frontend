import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUniversity,
  FaRegUser,
  FaKey,
  FaCodeBranch,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { backendUrl } from "../helpers";
import UserHeader from "./ui/UserHeader";

function AddAccount() {
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [holderName, setHolderName] = useState("");
  const [bankDetails, setBankDetails] = useState([]);

  useEffect(() => {
    const isAdminLogged = localStorage.getItem("adminLogged");
    if (isAdminLogged !== "true") {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    fetchBankDetails();
  }, []);

  const fetchBankDetails = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/bank-details`);
      setBankDetails(response.data);
    } catch (error) {
      console.error("Error fetching bank details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/bank-details`, {
        bankName,
        accountNumber,
        ifscCode,
        holderName,
      });
      if (response.status === 200) {
        toast.success("Bank Details Added!", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        fetchBankDetails(); // Refresh the bank details list
      }
    } catch (error) {
      console.error("There was an error adding the bank details:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/bank-details/${id}`,
      );
      if (response.status === 200) {
        toast.success("Bank Details Deleted!", {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        fetchBankDetails(); // Refresh the bank details list
      }
    } catch (error) {
      console.error("Error deleting bank detail:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <UserHeader isAccountBTNshown={false} />
      <h2 className="mb-4 text-2xl font-bold">Add Bank Account</h2>
      <form
        onSubmit={handleSubmit}
        className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      >
        {/* Bank Name */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            <FaUniversity className="mr-2 inline-block" /> Bank Name
          </label>
          <input
            type="text"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        {/* Account Number */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            <FaKey className="mr-2 inline-block" /> Account Number
          </label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        {/* IFSC Code */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            <FaCodeBranch className="mr-2 inline-block" /> IFSC Code
          </label>
          <input
            type="text"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        {/* Account Holder Name */}
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            <FaRegUser className="mr-2 inline-block" /> Account Holder Name
          </label>
          <input
            type="text"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Add Account
        </button>
      </form>

      {/* Display Bank Details */}
      <div>
        <h3 className="mb-4 text-xl font-bold">Previous Bank Accounts</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {bankDetails.map((detail) => (
            <div
              key={detail._id}
              className="relative rounded bg-white p-4 shadow-md"
            >
              <p className="text-gray-700">
                <strong>Bank Name:</strong> {detail.bankName}
              </p>
              <p className="text-gray-700">
                <strong>Account Number:</strong> {detail.accountNumber}
              </p>
              <p className="text-gray-700">
                <strong>IFSC Code:</strong> {detail.ifscCode}
              </p>
              <p className="text-gray-700">
                <strong>Account Holder:</strong> {detail.holderName}
              </p>
              <button
                onClick={() => handleDelete(detail._id)}
                className="absolute right-2 top-2 text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddAccount;
