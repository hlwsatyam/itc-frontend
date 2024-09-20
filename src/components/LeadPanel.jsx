import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BiLocationPlus,
  BiMoney,
  BiPurchaseTag,
  BiStore,
} from "react-icons/bi";
import { BsFlower2, BsGenderAmbiguous, BsSegmentedNav } from "react-icons/bs";

import {
  FaSignOutAlt,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaMailBulk,
} from "react-icons/fa";
import {
  FcBusinessContact,
  FcBusinessman,
  FcNext,
  FcPrevious,
} from "react-icons/fc";
import { FiShield } from "react-icons/fi";
import { GiNextButton, GiPreviousButton, GiStarFlag } from "react-icons/gi";
import { GrCapacity } from "react-icons/gr";
import { IoBusinessOutline, IoResize } from "react-icons/io5";
import {
  MdBusinessCenter,
  MdCall,
  MdGroupWork,
  MdMarkChatRead,
} from "react-icons/md";
import { PiAvocadoFill, PiNumberCircleFiveBold } from "react-icons/pi";
import { SiEducative, SiExpertsexchange } from "react-icons/si";
import { TbPdf } from "react-icons/tb";
import {
  TiBusinessCard,
  TiMediaFastForward,
  TiMessageTyping,
} from "react-icons/ti";
import { Button } from "./ui";
import { RiAiGenerate } from "react-icons/ri";
import { FaJediOrder } from "react-icons/fa6";

import { useLocation, useNavigate } from "react-router-dom";

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
import { backendUrl, compareTimes, sumDateAndMonth } from "../helpers";

import ScheduleMeetingForm from "./ShadualeDate";
import ScriptForm from "./ui/ScriptForm";
import LeadForwardComponent from "./ui/LeadForwardComponent";

