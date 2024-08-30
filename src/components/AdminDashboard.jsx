import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "./ui";
import { BiBook, BiEdit, BiLogOut } from "react-icons/bi";
import {
  BsBank,
  BsCheckCircle,
  BsFileEarmarkCheck,
  BsFileEarmarkCheckFill,
  BsFillFileEarmarkCheckFill,
  BsFlower1,
} from "react-icons/bs";
import { SiWelcometothejungle } from "react-icons/si";
import { PiApproximateEqualsBold } from "react-icons/pi";
import { RiOrderPlayFill } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";
import { FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";
import EditCustomerDetailForm from "./EditCustomerDetailForm";
import { backendUrl } from "../helpers";

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce the searchTerm
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 300ms debounce time

    // Clean up the timeout if the user continues typing
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Fetch data when debouncedSearchTerm changes
  useEffect(() => {
    const isAdminLogged = localStorage.getItem("adminLogged");
    if (isAdminLogged === "true") {
      fetchData();
    } else {
      window.location.href = "/";
    }
  }, [debouncedSearchTerm]);

  const fetchData = async () => {
    try {
      const url =
        debouncedSearchTerm === ""
          ?  `${backendUrl}/api/leads` 
          : `${backendUrl}/api/leads/${debouncedSearchTerm}`;
      const res = await axios.post(url, {});
      if (res.status === 200) {
        setLeads(res.data);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("adminLogged");
    window.location.href = "/";
  };
  const deleteHandler = async (id) => {
    const res = await axios.post(
      `${backendUrl}/api/lead/delete/${id}`,
      {},
    );
    if (res.status === 200) {
      toast.error(res.data.message, {
        position: "top-left",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const latestLead = leads.filter((lead) => lead._id !== id);
      setLeads(latestLead);
    }
  };
  const sendBankDetailHandler = async (id) => {
    const res = await axios.post(
      `${backendUrl}/api/lead/sendBankDetail/${id}`,
      {},
    );
    if (res.status === 200) {
      toast.success(res.data.message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const sendwelcomeHandler = async (id) => {
    const res = await axios.post(
      `${backendUrl}/api/lead/sendWelcome/${id}`,
      {},
    );
    if (res.status === 200) {
      toast.success(res.data.message, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const sendCancelHandler = async (id) => {
    const res = await axios.post(
      `${backendUrl}/api/lead/sendCancel/${id}`,
      {},
    );
    if (res.status === 200) {
      toast.success(res.data.message, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      const latestLead = leads.filter((lead) => lead._id !== id);
      setLeads(latestLead);
    }
  };
  const sendAproovalHandler = async (id) => {
    const res = await axios.post(
      `${backendUrl}/api/lead/sendAprooval/${id}`,
      {},
    );
    if (res.status === 200) {
      toast.success(res.data.message, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const accountHandler = () => {
    window.location.href = "/addaccount";
  };

  const fileInputRef = React.useRef();
  const fileInputRefForPO = React.useRef();
  const fileInputRefForApprooval = React.useRef();

  const handleButtonClickForAgreement = () => {
    // Programmatically trigger the file input click
    fileInputRef.current.click();
  };
  const handleButtonClickForPO = () => {
    // Programmatically trigger the file input click
    fileInputRefForPO.current.click();
  };
  const handleButtonClickForApprooval = () => {
    // Programmatically trigger the file input click
    fileInputRefForApprooval.current.click();
  };

  const handleFileChange = async (event, id) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        `${backendUrl}/api/lead/sendAgreement/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed To Send Agreement", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const handleFileChangePO = async (event, id) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("filePO", selectedFile);

    try {
      const response = await axios.post(
        `${backendUrl}/api/lead/sendPO/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed To Send Purchase Order File", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const handleFileChangeApprooval = async (event, id) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("fileApprooval", selectedFile);

    try {
      const response = await axios.post(
        `${backendUrl}/api/lead/sendApprooval/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed To Send Aprooval Letter File", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUpdateID, setCurrentUpdateID] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <EditCustomerDetailForm
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        id={currentUpdateID}
      />
      <h1 className="relative mb-8 flex items-center justify-between gap-x-8 text-[17px] font-bold text-gray-800">
        <h1 className="mb-4 flex items-center font-semibold text-gray-800">
          <a href="/">
            <img
              className="mr-2 h-8 w-8 rounded-full object-cover"
              src="https://www.itcdistributorships.in/images/logo.png"
              alt="Logo"
            />
          </a>
          Dashboard
        </h1>
        <Button
          className="!px-2 !py-1 text-[13px]"
          onClick={accountHandler}
          title="Add Acount"
          Icon={BsBank}
        />{" "}
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search"
          className="absolute right-[20%] rounded-lg border border-gray-300 px-4 py-2 text-[12px]"
        />{" "}
        <Button
          onClick={logoutHandler}
          title="Logout"
          className="!px-2 !py-1 text-[13px]"
          Icon={BiLogOut}
        />{" "}
      </h1>

      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Lead Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Email
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Phone
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Address
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {leads?.map((lead, index) => (
              <tr
                key={index}
                onMouseOver={() => setHoveredRowIndex(index)}
                onMouseLeave={() => setHoveredRowIndex(null)}
                className="border-t hover:bg-gray-300"
              >
                {hoveredRowIndex === index ? (
                  <td colSpan="8" className="px-4 py-3">
                    <td className="px-4 py-3">{lead.name}</td>
                    <td className="px-4 py-3">{lead.email}</td>
                    <td className="px-4 py-3">{lead.mobile}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          lead.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {lead.area}, {lead.address}, {lead.postOffice},{" "}
                        {lead.district}, {lead.state}, {lead.pincode}
                      </span>
                    </td>
                    <div className="flex justify-center space-x-2">
                      <Button
                        className="!px-2 !py-1 text-[13px]"
                        title="Welcome"
                        onClick={() => sendwelcomeHandler(lead._id)}
                        Icon={SiWelcometothejungle}
                      />
                      <Button
                        className={` ${lead?.approvalLetter && "!text-blue-900"} !px-2 !py-1 text-[13px]`}
                        title="Approval
"
                        onClick={() => handleButtonClickForApprooval(lead._id)}
                        Icon={PiApproximateEqualsBold}
                      />{" "}
                      <input
                        type="file"
                        accept="application/pdf"
                        ref={fileInputRefForApprooval}
                        style={{ display: "none" }}
                        onChange={(event) =>
                          handleFileChangeApprooval(event, lead._id)
                        }
                      />
                      <Button
                        className={`!px-2 ${lead?.agreementLetterName && "!text-blue-900"} !py-1 text-[13px]`}
                        title="Agreement"
                        Icon={BiBook}
                        onClick={() => handleButtonClickForAgreement(lead._id)}
                      />
                      <input
                        type="file"
                        accept="application/pdf"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={(event) => handleFileChange(event, lead._id)}
                      />
                      <Button
                        className={`!px-2 !py-1 ${lead?.purchaseOrderLetterName && "!text-blue-900"} text-[13px]`}
                        title="PurchaseOrder"
                        onClick={() => handleButtonClickForPO(lead._id)}
                        Icon={RiOrderPlayFill}
                      />
                      <input
                        type="file"
                        accept="application/pdf"
                        ref={fileInputRefForPO}
                        style={{ display: "none" }}
                        onChange={(event) =>
                          handleFileChangePO(event, lead._id)
                        }
                      />
                      <Button
                        className="!px-2 !py-1 text-[13px]"
                        title="Cancelation"
                        Icon={TiCancel}
                        onClick={() => sendCancelHandler(lead._id)}
                      />
                      <Button
                        className="!px-2 !py-1 text-[13px]"
                        title="ShareBankDetail"
                        Icon={BsBank}
                        onClick={() => sendBankDetailHandler(lead._id)}
                      />
                      <Button
                        className="!px-2 !py-1 text-[13px]"
                        title="Edit"
                        onClick={() => {
                          setIsFormOpen(!isFormOpen)
                          setCurrentUpdateID(lead._id)
                        }}
                        Icon={BiEdit}
                      />
                      <Button
                        className="!px-2 !py-1 text-[13px]"
                        title="Delete"
                        onClick={() => deleteHandler(lead._id)}
                        Icon={FiDelete}
                      />
                    </div>
                  </td>
                ) : (
                  <>
                    <td className="px-4 py-3">{lead.name}</td>
                    <td className="px-4 py-3">{lead.email}</td>
                    <td className="px-4 py-3">{lead.mobile}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-semibold ${
                          lead.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {lead.area}, {lead.address}, {lead.postOffice},{" "}
                        {lead.district}, {lead.state}, {lead.pincode}
                      </span>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {leads?.length === 0 && (
          <div className="py-8 text-center text-gray-500">No leads found</div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
