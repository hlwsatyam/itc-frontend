import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "./ui";
import { BiBook, BiEdit, BiLogOut, BiUpload } from "react-icons/bi";
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
import { TiCancel, TiTime } from "react-icons/ti";
import { FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";
import EditCustomerDetailForm from "./EditCustomerDetailForm";
import { backendUrl } from "../helpers";
import { CgUserAdd } from "react-icons/cg";
import ScheduleMeetingForm from "./ShadualeDate";
import { useNavigate } from "react-router-dom";

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

  const fetchData = async () => {
    try {
      const url =
        debouncedSearchTerm === ""
          ? `${backendUrl}/api/leads`
          : `${backendUrl}/api/leads/${debouncedSearchTerm}`;
      const res = await axios.post(url, {});
      if (res.status === 200) {
        setLeads(res.data.leads);
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
    const res = await axios.post(`${backendUrl}/api/lead/delete/${id}`, {});
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
      window.location.reload();
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

      window.location.reload();
    }
  };
  const sendCancelHandler = async (id) => {
    const res = await axios.post(`${backendUrl}/api/lead/sendCancel/${id}`, {});
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
  const handleStatusChange = async (e, id) => {
    try {
      const selectedStage = e.target.value;
      console.log(selectedStage);
      const res = await axios.post(
        `${backendUrl}/api/lead/leadManagementStages/${id}`,
        { leadManagementStage: selectedStage },
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
        fetchData();
      }
    } catch (error) {
      console.error("Error updating lead status:", error);
      toast.error("Failed to update lead status", {
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
        window.location.reload();
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
        window.location.reload();
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
        window.location.reload();
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUpdateID, setCurrentUpdateID] = useState(null);
  const [currentClickedID, setCurrentClickedID] = useState(null);
  const userHandler = () => {
    window.location.href = "/customer-dashboard/users";
  };

  const shadualeLeadHandler = (id) => {
    setCurrentClickedID(id);
    setModalIsOpen(true);
  };

  // Fetch data when debouncedSearchTerm changes
  useEffect(() => {
    const isAdminLogged = localStorage.getItem("adminLogged");
    if (isAdminLogged === "true") {
      fetchData();
    } else {
      window.location.href = "/";
    }
  }, [debouncedSearchTerm]);

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ScheduleMeetingForm
        setIsOpen={setModalIsOpen}
        id={currentClickedID}
        isAdmin={true}
        fetchLead={fetchData}
        isOpen={modalIsOpen}
      />
      <EditCustomerDetailForm
        isAdmin={true}
        fetchLead={fetchData}
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
        id={currentUpdateID}
      />
      <h1 className="relative mb-8 flex items-center justify-between text-[17px] font-bold text-gray-800">
        <h1 className="font-semibold text-gray-800">
          <a href="/">
            <img
              className="mr-2 h-8 w-8 rounded-full object-cover"
              src="https://www.itcdistributorships.in/images/logo.png"
              alt="Logo"
            />
          </a>
        </h1>
        <Button
          className="!px-2 !py-1 text-[0px] sm:text-[13px]"
          onClick={accountHandler}
          title="Add Acount"
          Icon={BsBank}
        />
        <Button
          className="!px-2 !py-1 text-[0px] sm:text-[13px]"
          onClick={userHandler}
          title="Users"
          Icon={CgUserAdd}
        />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search"
          className="rounded-lg border border-gray-300 px-4 py-2 text-[12px]"
        />{" "}
        <Button
          onClick={() => {
            window.location.href = "/admin/insert";
          }}
          title=""
          className="!px-2 !py-1 text-[0px] sm:text-[11px]"
          Icon={BiUpload}
        />{" "}
        <Button
          onClick={logoutHandler}
          title="Logout"
          className="!px-2 !py-1 text-[0px] sm:text-[11px]"
          Icon={BiLogOut}
        />{" "}
      </h1>

      <div className="overflow-y-auto rounded-lg bg-white shadow-md">
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
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {leads?.map((lead, index) => (
              <tr
                key={index}
                onClick={(event) => {
                  // Check if the clicked element is a button or inside a button
                  if (
                    event.target.tagName !== "BUTTON" &&
                    !event.target.closest("button")
                  ) {
                    const allId = leads.map((i) => i._id);
                    localStorage.setItem("AllID", JSON.stringify(allId));
                    navigate("/customer-dashboard/lead", {
                      state: { leadId: lead._id, isAdminClicked: true },
                    });
                  }
                }}
                onMouseOver={() => setHoveredRowIndex(index)}
                onMouseLeave={() => setHoveredRowIndex(null)}
                className={`border-t ${lead?.isSomethingChange ? "bg-green-700/40" : ""} hover:bg-gray-300`}
              >
                {hoveredRowIndex === index ? (
                  <td colSpan="8" className="px-4 py-3">
                    <td className="px-4 py-3">
                      {" "}
                      {index + 1}. {lead.name}
                    </td>
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
                        className="h-[17px] !text-[10px]"
                        title="Welcome"
                        onClick={() => sendwelcomeHandler(lead._id)}
                        Icon={SiWelcometothejungle}
                      />
                      <Button
                        className={` ${lead?.approvalLetter && "!text-blue-900"} h-[17px] !text-[10px]`}
                        title="Approval"
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
                        className={`!px-2 ${lead?.agreementLetterName && "!text-blue-900"} h-[17px] !text-[10px]`}
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
                        className={` ${lead?.purchaseOrderLetterName && "!text-blue-900"} h-[17px] !text-[10px]`}
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
                        className="h-[17px] !text-[10px]"
                        title=""
                        Icon={TiCancel}
                        onClick={() => sendCancelHandler(lead._id)}
                      />
                      <Button
                        className="h-[17px] !text-[10px]"
                        title=""
                        Icon={BsBank}
                        onClick={() => sendBankDetailHandler(lead._id)}
                      />
                      <Button
                        className="!px-2 !py-1 text-[13px]"
                        title=""
                        onClick={() => {
                          setIsFormOpen(!isFormOpen);
                          setCurrentUpdateID(lead._id);
                        }}
                        Icon={BiEdit}
                      />
                      <Button
                        className="!px-2 !py-1 text-[13px]"
                        title=""
                        onClick={() => deleteHandler(lead._id)}
                        Icon={FiDelete}
                      />
                      <Button
                        className="h-[17px] !text-[10px]"
                        title={lead?.shadualeTime || ""}
                        onClick={() => shadualeLeadHandler(lead._id)}
                        Icon={TiTime}
                      />
                      <select
                        value={lead.leadManagementStages}
                        className="h-[100] rounded bg-blue-600 !text-[10px] text-white"
                        onChange={(e) => handleStatusChange(e, lead._id)}
                      >
                        <option value="New Lead">New Lead</option>
                        <option value="Callback">Callback</option>
                        <option value="Connected">Connected</option>
                        <option value="Junk Lead">Junk Lead</option>
                        <option value="Interested">Interested</option>

                        <option value="Document Received">
                          Document Received
                        </option>
                        <option value="Approval Process">
                          Approval Process
                        </option>
                        <option value="Agreement Process">
                          Agreement Process
                        </option>
                        <option value="Purchase Order Process">
                          Purchase Order Process
                        </option>
                        <option value="Cancellation">Cancellation</option>
                        <option value="Process Completed">
                          Process Completed
                        </option>
                      </select>
                    </div>
                  </td>
                ) : (
                  <>
                    <td className="px-4 py-3">
                      {" "}
                      {index + 1}. {lead.name}
                    </td>
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

                    <td className="px-4 py-3">
                      {new Date(lead.createdAt).toLocaleDateString()}
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
