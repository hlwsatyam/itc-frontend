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
import { FcBusinessContact, FcBusinessman } from "react-icons/fc";
import { FiShield } from "react-icons/fi";
import { GiStarFlag } from "react-icons/gi";
import { GrCapacity } from "react-icons/gr";
import { IoBusinessOutline, IoResize } from "react-icons/io5";
import { MdBusinessCenter, MdGroupWork, MdMarkChatRead } from "react-icons/md";
import { PiAvocadoFill, PiNumberCircleFiveBold } from "react-icons/pi";
import { SiEducative, SiExpertsexchange } from "react-icons/si";
import { TbPdf } from "react-icons/tb";
import { TiBusinessCard, TiMessageTyping } from "react-icons/ti";
import { Button } from "./ui";
import { RiAiGenerate } from "react-icons/ri";
import { FaJediOrder } from "react-icons/fa6";
import { backendUrl } from "../helpers";

const CustomerDashboard = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const isUserLogged = localStorage.getItem("cutomerLogged");

    if (isUserLogged) {
      fetchData(isUserLogged);
    } else {
      window.location.href = "/";
    }
  }, []);
 
  const fetchData = async (isUserLogged) => {
    try {
      const url = `${backendUrl}/api/lead`;

      const res = await axios.post(url, {
        mobile: isUserLogged,
      });
      if (res.status === 200) {
        setUserDetails(res.data);
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
    const isUserLogged = localStorage.getItem("cutomerLogged");
    if (isUserLogged) {
      window.open(
        `${backendUrl}/api/approval-letter?mobile=${isUserLogged}`,
        "_blank",
      );
    }
  };
  const handleViewAgreementLetter = (agreementLetterName) => {
    const isUserLogged = localStorage.getItem("cutomerLogged");
    if (isUserLogged) {
      window.open(
        `${backendUrl}/api/agreement-letter?name=${agreementLetterName}`,
        "_blank",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-8">
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
          <span className="hidden sm:block"> Customer Dashboard</span>
        </h1>
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

        {userDetails ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {!userDetails.image ? (
              <div className="relative">
                <img
                  className="mx-auto h-[200px] w-[200px] rounded-full"
                  src={
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
                  {userDetails.area}, {userDetails.district}
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

export default CustomerDashboard;