const LeadPanel = () => {
  const [leads, setLeads] = useState([]);
  const [permissions, setPermissions] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isScriptModalOpen, setIsScriptModalOpen] = useState(false);
  const [currentClickedID, setCurrentClickedID] = useState(null);
  const [forwardCount, setForwardCount] = useState(5);

  const shadualeLeadHandler = (id) => {
    setCurrentClickedID(id);
    setModalIsOpen(true);
  };

  // Debounce the searchTerm

  // Fetch data when debouncedSearchTerm changes

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
      window.history.back();
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
      fetchData(localStorage.getItem("excutiveLogged"));
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
      window.history.back();
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

  const clickToCall = async (mobileNo) => {
    // Check if mobileNo doesn't already start with "+91"
    if (!mobileNo.startsWith("+91")) {
      mobileNo = "+91" + mobileNo;
    }
    // Trigger the phone call using the 'tel:' scheme
    window.location.href = `tel:${mobileNo}`;
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
        window.location.reload();
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
  const [userDetails, setUserDetails] = useState(null);
  const location = useLocation();
  const { leadId, excutiveID, isAdminClicked } = location.state || null;

  const navigate = useNavigate(location.state);
  const clickNextButton = (direction) => {
    const iDs = JSON.parse(localStorage.getItem("AllID"));

    if (iDs && leadId) {
      const currentIndex = iDs.indexOf(leadId);

      if (direction === "NEXT" && currentIndex < iDs.length - 1) {
        const nextId = iDs[currentIndex + 1];
        navigate("/customer-dashboard/lead", {
          state: { leadId: nextId, excutiveID, isAdminClicked },
        });
        window.location.reload(); // This refreshes the page
      } else if (direction === "PREV" && currentIndex > 0) {
        const prevId = iDs[currentIndex - 1];
        navigate("/customer-dashboard/lead", {
          state: { leadId: prevId, excutiveID, isAdminClicked },
        });
        window.location.reload(); // This refreshes the page
      }
    }
  };

  const welcomeScript = (id) => {
    setCurrentClickedID(id);
    setIsScriptModalOpen(!isScriptModalOpen);
  };

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault(); // prevent default back behavior
      if (isAdminClicked) {
        navigate("/admin-dashboard");
      } else {
        navigate("/excutive-dashboard");
      }
    };
    window.addEventListener("popstate", handleBackButton);
    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUpdateID, setCurrentUpdateID] = useState(null);
  const userHandler = () => {
    window.location.href = "/customer-dashboard/users";
  };

  useEffect(() => {
    if (leadId) {
      fetchData(leadId);
    } else {
      window.location.href = "/";
    }
  }, [leadId]);

  const fetchData = async (isUserLogged) => {
    try {
      const url = `${backendUrl}/api/leadFromAdmin`;

      const res = await axios.post(url, {
        id: isUserLogged,
        excutiveID,
        isAdminClicked,
      });
      if (res.status === 200) {
        setUserDetails(res.data.leads);
        setPermissions(res.data.permissions);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("customerLogged");
    window.location.href = "/";
  };

  const handleViewApprovalLetter = () => {
    window.open(
      `${backendUrl}/api/approval-letter?mobile=${isUserLogged}`,
      "_blank",
    );
  };
  const handleViewAgreementLetter = (agreementLetterName) => {
    window.open(
      `${backendUrl}/api/agreement-letter?name=${agreementLetterName}`,
      "_blank",
    );
  };

  const renderShaduleDateCount = () => {
    if (userDetails?.shaduleDateCount) {
      if (
        sumDateAndMonth(userDetails.dateCount, userDetails.shadualeTime) &&
        compareTimes(userDetails?.selectedTime)
      ) {
        return (
          <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-8">
            <EditCustomerDetailForm
              isFormOpen={isFormOpen}
              isExcutiveMode={true}
              fetchLead={() => window.location.reload()}
              setIsFormOpen={setIsFormOpen}
              id={currentUpdateID}
            />
            <ScheduleMeetingForm
              isExcutiveMode={true}
              fetchLead={() => window.location.reload()}
              setIsOpen={setModalIsOpen}
              id={currentClickedID}
              isOpen={modalIsOpen}
            />
            <ScriptForm
              userDetails={userDetails}
              setIsOpen={setIsScriptModalOpen}
              id={currentClickedID}
              isOpen={isScriptModalOpen}
            />

            <div className="relative mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
              <button
                onClick={handleLogout}
                className="absolute right-4 top-4 flex items-center rounded-full bg-red-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
              <h1 className="mb-4 flex items-center font-semibold text-gray-800">
                <a href="/">
                  <img
                    className="mr-2 h-8 w-8 rounded-full object-cover"
                    src="https://www.itcdistributorships.in/images/logo.png"
                    alt="Logo"
                  />
                </a>
                <span className="hidden sm:block">Customer Dashboard</span>
              </h1>
              <div className="flex items-center justify-end gap-x-2 gap-y-2 sm:flex-row">
                <button
                  onClick={() => clickNextButton("PREV")}
                  className="flex items-center rounded-full bg-red-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
                >
                  <GiPreviousButton className="mr-2" />
                </button>
                <button
                  onClick={() => clickNextButton("NEXT")}
                  className="z flex items-center rounded-full bg-red-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
                >
                  <GiNextButton className="mr-2" />
                </button>
              </div>

              <div className="my-2 flex flex-col items-center justify-center gap-x-2 gap-y-2 sm:flex-row">
                {userDetails?.approvalLetter && (
                  <Button
                    onClick={() =>
                      handleViewAgreementLetter(userDetails.approvalLetter)
                    }
                    Icon={MdMarkChatRead}
                    className="!px-2 !py-1 text-[10px]"
                    title="Approval Letter"
                  />
                )}
                {userDetails?.agreementLetterName && (
                  <Button
                    className="!px-2 !py-1 text-[10px]"
                    title="Agreement Letter"
                    Icon={RiAiGenerate}
                    onClick={() =>
                      handleViewAgreementLetter(userDetails.agreementLetterName)
                    }
                  />
                )}

                {userDetails?.purchaseOrderLetterName && (
                  <Button
                    className="!px-2 !py-1 text-[10px]"
                    title="Purchase Order Letter"
                    Icon={BiPurchaseTag}
                    onClick={() =>
                      handleViewAgreementLetter(
                        userDetails.purchaseOrderLetterName,
                      )
                    }
                  />
                )}
              </div>

              {userDetails && (
                <div className="my-4 grid grid-cols-1 gap-4 border-b-4 md:grid-cols-2">
                  {userDetails.leadManagementStages && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <TiMediaFastForward className="mr-4 text-2xl text-blue-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Lead Status
                        </h2>
                        <p className="text-gray-600">
                          {" "}
                          {userDetails.leadManagementStages}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.shadualeTime && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <TiMediaFastForward className="mr-4 text-2xl text-blue-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Shaduled Time
                        </h2>
                        <p className="text-gray-600">
                          {" "}
                          {userDetails.shadualeTime}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.selectedTime && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <TiMediaFastForward className="mr-4 text-2xl text-blue-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                        Calling Time
                        </h2>
                        <p className="text-gray-600">
                          {" "}
                          {userDetails.selectedTime}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.leadSource && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <TiMediaFastForward className="mr-4 text-2xl text-blue-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Lead Source
                        </h2>
                        <p className="text-gray-600">
                          {" "}
                          {userDetails.leadSource}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.shadualedMesage && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <TiMediaFastForward className="mr-4 text-2xl text-blue-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Message
                        </h2>
                        <p className="text-gray-600">
                          {" "}
                          {userDetails.shadualedMesage}
                        </p>
                      </div>
                    </div>
                  )}

                  <Button
                    className="!text-[10px]"
                    title="Click To Call"
                    onClick={() => clickToCall(userDetails.mobile)}
                    Icon={MdCall}
                  />

                  {(permissions?.Welcome || isAdminClicked) && (
                    <Button
                      className="!text-[10px]"
                      title=" Welcome"
                      onClick={() => sendwelcomeHandler(userDetails._id)}
                      Icon={SiWelcometothejungle}
                    />
                  )}
                  {(permissions?.Approval || isAdminClicked) && (
                    <Button
                      className={` ${userDetails?.approvalLetter && "!text-blue-900"} !text-[10px]`}
                      title="Approval
 "
                      onClick={() =>
                        handleButtonClickForApprooval(userDetails._id)
                      }
                      Icon={PiApproximateEqualsBold}
                    />
                  )}
                  <input
                    type="file"
                    accept="application/pdf"
                    ref={fileInputRefForApprooval}
                    style={{ display: "none" }}
                    onChange={(event) =>
                      handleFileChangeApprooval(event, userDetails._id)
                    }
                  />
                  {(permissions?.Agreement || isAdminClicked) && (
                    <Button
                      className={` ${userDetails?.agreementLetterName && "!text-blue-900"} !text-[10px]`}
                      title="Agreement"
                      Icon={BiBook}
                      onClick={() =>
                        handleButtonClickForAgreement(userDetails._id)
                      }
                    />
                  )}
                  <input
                    type="file"
                    accept="application/pdf"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(event) =>
                      handleFileChange(event, userDetails._id)
                    }
                  />
                  {(permissions?.PurchaseOrder || isAdminClicked) && (
                    <Button
                      className={` ${userDetails?.purchaseOrderLetterName && "!text-blue-900"} !text-[10px]`}
                      title="PurchaseOrder"
                      onClick={() => handleButtonClickForPO(userDetails._id)}
                      Icon={RiOrderPlayFill}
                    />
                  )}
                  <input
                    type="file"
                    accept="application/pdf"
                    ref={fileInputRefForPO}
                    style={{ display: "none" }}
                    onChange={(event) =>
                      handleFileChangePO(event, userDetails._id)
                    }
                  />
                  {(permissions?.Cancellation || isAdminClicked) && (
                    <Button
                      className="!text-[10px]"
                      title="Cancelation"
                      Icon={TiCancel}
                      onClick={() => sendCancelHandler(userDetails._id)}
                    />
                  )}
                  {(permissions?.ShareBankDetails || isAdminClicked) && (
                    <Button
                      className="!text-[10px]"
                      title="ShareBankDetail"
                      Icon={BsBank}
                      onClick={() => sendBankDetailHandler(userDetails._id)}
                    />
                  )}
                  {(permissions?.Edit || isAdminClicked) && (
                    <Button
                      className="!text-[10px]"
                      title="Edit"
                      onClick={() => {
                        setIsFormOpen(!isFormOpen);
                        setCurrentUpdateID(userDetails._id);
                      }}
                      Icon={BiEdit}
                    />
                  )}
                  {(permissions?.Delete || isAdminClicked) && (
                    <Button
                      className="!text-[10px]"
                      title="Delete"
                      onClick={() => deleteHandler(userDetails._id)}
                      Icon={FiDelete}
                    />
                  )}

                  <Button
                    className="!text-[10px]"
                    title={userDetails?.shadualeTime || ""}
                    onClick={() => shadualeLeadHandler(userDetails._id)}
                    Icon={TiTime}
                  />
                  <Button
                    className="!text-[10px]"
                    title={"Welcome Script"}
                    onClick={() => welcomeScript(userDetails._id)}
                    Icon={TiTime}
                  />
                  <select
                    value={userDetails.leadManagementStages}
                    className="h-[100] w-auto rounded bg-blue-600 !text-[10px] text-white"
                    onChange={(e) => handleStatusChange(e, userDetails._id)}
                  >
                    <option value="New Lead">New Lead</option>
                    <option value="details sent on WhatsApp">
                      details sent on WhatsApp
                    </option>
                    <option value="welcome mail sent">welcome mail sent</option>
                    <option value="Callback">Callback</option>
                    <option value="Connected">Connected</option>
                    <option value="Junk Lead">Junk Lead</option>
                    <option value="Interested">Interested</option>

                    <option value="Document Received">Document Received</option>
                    <option value="Approval Process">Approval Process</option>
                    <option value="Agreement Process">Agreement Process</option>
                    <option value="Purchase Order Process">
                      Purchase Order Process
                    </option>
                    <option value="Cancellation">Cancellation</option>
                    <option value="Process Completed">Process Completed</option>
                  </select>
                </div>
              )}

              {userDetails ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {!userDetails.image ? (
                    <div className="relative">
                      <img
                        className="mx-auto h-[200px] w-[200px] rounded-full"
                        src={
                          !userDetails?.nameTitle ||
                          userDetails?.nameTitle === "Mr"
                            ? "https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg"
                            : "https://cdn2.iconfinder.com/data/icons/business-and-finance-related-hand-gestures/256/face_female_blank_user_avatar_mannequin-512.png"
                        }
                        alt=""
                      />

                      {userDetails.approvalLetter && (
                        <img
                          className="absolute right-[20%] top-[50%] mx-auto h-[150px] w-[150px] rounded-full"
                          src={
                            "https://i.postimg.cc/bv2L91Ps/itcapproove-removebg-preview.png"
                          }
                          alt=""
                        />
                      )}
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                    <FaUser className="mr-4 text-2xl text-blue-500" />
                    <div>
                      <h2 className="mb-1 text-xl font-medium text-gray-700">
                        Name
                      </h2>
                      <p className="text-gray-600">
                        {" "}
                        {userDetails.nameTitle} {userDetails.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                    <FaPhone className="mr-4 text-2xl text-red-500" />
                    <div>
                      <h2 className="mb-1 text-xl font-medium text-gray-700">
                        Mobile
                      </h2>
                      <p className="text-gray-600">{userDetails.mobile}</p>
                    </div>
                  </div>

                  <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                    <FaEnvelope className="mr-4 text-2xl text-green-500" />
                    <div>
                      <h2 className="mb-1 text-xl font-medium text-gray-700">
                        Email
                      </h2>
                      <p className="text-gray-600">{userDetails.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                    <FaMapMarkerAlt className="mr-4 text-2xl text-purple-500" />
                    <div>
                      <h2 className="mb-1 text-xl font-medium text-gray-700">
                        Address
                      </h2>
                      <p className="text-gray-600">{userDetails.address}</p>
                      <p className="text-gray-600">
                        {userDetails.area}, {userDetails.disctict}
                      </p>
                      <p className="text-gray-600">
                        {userDetails.state}, {userDetails.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                    <FaBuilding className="mr-4 text-2xl text-yellow-500" />
                    <div>
                      <h2 className="mb-1 text-xl font-medium text-gray-700">
                        Post Office
                      </h2>
                      <p className="text-gray-600">{userDetails.postOffice}</p>
                    </div>
                  </div>

                  {userDetails.marriageStatus && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <BsFlower2 className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Marriage Status
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.marriageStatus}
                        </p>
                      </div>
                    </div>
                  )}

                  {userDetails.gender && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <BsGenderAmbiguous className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          gender Status
                        </h2>
                        <p className="text-gray-600">{userDetails.gender}</p>
                      </div>
                    </div>
                  )}
                  {userDetails.qualification && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <SiEducative className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          qualification Status
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.qualification}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.businessName && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <FcBusinessContact className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Business Name
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.businessName}
                        </p>
                      </div>
                    </div>
                  )}

                  {userDetails.businessAddress && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <TiBusinessCard className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Business Address
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.businessAddress}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails["available_investment_(select_one)"] && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <BiMoney className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Estimated Investment Capacity
                        </h2>
                        <p className="text-gray-600">
                          {userDetails["available_investment_(select_one)"]}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails["preferred_franchisee_segment_(select_one)"] && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <BsSegmentedNav className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Preferred Franchisee Segment
                        </h2>
                        <p className="text-gray-600">
                          {
                            userDetails[
                              "preferred_franchisee_segment_(select_one)"
                            ]
                          }
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails["preferred_business_type_(select_one)"] && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <MdBusinessCenter className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Preferred Business Type
                        </h2>
                        <p className="text-gray-600">
                          {userDetails["preferred_business_type_(select_one)"]}
                        </p>
                      </div>
                    </div>
                  )}

                  {userDetails.gst && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <GiStarFlag className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Do You Have GST Number
                        </h2>
                        <p className="text-gray-600">{userDetails.gst}</p>
                      </div>
                    </div>
                  )}
                  {userDetails.fssai && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <FiShield className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Do You Have FSSAI Certificate
                        </h2>
                        <p className="text-gray-600">{userDetails.fssai}</p>
                      </div>
                    </div>
                  )}
                  {userDetails.businessType && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <IoBusinessOutline className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Business Type
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.businessType}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.experienceInBusiness && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <PiNumberCircleFiveBold className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Year Of Experience In Business
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.experienceInBusiness}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.currentYearTurnover && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <BiMoney className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Current Year Turn Over
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.currentYearTurnover}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.noOfEmploy && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <MdGroupWork className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          No Of Employee
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.noOfEmploy}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.PriviousExperienceInFranchisee && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <SiExpertsexchange className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Do you Hava Experience In Franchise
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.PriviousExperienceInFranchisee}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.researchedOtherFranchisee && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <IoResize className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Have You Researched Another Franchise
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.researchedOtherFranchisee}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.estimatedInve4stmentCapacity && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <GrCapacity className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Your Estimated Investment Capacity
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.estimatedInve4stmentCapacity}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.preferredLocationAvailable && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <BiLocationPlus className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Do You Have Preferred Location Available ?
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.preferredLocationAvailable}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.haveAnyBusinessPlane && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <PiAvocadoFill className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Do You Have Business Plane Available ?
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.haveAnyBusinessPlane}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.projectedTimelineForOpeningFranchisee && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <TiMessageTyping className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Your Projected Timeline For Opening Franchise?
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.projectedTimelineForOpeningFranchisee}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.experienceInMarketing && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <TiMessageTyping className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Do You Have Experience in marketing ?
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.experienceInMarketing}
                        </p>
                      </div>
                    </div>
                  )}
                  {userDetails.experienceInManagingStore && (
                    <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                      <BiStore className="mr-4 text-2xl text-red-500" />
                      <div>
                        <h2 className="mb-1 text-xl font-medium text-gray-700">
                          Do You Have Experience in Managing a Store ?
                        </h2>
                        <p className="text-gray-600">
                          {userDetails.experienceInManagingStore}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* {userDetails.approvalLetter && (
             <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
               <TbPdf className="mr-4 text-2xl text-yellow-500" />
               <div>
                 <button
                   onClick={() =>
                     handleViewAgreementLetter(userDetails.approvalLetter)
                   }
                   className="mb-1 text-xl font-medium text-gray-700"
                 >
                   View Approval Letter
                 </button>
               </div>
             </div>
           )} */}
                  {/* {userDetails.agreementLetterName && (
             <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
               <TbPdf className="mr-4 text-2xl text-yellow-500" />
               <div>
                 <button
                   onClick={() =>
                     handleViewAgreementLetter(userDetails.agreementLetterName)
                   }
                   className="mb-1 text-xl font-medium text-gray-700"
                 >
                   View Agreement Letter
                 </button>
               </div>
             </div>
           )} */}
                  {/* {userDetails.purchaseOrderLetterName && (
             <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
               <TbPdf className="mr-4 text-2xl text-yellow-500" />
               <div>
                 <button
                   onClick={() =>
                     handleViewAgreementLetter(
                       userDetails.purchaseOrderLetterName,
                     )
                   }
                   className="mb-1 text-xl font-medium text-gray-700"
                 >
                   View Purchase Order Letter
                 </button>
               </div>
             </div>
           )} */}
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"
                    alt="Loading..."
                    className="mx-auto mb-4 h-20 w-20"
                  />
                  <p className="text-lg text-gray-600">Loading user data...</p>
                </div>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-8">
            <EditCustomerDetailForm
              isFormOpen={isFormOpen}
              isExcutiveMode={true}
              fetchLead={() => window.location.reload()}
              setIsFormOpen={setIsFormOpen}
              id={currentUpdateID}
            />
            <ScheduleMeetingForm
              isExcutiveMode={true}
              fetchLead={() => window.location.reload()}
              setIsOpen={setModalIsOpen}
              id={currentClickedID}
              isOpen={modalIsOpen}
            />
            <ScriptForm
              userDetails={userDetails}
              setIsOpen={setIsScriptModalOpen}
              id={currentClickedID}
              isOpen={isScriptModalOpen}
            />

            <div className="relative mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
              <button
                onClick={handleLogout}
                className="absolute right-4 top-4 flex items-center rounded-full bg-red-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
              <h1 className="mb-4 flex items-center font-semibold text-gray-800">
                <a href="/">
                  <img
                    className="mr-2 h-8 w-8 rounded-full object-cover"
                    src="https://www.itcdistributorships.in/images/logo.png"
                    alt="Logo"
                  />
                </a>
                <span className="hidden sm:block">Customer Dashboard</span>
              </h1>
              <div className="flex items-center justify-end gap-x-2 gap-y-2 sm:flex-row">
                <button
                  onClick={() => clickNextButton("PREV")}
                  className="flex items-center rounded-full bg-red-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
                >
                  <GiPreviousButton className="mr-2" />
                </button>
                <button
                  onClick={() => clickNextButton("NEXT")}
                  className="z flex items-center rounded-full bg-red-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
                >
                  <GiNextButton className="mr-2" />
                </button>
              </div>

              <LeadForwardComponent
                userDetails={userDetails}
                clickNextButton={clickNextButton}
              />
            </div>
          </div>
        );
      }
    } else {
      <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-8">
        <EditCustomerDetailForm
          isFormOpen={isFormOpen}
          isExcutiveMode={true}
          fetchLead={() => window.location.reload()}
          setIsFormOpen={setIsFormOpen}
          id={currentUpdateID}
        />
        <ScheduleMeetingForm
          isExcutiveMode={true}
          fetchLead={() => window.location.reload()}
          setIsOpen={setModalIsOpen}
          id={currentClickedID}
          isOpen={modalIsOpen}
        />
        <ScriptForm
          userDetails={userDetails}
          setIsOpen={setIsScriptModalOpen}
          id={currentClickedID}
          isOpen={isScriptModalOpen}
        />

        <div className="relative mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
          <button
            onClick={handleLogout}
            className="absolute right-4 top-4 flex items-center rounded-full bg-red-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
          >
            <FaSignOutAlt className="mr-2" /> Logout
          </button>
          <h1 className="mb-4 flex items-center font-semibold text-gray-800">
            <a href="/">
              <img
                className="mr-2 h-8 w-8 rounded-full object-cover"
                src="https://www.itcdistributorships.in/images/logo.png"
                alt="Logo"
              />
            </a>
            <span className="hidden sm:block">Customer Dashboard</span>
          </h1>
          <div className="flex items-center justify-end gap-x-2 gap-y-2 sm:flex-row">
            <button
              onClick={() => clickNextButton("PREV")}
              className="flex items-center rounded-full bg-red-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
            >
              <GiPreviousButton className="mr-2" />
            </button>
            <button
              onClick={() => clickNextButton("NEXT")}
              className="z flex items-center rounded-full bg-red-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
            >
              <GiNextButton className="mr-2" />
            </button>
          </div>

          <div className="my-2 flex flex-col items-center justify-center gap-x-2 gap-y-2 sm:flex-row">
            {userDetails?.approvalLetter && (
              <Button
                onClick={() =>
                  handleViewAgreementLetter(userDetails.approvalLetter)
                }
                Icon={MdMarkChatRead}
                className="!px-2 !py-1 text-[10px]"
                title="Approval Letter"
              />
            )}
            {userDetails?.agreementLetterName && (
              <Button
                className="!px-2 !py-1 text-[10px]"
                title="Agreement Letter"
                Icon={RiAiGenerate}
                onClick={() =>
                  handleViewAgreementLetter(userDetails.agreementLetterName)
                }
              />
            )}

            {userDetails?.purchaseOrderLetterName && (
              <Button
                className="!px-2 !py-1 text-[10px]"
                title="Purchase Order Letter"
                Icon={BiPurchaseTag}
                onClick={() =>
                  handleViewAgreementLetter(userDetails.purchaseOrderLetterName)
                }
              />
            )}
          </div>

          {userDetails && (
            <div className="my-4 grid grid-cols-1 gap-4 border-b-4 md:grid-cols-2">
              {userDetails.leadManagementStages && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <TiMediaFastForward className="mr-4 text-2xl text-blue-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Lead Status
                    </h2>
                    <p className="text-gray-600">
                      {" "}
                      {userDetails.leadManagementStages}
                    </p>
                  </div>
                </div>
              )}
              {userDetails.shadualeTime && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <TiMediaFastForward className="mr-4 text-2xl text-blue-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Shaduled Time
                    </h2>
                    <p className="text-gray-600"> {userDetails.shadualeTime}</p>
                  </div>
                </div>
              )}
              {userDetails.leadSource && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <TiMediaFastForward className="mr-4 text-2xl text-blue-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Lead Source
                    </h2>
                    <p className="text-gray-600"> {userDetails.leadSource}</p>
                  </div>
                </div>
              )}
              {userDetails.shadualedMesage && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <TiMediaFastForward className="mr-4 text-2xl text-blue-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Message
                    </h2>
                    <p className="text-gray-600">
                      {" "}
                      {userDetails.shadualedMesage}
                    </p>
                  </div>
                </div>
              )}

              <Button
                className="!text-[10px]"
                title="Click To Call"
                onClick={() => clickToCall(userDetails.mobile)}
                Icon={MdCall}
              />

              {(permissions?.Welcome || isAdminClicked) && (
                <Button
                  className="!text-[10px]"
                  title=" Welcome"
                  onClick={() => sendwelcomeHandler(userDetails._id)}
                  Icon={SiWelcometothejungle}
                />
              )}
              {(permissions?.Approval || isAdminClicked) && (
                <Button
                  className={` ${userDetails?.approvalLetter && "!text-blue-900"} !text-[10px]`}
                  title="Approval
  "
                  onClick={() => handleButtonClickForApprooval(userDetails._id)}
                  Icon={PiApproximateEqualsBold}
                />
              )}
              <input
                type="file"
                accept="application/pdf"
                ref={fileInputRefForApprooval}
                style={{ display: "none" }}
                onChange={(event) =>
                  handleFileChangeApprooval(event, userDetails._id)
                }
              />
              {(permissions?.Agreement || isAdminClicked) && (
                <Button
                  className={` ${userDetails?.agreementLetterName && "!text-blue-900"} !text-[10px]`}
                  title="Agreement"
                  Icon={BiBook}
                  onClick={() => handleButtonClickForAgreement(userDetails._id)}
                />
              )}
              <input
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(event) => handleFileChange(event, userDetails._id)}
              />
              {(permissions?.PurchaseOrder || isAdminClicked) && (
                <Button
                  className={` ${userDetails?.purchaseOrderLetterName && "!text-blue-900"} !text-[10px]`}
                  title="PurchaseOrder"
                  onClick={() => handleButtonClickForPO(userDetails._id)}
                  Icon={RiOrderPlayFill}
                />
              )}
              <input
                type="file"
                accept="application/pdf"
                ref={fileInputRefForPO}
                style={{ display: "none" }}
                onChange={(event) => handleFileChangePO(event, userDetails._id)}
              />
              {(permissions?.Cancellation || isAdminClicked) && (
                <Button
                  className="!text-[10px]"
                  title="Cancelation"
                  Icon={TiCancel}
                  onClick={() => sendCancelHandler(userDetails._id)}
                />
              )}
              {(permissions?.ShareBankDetails || isAdminClicked) && (
                <Button
                  className="!text-[10px]"
                  title="ShareBankDetail"
                  Icon={BsBank}
                  onClick={() => sendBankDetailHandler(userDetails._id)}
                />
              )}
              {(permissions?.Edit || isAdminClicked) && (
                <Button
                  className="!text-[10px]"
                  title="Edit"
                  onClick={() => {
                    setIsFormOpen(!isFormOpen);
                    setCurrentUpdateID(userDetails._id);
                  }}
                  Icon={BiEdit}
                />
              )}
              {(permissions?.Delete || isAdminClicked) && (
                <Button
                  className="!text-[10px]"
                  title="Delete"
                  onClick={() => deleteHandler(userDetails._id)}
                  Icon={FiDelete}
                />
              )}

              <Button
                className="!text-[10px]"
                title={userDetails?.shadualeTime || ""}
                onClick={() => shadualeLeadHandler(userDetails._id)}
                Icon={TiTime}
              />
              <Button
                className="!text-[10px]"
                title={"Welcome Script"}
                onClick={() => welcomeScript(userDetails._id)}
                Icon={TiTime}
              />
              <select
                value={userDetails.leadManagementStages}
                className="h-[100] w-auto rounded bg-blue-600 !text-[10px] text-white"
                onChange={(e) => handleStatusChange(e, userDetails._id)}
              >
                <option value="New Lead">New Lead</option>
                <option value="details sent on WhatsApp">
                  details sent on WhatsApp
                </option>
                <option value="welcome mail sent">welcome mail sent</option>
                <option value="Callback">Callback</option>
                <option value="Connected">Connected</option>
                <option value="Junk Lead">Junk Lead</option>
                <option value="Interested">Interested</option>

                <option value="Document Received">Document Received</option>
                <option value="Approval Process">Approval Process</option>
                <option value="Agreement Process">Agreement Process</option>
                <option value="Purchase Order Process">
                  Purchase Order Process
                </option>
                <option value="Cancellation">Cancellation</option>
                <option value="Process Completed">Process Completed</option>
              </select>
            </div>
          )}

          {userDetails ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {!userDetails.image ? (
                <div className="relative">
                  <img
                    className="mx-auto h-[200px] w-[200px] rounded-full"
                    src={
                      !userDetails?.nameTitle || userDetails?.nameTitle === "Mr"
                        ? "https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg"
                        : "https://cdn2.iconfinder.com/data/icons/business-and-finance-related-hand-gestures/256/face_female_blank_user_avatar_mannequin-512.png"
                    }
                    alt=""
                  />

                  {userDetails.approvalLetter && (
                    <img
                      className="absolute right-[20%] top-[50%] mx-auto h-[150px] w-[150px] rounded-full"
                      src={
                        "https://i.postimg.cc/bv2L91Ps/itcapproove-removebg-preview.png"
                      }
                      alt=""
                    />
                  )}
                </div>
              ) : (
                ""
              )}

              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <FaUser className="mr-4 text-2xl text-blue-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Name
                  </h2>
                  <p className="text-gray-600">
                    {" "}
                    {userDetails.nameTitle} {userDetails.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <FaPhone className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Mobile
                  </h2>
                  <p className="text-gray-600">{userDetails.mobile}</p>
                </div>
              </div>

              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <FaEnvelope className="mr-4 text-2xl text-green-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Email
                  </h2>
                  <p className="text-gray-600">{userDetails.email}</p>
                </div>
              </div>

              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <FaMapMarkerAlt className="mr-4 text-2xl text-purple-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Address
                  </h2>
                  <p className="text-gray-600">{userDetails.address}</p>
                  <p className="text-gray-600">
                    {userDetails.area}, {userDetails.disctict}
                  </p>
                  <p className="text-gray-600">
                    {userDetails.state}, {userDetails.pincode}
                  </p>
                </div>
              </div>
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <FaBuilding className="mr-4 text-2xl text-yellow-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Post Office
                  </h2>
                  <p className="text-gray-600">{userDetails.postOffice}</p>
                </div>
              </div>

              {userDetails.marriageStatus && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <BsFlower2 className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Marriage Status
                    </h2>
                    <p className="text-gray-600">
                      {userDetails.marriageStatus}
                    </p>
                  </div>
                </div>
              )}

              {userDetails.gender && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <BsGenderAmbiguous className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      gender Status
                    </h2>
                    <p className="text-gray-600">{userDetails.gender}</p>
                  </div>
                </div>
              )}
              {userDetails.qualification && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <SiEducative className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      qualification Status
                    </h2>
                    <p className="text-gray-600">{userDetails.qualification}</p>
                  </div>
                </div>
              )}
              {userDetails.businessName && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <FcBusinessContact className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Business Name
                    </h2>
                    <p className="text-gray-600">{userDetails.businessName}</p>
                  </div>
                </div>
              )}

              {userDetails.businessAddress && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <TiBusinessCard className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Business Address
                    </h2>
                    <p className="text-gray-600">
                      {userDetails.businessAddress}
                    </p>
                  </div>
                </div>
              )}
              {userDetails["available_investment_(select_one)"] && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <BiMoney className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Estimated Investment Capacity
                    </h2>
                    <p className="text-gray-600">
                      {userDetails["available_investment_(select_one)"]}
                    </p>
                  </div>
                </div>
              )}
              {userDetails["preferred_franchisee_segment_(select_one)"] && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <BsSegmentedNav className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Preferred Franchisee Segment
                    </h2>
                    <p className="text-gray-600">
                      {userDetails["preferred_franchisee_segment_(select_one)"]}
                    </p>
                  </div>
                </div>
              )}
              {userDetails["preferred_business_type_(select_one)"] && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <MdBusinessCenter className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Preferred Business Type
                    </h2>
                    <p className="text-gray-600">
                      {userDetails["preferred_business_type_(select_one)"]}
                    </p>
                  </div>
                </div>
              )}

              {userDetails.gst && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <GiStarFlag className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Do You Have GST Number
                    </h2>
                    <p className="text-gray-600">{userDetails.gst}</p>
                  </div>
                </div>
              )}
              {userDetails.fssai && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <FiShield className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Do You Have FSSAI Certificate
                    </h2>
                    <p className="text-gray-600">{userDetails.fssai}</p>
                  </div>
                </div>
              )}
              {userDetails.businessType && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <IoBusinessOutline className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Business Type
                    </h2>
                    <p className="text-gray-600">{userDetails.businessType}</p>
                  </div>
                </div>
              )}
              {userDetails.experienceInBusiness && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <PiNumberCircleFiveBold className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Year Of Experience In Business
                    </h2>
                    <p className="text-gray-600">
                      {userDetails.experienceInBusiness}
                    </p>
                  </div>
                </div>
              )}
              {userDetails.currentYearTurnover && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <BiMoney className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Current Year Turn Over
                    </h2>
                    <p className="text-gray-600">
                      {userDetails.currentYearTurnover}
                    </p>
                  </div>
                </div>
              )}
              {userDetails.noOfEmploy && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <MdGroupWork className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      No Of Employee
                    </h2>
                    <p className="text-gray-600">{userDetails.noOfEmploy}</p>
                  </div>
                </div>
              )}
              {userDetails.PriviousExperienceInFranchisee && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <SiExpertsexchange className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Do you Hava Experience In Franchise
                    </h2>
                    <p className="text-gray-600">
                      {userDetails.PriviousExperienceInFranchisee}
                    </p>
                  </div>
                </div>
              )}
              {userDetails.researchedOtherFranchisee && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <IoResize className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Have You Researched Another Franchise
                    </h2>
                    <p className="text-gray-600">
                      {userDetails.researchedOtherFranchisee}
                    </p>
                  </div>
                </div>
              )}
              {userDetails.estimatedInve4stmentCapacity && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <GrCapacity className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Your Estimated Investment Capacity
                    </h2>
                    <p className="text-gray-600">
                      {userDetails.estimatedInve4stmentCapacity}
                    </p>
                  </div>
                </div>
              )}
              {userDetails.preferredLocationAvailable && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <BiLocationPlus className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Do You Have Preferred Location Available ?
                    </h2>
                    <p className="text-gray-600">
                      {userDetails.preferredLocationAvailable}
                    </p>
                  </div>
                </div>
              )}
              {userDetails.haveAnyBusinessPlane && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <PiAvocadoFill className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Do You Have Business Plane Available ?
                    </h2>
                    <p className="text-gray-600">
                      {userDetails.haveAnyBusinessPlane}
                    </p>
                  </div>
                </div>
              )}
              {userDetails.projectedTimelineForOpeningFranchisee && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <TiMessageTyping className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Your Projected Timeline For Opening Franchise?
                    </h2>
                    <p className="text-gray-600">
                      {userDetails.projectedTimelineForOpeningFranchisee}
                    </p>
                  </div>
                </div>
              )}
              {userDetails.experienceInMarketing && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <TiMessageTyping className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Do You Have Experience in marketing ?
                    </h2>
                    <p className="text-gray-600">
                      {userDetails.experienceInMarketing}
                    </p>
                  </div>
                </div>
              )}
              {userDetails.experienceInManagingStore && (
                <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                  <BiStore className="mr-4 text-2xl text-red-500" />
                  <div>
                    <h2 className="mb-1 text-xl font-medium text-gray-700">
                      Do You Have Experience in Managing a Store ?
                    </h2>
                    <p className="text-gray-600">
                      {userDetails.experienceInManagingStore}
                    </p>
                  </div>
                </div>
              )}

              {/* {userDetails.approvalLetter && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <TbPdf className="mr-4 text-2xl text-yellow-500" />
                <div>
                  <button
                    onClick={() =>
                      handleViewAgreementLetter(userDetails.approvalLetter)
                    }
                    className="mb-1 text-xl font-medium text-gray-700"
                  >
                    View Approval Letter
                  </button>
                </div>
              </div>
            )} */}
              {/* {userDetails.agreementLetterName && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <TbPdf className="mr-4 text-2xl text-yellow-500" />
                <div>
                  <button
                    onClick={() =>
                      handleViewAgreementLetter(userDetails.agreementLetterName)
                    }
                    className="mb-1 text-xl font-medium text-gray-700"
                  >
                    View Agreement Letter
                  </button>
                </div>
              </div>
            )} */}
              {/* {userDetails.purchaseOrderLetterName && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <TbPdf className="mr-4 text-2xl text-yellow-500" />
                <div>
                  <button
                    onClick={() =>
                      handleViewAgreementLetter(
                        userDetails.purchaseOrderLetterName,
                      )
                    }
                    className="mb-1 text-xl font-medium text-gray-700"
                  >
                    View Purchase Order Letter
                  </button>
                </div>
              </div>
            )} */}
            </div>
          ) : (
            <div className="text-center">
              <img
                src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"
                alt="Loading..."
                className="mx-auto mb-4 h-20 w-20"
              />
              <p className="text-lg text-gray-600">Loading user data...</p>
            </div>
          )}
        </div>
      </div>;
    }
  };

  return userDetails?.shaduleDateCount ? (
    renderShaduleDateCount()
  ) : (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-8">
      <EditCustomerDetailForm
        isFormOpen={isFormOpen}
        isExcutiveMode={true}
        fetchLead={() => window.location.reload()}
        setIsFormOpen={setIsFormOpen}
        id={currentUpdateID}
      />
      <ScheduleMeetingForm
        isExcutiveMode={true}
        fetchLead={() => window.location.reload()}
        setIsOpen={setModalIsOpen}
        id={currentClickedID}
        isOpen={modalIsOpen}
      />
      <ScriptForm
        userDetails={userDetails}
        setIsOpen={setIsScriptModalOpen}
        id={currentClickedID}
        isOpen={isScriptModalOpen}
      />

      <div className="relative mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={handleLogout}
          className="absolute right-4 top-4 flex items-center rounded-full bg-red-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
        <h1 className="mb-4 flex items-center font-semibold text-gray-800">
          <a href="/">
            <img
              className="mr-2 h-8 w-8 rounded-full object-cover"
              src="https://www.itcdistributorships.in/images/logo.png"
              alt="Logo"
            />
          </a>
          <span className="hidden sm:block">Customer Dashboard</span>
        </h1>
        <div className="flex items-center justify-end gap-x-2 gap-y-2 sm:flex-row">
          <button
            onClick={() => clickNextButton("PREV")}
            className="flex items-center rounded-full bg-red-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
          >
            <GiPreviousButton className="mr-2" />
          </button>
          <button
            onClick={() => clickNextButton("NEXT")}
            className="z flex items-center rounded-full bg-red-500 px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-red-600"
          >
            <GiNextButton className="mr-2" />
          </button>
        </div>

        <div className="my-2 flex flex-col items-center justify-center gap-x-2 gap-y-2 sm:flex-row">
          {userDetails?.approvalLetter && (
            <Button
              onClick={() =>
                handleViewAgreementLetter(userDetails.approvalLetter)
              }
              Icon={MdMarkChatRead}
              className="!px-2 !py-1 text-[10px]"
              title="Approval Letter"
            />
          )}
          {userDetails?.agreementLetterName && (
            <Button
              className="!px-2 !py-1 text-[10px]"
              title="Agreement Letter"
              Icon={RiAiGenerate}
              onClick={() =>
                handleViewAgreementLetter(userDetails.agreementLetterName)
              }
            />
          )}

          {userDetails?.purchaseOrderLetterName && (
            <Button
              className="!px-2 !py-1 text-[10px]"
              title="Purchase Order Letter"
              Icon={BiPurchaseTag}
              onClick={() =>
                handleViewAgreementLetter(userDetails.purchaseOrderLetterName)
              }
            />
          )}
        </div>

        {userDetails && (
          <div className="my-4 grid grid-cols-1 gap-4 border-b-4 md:grid-cols-2">
            {userDetails.leadManagementStages && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <TiMediaFastForward className="mr-4 text-2xl text-blue-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Lead Status
                  </h2>
                  <p className="text-gray-600">
                    {" "}
                    {userDetails.leadManagementStages}
                  </p>
                </div>
              </div>
            )}
            {userDetails.shadualeTime && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <TiMediaFastForward className="mr-4 text-2xl text-blue-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Shaduled Time
                  </h2>
                  <p className="text-gray-600"> {userDetails.shadualeTime}</p>
                </div>
              </div>
            )}
            {userDetails.leadSource && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <TiMediaFastForward className="mr-4 text-2xl text-blue-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Lead Source
                  </h2>
                  <p className="text-gray-600"> {userDetails.leadSource}</p>
                </div>
              </div>
            )}
            {userDetails.shadualedMesage && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <TiMediaFastForward className="mr-4 text-2xl text-blue-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Message
                  </h2>
                  <p className="text-gray-600">
                    {" "}
                    {userDetails.shadualedMesage}
                  </p>
                </div>
              </div>
            )}

            <Button
              className="!text-[10px]"
              title="Click To Call"
              onClick={() => clickToCall(userDetails.mobile)}
              Icon={MdCall}
            />

            {(permissions?.Welcome || isAdminClicked) && (
              <Button
                className="!text-[10px]"
                title=" Welcome"
                onClick={() => sendwelcomeHandler(userDetails._id)}
                Icon={SiWelcometothejungle}
              />
            )}
            {(permissions?.Approval || isAdminClicked) && (
              <Button
                className={` ${userDetails?.approvalLetter && "!text-blue-900"} !text-[10px]`}
                title="Approval
"
                onClick={() => handleButtonClickForApprooval(userDetails._id)}
                Icon={PiApproximateEqualsBold}
              />
            )}
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRefForApprooval}
              style={{ display: "none" }}
              onChange={(event) =>
                handleFileChangeApprooval(event, userDetails._id)
              }
            />
            {(permissions?.Agreement || isAdminClicked) && (
              <Button
                className={` ${userDetails?.agreementLetterName && "!text-blue-900"} !text-[10px]`}
                title="Agreement"
                Icon={BiBook}
                onClick={() => handleButtonClickForAgreement(userDetails._id)}
              />
            )}
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(event) => handleFileChange(event, userDetails._id)}
            />
            {(permissions?.PurchaseOrder || isAdminClicked) && (
              <Button
                className={` ${userDetails?.purchaseOrderLetterName && "!text-blue-900"} !text-[10px]`}
                title="PurchaseOrder"
                onClick={() => handleButtonClickForPO(userDetails._id)}
                Icon={RiOrderPlayFill}
              />
            )}
            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRefForPO}
              style={{ display: "none" }}
              onChange={(event) => handleFileChangePO(event, userDetails._id)}
            />
            {(permissions?.Cancellation || isAdminClicked) && (
              <Button
                className="!text-[10px]"
                title="Cancelation"
                Icon={TiCancel}
                onClick={() => sendCancelHandler(userDetails._id)}
              />
            )}
            {(permissions?.ShareBankDetails || isAdminClicked) && (
              <Button
                className="!text-[10px]"
                title="ShareBankDetail"
                Icon={BsBank}
                onClick={() => sendBankDetailHandler(userDetails._id)}
              />
            )}
            {(permissions?.Edit || isAdminClicked) && (
              <Button
                className="!text-[10px]"
                title="Edit"
                onClick={() => {
                  setIsFormOpen(!isFormOpen);
                  setCurrentUpdateID(userDetails._id);
                }}
                Icon={BiEdit}
              />
            )}
            {(permissions?.Delete || isAdminClicked) && (
              <Button
                className="!text-[10px]"
                title="Delete"
                onClick={() => deleteHandler(userDetails._id)}
                Icon={FiDelete}
              />
            )}

            <Button
              className="!text-[10px]"
              title={userDetails?.shadualeTime || ""}
              onClick={() => shadualeLeadHandler(userDetails._id)}
              Icon={TiTime}
            />
            <Button
              className="!text-[10px]"
              title={"Welcome Script"}
              onClick={() => welcomeScript(userDetails._id)}
              Icon={TiTime}
            />
            <select
              value={userDetails.leadManagementStages}
              className="h-[100] w-auto rounded bg-blue-600 !text-[10px] text-white"
              onChange={(e) => handleStatusChange(e, userDetails._id)}
            >
              <option value="New Lead">New Lead</option>
              <option value="details sent on WhatsApp">
                details sent on WhatsApp
              </option>
              <option value="welcome mail sent">welcome mail sent</option>
              <option value="Callback">Callback</option>
              <option value="Connected">Connected</option>
              <option value="Junk Lead">Junk Lead</option>
              <option value="Interested">Interested</option>

              <option value="Document Received">Document Received</option>
              <option value="Approval Process">Approval Process</option>
              <option value="Agreement Process">Agreement Process</option>
              <option value="Purchase Order Process">
                Purchase Order Process
              </option>
              <option value="Cancellation">Cancellation</option>
              <option value="Process Completed">Process Completed</option>
            </select>
          </div>
        )}

        {userDetails ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {!userDetails.image ? (
              <div className="relative">
                <img
                  className="mx-auto h-[200px] w-[200px] rounded-full"
                  src={
                    !userDetails?.nameTitle || userDetails?.nameTitle === "Mr"
                      ? "https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg"
                      : "https://cdn2.iconfinder.com/data/icons/business-and-finance-related-hand-gestures/256/face_female_blank_user_avatar_mannequin-512.png"
                  }
                  alt=""
                />

                {userDetails.approvalLetter && (
                  <img
                    className="absolute right-[20%] top-[50%] mx-auto h-[150px] w-[150px] rounded-full"
                    src={
                      "https://i.postimg.cc/bv2L91Ps/itcapproove-removebg-preview.png"
                    }
                    alt=""
                  />
                )}
              </div>
            ) : (
              ""
            )}

            <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
              <FaUser className="mr-4 text-2xl text-blue-500" />
              <div>
                <h2 className="mb-1 text-xl font-medium text-gray-700">Name</h2>
                <p className="text-gray-600">
                  {" "}
                  {userDetails.nameTitle} {userDetails.name}
                </p>
              </div>
            </div>

            <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
              <FaPhone className="mr-4 text-2xl text-red-500" />
              <div>
                <h2 className="mb-1 text-xl font-medium text-gray-700">
                  Mobile
                </h2>
                <p className="text-gray-600">{userDetails.mobile}</p>
              </div>
            </div>

            <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
              <FaEnvelope className="mr-4 text-2xl text-green-500" />
              <div>
                <h2 className="mb-1 text-xl font-medium text-gray-700">
                  Email
                </h2>
                <p className="text-gray-600">{userDetails.email}</p>
              </div>
            </div>

            <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
              <FaMapMarkerAlt className="mr-4 text-2xl text-purple-500" />
              <div>
                <h2 className="mb-1 text-xl font-medium text-gray-700">
                  Address
                </h2>
                <p className="text-gray-600">{userDetails.address}</p>
                <p className="text-gray-600">
                  {userDetails.area}, {userDetails.disctict}
                </p>
                <p className="text-gray-600">
                  {userDetails.state}, {userDetails.pincode}
                </p>
              </div>
            </div>
            <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
              <FaBuilding className="mr-4 text-2xl text-yellow-500" />
              <div>
                <h2 className="mb-1 text-xl font-medium text-gray-700">
                  Post Office
                </h2>
                <p className="text-gray-600">{userDetails.postOffice}</p>
              </div>
            </div>

            {userDetails.marriageStatus && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <BsFlower2 className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Marriage Status
                  </h2>
                  <p className="text-gray-600">{userDetails.marriageStatus}</p>
                </div>
              </div>
            )}

            {userDetails.gender && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <BsGenderAmbiguous className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    gender Status
                  </h2>
                  <p className="text-gray-600">{userDetails.gender}</p>
                </div>
              </div>
            )}
            {userDetails.qualification && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <SiEducative className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    qualification Status
                  </h2>
                  <p className="text-gray-600">{userDetails.qualification}</p>
                </div>
              </div>
            )}
            {userDetails.businessName && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <FcBusinessContact className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Business Name
                  </h2>
                  <p className="text-gray-600">{userDetails.businessName}</p>
                </div>
              </div>
            )}

            {userDetails.businessAddress && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <TiBusinessCard className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Business Address
                  </h2>
                  <p className="text-gray-600">{userDetails.businessAddress}</p>
                </div>
              </div>
            )}
            {userDetails["available_investment_(select_one)"] && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <BiMoney className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Estimated Investment Capacity
                  </h2>
                  <p className="text-gray-600">
                    {userDetails["available_investment_(select_one)"]}
                  </p>
                </div>
              </div>
            )}
            {userDetails["preferred_franchisee_segment_(select_one)"] && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <BsSegmentedNav className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Preferred Franchisee Segment
                  </h2>
                  <p className="text-gray-600">
                    {userDetails["preferred_franchisee_segment_(select_one)"]}
                  </p>
                </div>
              </div>
            )}
            {userDetails["preferred_business_type_(select_one)"] && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <MdBusinessCenter className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Preferred Business Type
                  </h2>
                  <p className="text-gray-600">
                    {userDetails["preferred_business_type_(select_one)"]}
                  </p>
                </div>
              </div>
            )}

            {userDetails.gst && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <GiStarFlag className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Do You Have GST Number
                  </h2>
                  <p className="text-gray-600">{userDetails.gst}</p>
                </div>
              </div>
            )}
            {userDetails.fssai && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <FiShield className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Do You Have FSSAI Certificate
                  </h2>
                  <p className="text-gray-600">{userDetails.fssai}</p>
                </div>
              </div>
            )}
            {userDetails.businessType && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <IoBusinessOutline className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Business Type
                  </h2>
                  <p className="text-gray-600">{userDetails.businessType}</p>
                </div>
              </div>
            )}
            {userDetails.experienceInBusiness && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <PiNumberCircleFiveBold className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Year Of Experience In Business
                  </h2>
                  <p className="text-gray-600">
                    {userDetails.experienceInBusiness}
                  </p>
                </div>
              </div>
            )}
            {userDetails.currentYearTurnover && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <BiMoney className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Current Year Turn Over
                  </h2>
                  <p className="text-gray-600">
                    {userDetails.currentYearTurnover}
                  </p>
                </div>
              </div>
            )}
            {userDetails.noOfEmploy && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <MdGroupWork className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    No Of Employee
                  </h2>
                  <p className="text-gray-600">{userDetails.noOfEmploy}</p>
                </div>
              </div>
            )}
            {userDetails.PriviousExperienceInFranchisee && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <SiExpertsexchange className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Do you Hava Experience In Franchise
                  </h2>
                  <p className="text-gray-600">
                    {userDetails.PriviousExperienceInFranchisee}
                  </p>
                </div>
              </div>
            )}
            {userDetails.researchedOtherFranchisee && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <IoResize className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Have You Researched Another Franchise
                  </h2>
                  <p className="text-gray-600">
                    {userDetails.researchedOtherFranchisee}
                  </p>
                </div>
              </div>
            )}
            {userDetails.estimatedInve4stmentCapacity && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <GrCapacity className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Your Estimated Investment Capacity
                  </h2>
                  <p className="text-gray-600">
                    {userDetails.estimatedInve4stmentCapacity}
                  </p>
                </div>
              </div>
            )}
            {userDetails.preferredLocationAvailable && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <BiLocationPlus className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Do You Have Preferred Location Available ?
                  </h2>
                  <p className="text-gray-600">
                    {userDetails.preferredLocationAvailable}
                  </p>
                </div>
              </div>
            )}
            {userDetails.haveAnyBusinessPlane && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <PiAvocadoFill className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Do You Have Business Plane Available ?
                  </h2>
                  <p className="text-gray-600">
                    {userDetails.haveAnyBusinessPlane}
                  </p>
                </div>
              </div>
            )}
            {userDetails.projectedTimelineForOpeningFranchisee && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <TiMessageTyping className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Your Projected Timeline For Opening Franchise?
                  </h2>
                  <p className="text-gray-600">
                    {userDetails.projectedTimelineForOpeningFranchisee}
                  </p>
                </div>
              </div>
            )}
            {userDetails.experienceInMarketing && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <TiMessageTyping className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Do You Have Experience in marketing ?
                  </h2>
                  <p className="text-gray-600">
                    {userDetails.experienceInMarketing}
                  </p>
                </div>
              </div>
            )}
            {userDetails.experienceInManagingStore && (
              <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
                <BiStore className="mr-4 text-2xl text-red-500" />
                <div>
                  <h2 className="mb-1 text-xl font-medium text-gray-700">
                    Do You Have Experience in Managing a Store ?
                  </h2>
                  <p className="text-gray-600">
                    {userDetails.experienceInManagingStore}
                  </p>
                </div>
              </div>
            )}

            {/* {userDetails.approvalLetter && (
            <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
              <TbPdf className="mr-4 text-2xl text-yellow-500" />
              <div>
                <button
                  onClick={() =>
                    handleViewAgreementLetter(userDetails.approvalLetter)
                  }
                  className="mb-1 text-xl font-medium text-gray-700"
                >
                  View Approval Letter
                </button>
              </div>
            </div>
          )} */}
            {/* {userDetails.agreementLetterName && (
            <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
              <TbPdf className="mr-4 text-2xl text-yellow-500" />
              <div>
                <button
                  onClick={() =>
                    handleViewAgreementLetter(userDetails.agreementLetterName)
                  }
                  className="mb-1 text-xl font-medium text-gray-700"
                >
                  View Agreement Letter
                </button>
              </div>
            </div>
          )} */}
            {/* {userDetails.purchaseOrderLetterName && (
            <div className="flex items-center rounded-lg bg-gray-100 p-4 shadow-sm">
              <TbPdf className="mr-4 text-2xl text-yellow-500" />
              <div>
                <button
                  onClick={() =>
                    handleViewAgreementLetter(
                      userDetails.purchaseOrderLetterName,
                    )
                  }
                  className="mb-1 text-xl font-medium text-gray-700"
                >
                  View Purchase Order Letter
                </button>
              </div>
            </div>
          )} */}
          </div>
        ) : (
          <div className="text-center">
            <img
              src="https://media.giphy.com/media/xTk9ZvMnbIiIew7IpW/giphy.gif"
              alt="Loading..."
              className="mx-auto mb-4 h-20 w-20"
            />
            <p className="text-lg text-gray-600">Loading user data...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadPanel;
