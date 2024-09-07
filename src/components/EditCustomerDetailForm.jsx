import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  backendUrl,
  validateGmail,
  validateIndianMobileNumber,
} from "../helpers";
import InputLabelTab from "./ui/InputLabelTab";
import InputCheckBoxYesOrNo from "./ui/InputCheckBoxYesOrNo";
import InputSelect from "./ui/InputSelect";

function EditCustomerDetailForm({
  fetchLead,
  isExcutiveMode = false,
  id,
  isAdmin,
  isFormOpen,
  setIsFormOpen,
}) {
  if (!id) return null;
  const [formData, setFormData] = useState({
    image: null,
    nameTitle: "",
    name: "",
    area: "",
    email: "",
    postOffice: "",
    mobile: "",
    marriageStatus: "",
    address: "",
    businessName: "",
    businessAddress: "",
    gst: "",
    fssai: "",
    businessType: "",
    experienceInBusiness: "",
    currentYearTurnover: "",
    pincode: "",

    "available_investment_(select_one)": "",
    "preferred_franchisee_segment_(select_one)": "",
    state: "",
    disctict: "",
    "preferred_business_type_(select_one)": "",
    noOfEmploy: "",
    PriviousExperienceInFranchisee: "",
    researchedOtherFranchisee: "",
    estimatedInve4stmentCapacity: "",
    preferredLocationAvailable: "",
    haveAnyBusinessPlane: "",
    projectedTimelineForOpeningFranchisee: "",
    experienceInMarketing: "",
    experienceInManagingStore: "",
    gender: "",
    qualification: "",
  });

  const [allPostOffices, setAllPostOffices] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/leadById/${id}`);

      // Check if the response is okay
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);

      setFormData((prev) => ({
        ...prev,
        ...data, // Assuming 'data' is an object with key-value pairs to be merged with 'formData'
      }));
    } catch (error) {
      console.error("Failed to fetch data:", error); // Log the error to console
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    if (name === "pincode") {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${value}`,
      );
      const data = await response.json();
      if (data[0].Status === "Success") {
        setAllPostOffices(data[0].PostOffice);

        setFormData({
          ...formData,
          pincode: value,
          disctict: data[0].PostOffice[0].District,
          state: data[0].PostOffice[0].Circle,
        });
      } else {
        setFormData({
          ...formData,
          pincode: value,
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    if (formData.pincode != "") fetchPostOffice();
  }, [id]);

  const fetchPostOffice = async () => {
    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${formData.pincode}`,
      );
      const data = await response.json();
      if (data[0].Status === "Success") {
        setAllPostOffices(data[0].PostOffice);
      }
    } catch (error) {}
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/api/editSave/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message, {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setIsFormOpen(false);
        if (isExcutiveMode) fetchLead(localStorage.getItem("excutiveLogged"));
        if (isAdmin) fetchLead( );
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
            Edit Franchisee
            <button
              onClick={() => setIsFormOpen(false)}
              className="hover: absolute right-0 text-black"
            >
              X
            </button>
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-200"
                htmlFor="profile-image-input"
              >
                Profile Image
              </label>

              <label
                htmlFor="profile-image-input"
                style={{ cursor: "pointer" }}
              >
                {formData.image ? (
                  <img
                    src={URL.createObjectURL(formData.image)}
                    alt="Selected"
                    style={{ maxWidth: "100%", height: "160px" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      backgroundColor: "#ccc",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#666",
                    }}
                  >
                    Click to select an image
                  </div>
                )}
              </label>
              <input
                type="file"
                id="profile-image-input"
                accept="image/*"
                style={{ display: "none" }} // Hide the input
                onChange={handleImageChange}
              />
            </div> */}
            <InputSelect
              name={"nameTitle"}
              options={["Mr", "Mrs", "Miss"]}
              label={"Selct a Title"}
              placeholder={"Enter your name"}
              value={formData.nameTitle}
              handleChange={handleChange}
            />
            <InputLabelTab
              name={"name"}
              label={"Name"}
              placeholder={"Enter your name"}
              value={formData.name}
              handleChange={handleChange}
            />
            <InputLabelTab
              name={"email"}
              label={"Email"}
              placeholder={"Enter your email"}
              value={formData.email}
              handleChange={handleChange}
            />
            <InputLabelTab
              name={"mobile"}
              readOnly={true}
              label={"Mobile"}
              placeholder={"Enter your mobile number"}
              value={formData.mobile}
              handleChange={handleChange}
            />
            <InputSelect
              name={"marriageStatus"}
              options={["Married", "Unmarried", "Divorced", "Widowed"]}
              label={"Selct a Maariage State"}
              placeholder={"Enter your name"}
              value={formData.marriageStatus}
              handleChange={handleChange}
            />
            <InputSelect
              name={"gender"}
              options={["male", "female", "Other"]}
              label={"Selct a gender"}
              placeholder={"Enter your name"}
              value={formData.gender}
              handleChange={handleChange}
            />
            <InputSelect
              name={"qualification"}
              options={[
                "Under Graduate",
                "High School",
                "Intermediate",
                "Bachelor's",
                "Master's",
                "Graduate",
                "Post Graduate",
                "Doctorate",
              ]}
              label={"Selct a qualification"}
              placeholder={"Enter your name"}
              value={formData.qualification}
              handleChange={handleChange}
            />
            <InputLabelTab
              name={"pincode"}
              label={"Pin Code"}
              placeholder={"Enter your Pinocde"}
              value={formData.pincode}
              handleChange={handleChange}
            />
            {allPostOffices?.length > 0 && (
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
                   
                >
                  <option value="">Select a post office</option>
                  {allPostOffices.map((office) => (
                    <option key={office.Name} value={office.Name}>
                      {office.Name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <InputLabelTab
              name={"disctict"}
              label={"Distict"}
              placeholder={"Enter your District"}
              value={formData.disctict}
              handleChange={handleChange}
            />
            <InputLabelTab
              name={"state"}
              label={"State"}
              placeholder={"Enter your State"}
              value={formData.state}
              handleChange={handleChange}
            />
            <InputLabelTab
              name={"address"}
              label={"Address"}
              placeholder={"Enter your Address"}
              value={formData.address}
              handleChange={handleChange}
            />
            <InputSelect
              name={"area"}
              options={["Rural ग्रामीण ", "Urban शहरी"]}
              label={"Selct a Current Area Type"}
              placeholder={"Enter your Area"}
              value={formData.area}
              handleChange={handleChange}
            />
            <InputLabelTab
              name={"businessName"}
              label={"Business Name"}
              placeholder={"Enter your Business Name "}
              value={formData.businessName}
              handleChange={handleChange}
            />
            <InputLabelTab
              name={"businessAddress"}
              label={"Business Address"}
              placeholder={"Enter your Business Address "}
              value={formData.businessAddress}
              handleChange={handleChange}
            />
            <InputCheckBoxYesOrNo
              name={"gst"}
              label={"Do You Have GST Number"}
              placeholder={"Enter your GST Number"}
              value={formData.gst}
              handleChange={handleChange}
            />
            <InputCheckBoxYesOrNo
              name={"fssai"}
              label={"Do You Have FSSAI Certificate"}
              placeholder={"Enter your FSSAI Number"}
              value={formData.fssai}
              handleChange={handleChange}
            />
            <InputSelect
              name={"businessType"}
              options={[
                "Individual",
                "Compony",
                "propritership",
                "Partnership",
              ]}
              label={"Selct a business Type"}
              placeholder={"Enter your name"}
              value={formData.businessType}
              handleChange={handleChange}
            />
            <InputSelect
              name={"experienceInBusiness"}
              options={["0-5 Year", "5-10 Year", "Above 10 Years"]}
              label={"Selct a business Experience Years"}
              placeholder={"Enter your name"}
              value={formData.experienceInBusiness}
              handleChange={handleChange}
            />
            <InputSelect
              name={"currentYearTurnover"}
              options={["Below 50 lacs", "50lacs - 1Cr", "Above 1Cr"]}
              label={"Selct a Current Year Turnover"}
              placeholder={"Enter your name"}
              value={formData.currentYearTurnover}
              handleChange={handleChange}
            />
            <InputSelect
              name={"noOfEmploy"}
              options={["0-25", "26-49", "Above 49"]}
              label={"Selct Your No Of Employees"}
              placeholder={"Enter your name"}
              value={formData.noOfEmploy}
              handleChange={handleChange}
            />
            <InputCheckBoxYesOrNo
              name={"PriviousExperienceInFranchisee"}
              label={"Do you Hava Experience In Franchise "}
              value={formData.PriviousExperienceInFranchisee}
              handleChange={handleChange}
            />
            <InputCheckBoxYesOrNo
              name={"researchedOtherFranchisee"}
              label={"Have You Researched  Another Franchise "}
              value={formData.researchedOtherFranchisee}
              handleChange={handleChange}
            />
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
            <InputSelect
              name={"preferred_business_type_(select_one)"}
              options={["distributorship", "dealership", "franchisee"]}
              label={"Preferred Business Type"}
              placeholder={"Enter your name"}
              value={formData["preferred_business_type_(select_one)"]}
              handleChange={handleChange}
            />
            <InputCheckBoxYesOrNo
              name={"preferredLocationAvailable"}
              label={"Do You Have Preferred Location Available ? "}
              value={formData.preferredLocationAvailable}
              handleChange={handleChange}
            />
            <InputCheckBoxYesOrNo
              name={"haveAnyBusinessPlane"}
              label={"Do You Have Business Plane Available ? "}
              value={formData.haveAnyBusinessPlane}
              handleChange={handleChange}
            />{" "}
            <InputSelect
              name={"projectedTimelineForOpeningFranchisee"}
              options={[
                "Immidiate",
                "1-3 Months",
                "3-6 Months",
                "Above 6 months",
              ]}
              label={"Selct Your Projected Timeline For Opening Franchise?"}
              placeholder={"Enter your name"}
              value={formData.projectedTimelineForOpeningFranchisee}
              handleChange={handleChange}
            />
            <InputCheckBoxYesOrNo
              name={"experienceInMarketing"}
              label={"Do You Have Experience in marketing ?"}
              value={formData.experienceInMarketing}
              handleChange={handleChange}
            />{" "}
            <InputCheckBoxYesOrNo
              name={"experienceInManagingStore"}
              label={"Do You Have Experience in Managing a Store ?"}
              value={formData.experienceInManagingStore}
              handleChange={handleChange}
            />{" "}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    )
  );
}
export default EditCustomerDetailForm;
