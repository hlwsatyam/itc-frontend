import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";

import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../../helpers";
import Button from "./Button";
import { TfiEmail } from "react-icons/tfi";

Modal.setAppElement("#root"); // Important for accessibility

const ScriptForm = ({ userDetails, isOpen = false, setIsOpen, id }) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const [openSection, setOpenSection] = useState(null);
  const [postOffice, setPostOffice] = useState(null);
  const [selectLocation, setSelectLocation] = useState();
  const [postOffices, setPostOffices] = useState([]);
  const [selectedPostOffices, setSelectedPostOffices] = useState([]);

  const handlePincodeChange = async (e) => {
    const pincode = e.target.value;

    if (pincode.length === 6) {
      try {
        const response = await fetch(
          `https://api.postalpincode.in/pincode/${pincode}`,
        );
        const data = await response.json();
        if (data[0].Status === "Success") {
          setPostOffices(data[0].PostOffice);
          console.log(data[0])
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

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    if (id) getMessage();
  }, [id]);

  const getMessage = async () => {
    await axios
      .get(`${backendUrl}/api/lead/get-shadualeTime/${id}`)
      .then((res) => {
        if (res.status === 200) {
        }
      });
  };

  useEffect(() => {
    setEmail(userDetails?.email);
  }, [userDetails]);

  const [email, setEmail] = useState("email");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const shareEmailHandler = () => {
    try {
      if (email) {
        axios
          .post(`${backendUrl}/api/lead/share-postOffice-mail/${id}`, {
            email: email,
            selectedPostOffices,
            name: userDetails?.name,
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success(res?.data?.message, {
                position: "top-left",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            } else {
              toast.error(res?.data?.message, {
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
          });
      }
    } catch (error) {}
  };
  return (
    isOpen && (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="relative m-12 h-screen w-[100%] rounded-lg bg-white p-1 shadow-lg"
        overlayClassName="fixed overflow-scroll    no-scrollbar inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Script :{" "}
          <button onClick={() => setIsOpen(false)} className="cursor-pointer">
            ❌
          </button>
        </h2>

        <div className="no-scrollbar h-screen overflow-scroll bg-gray-100 px-4 py-8 text-gray-800">
          <h1 className="mb-8 text-center text-4xl font-bold text-indigo-600">
            ITC Franchisee Script
          </h1>

          <div className="space-y-6">
            {/* Section 1: Introduction */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <button
                onClick={() => toggleSection(1)}
                className="flex w-full justify-between text-xl font-semibold"
              >
                1. Introduction
                <span>{openSection === 1 ? "-" : "+"}</span>
              </button>
              {openSection === 1 && (
                <p className="mt-4 text-gray-700">
                  Hello {userDetails?.name}, mai ITC Limited se Saurav Goel bol
                  raha hoon. Aap kaise hain aaj? <br />
                  Main aapko ITC Limited ke franchisee/distributorship avsar ke
                  baare mein jankari dene ke liye call kar raha hoon. Kya aapke
                  paas kuch minute hain is baare mein baat karne ke liye?
                </p>
              )}
            </div>

            {/* Section 2: About ITC Limited */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <button
                onClick={() => toggleSection(2)}
                className="flex w-full justify-between text-xl font-semibold"
              >
                2. About ITC Limited
                <span>{openSection === 2 ? "-" : "+"}</span>
              </button>
              {openSection === 2 && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
                  <li>
                    <strong>Foods:</strong> Aashirvaad, Sunfeast, Bingo!,
                    Kitchens of India, Sunfeast Yippee, B Natural, aur bhi kai
                    prasiddh brands.
                  </li>
                  <li>
                    <strong>Personal Care:</strong> EDW Essenza, Dermafique,
                    Fiama, Vivel, Engage, Savlon.
                  </li>
                  <li>
                    <strong>Education:</strong> Classmate, Paperkraft.
                  </li>
                  <li>
                    <strong>Matches & Agarbatti:</strong> AIM, Mangaldeep,
                    Dazzle.
                  </li>
                  <li>
                    <strong>Cigars:</strong> Insignia, Gold Flake, Wills Navy
                    Cut.
                  </li>
                </ul>
              )}
            </div>

            {/* Section 3: Benefits of Becoming a Franchisee */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <button
                onClick={() => toggleSection(3)}
                className="flex w-full justify-between text-xl font-semibold"
              >
                3. Benefits of Becoming a Franchisee
                <span>{openSection === 3 ? "-" : "+"}</span>
              </button>
              {openSection === 3 && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
                  <li>
                    Brand Recognition: ITC ek prasiddh brand hai, jo aapke
                    vyapar ko bazaar mein acchi pehchaan deta hai.
                  </li>
                  <li>
                    Support and Training: Ham aapko comprehensive training aur
                    ongoing support denge taki aap apna franchise successfully
                    chala sakein.
                  </li>
                  <li>
                    Marketing and Promotional Support: Hamari marketing
                    strategies aur promotional activities ka labh uthakar aap
                    apne vyapar ko aage badha sakte hain.
                  </li>
                  <li>
                    Operational Guidance: Ham aapko operations, inventory
                    management, aur dusre vyaparik pehluon par guidance denge.
                  </li>
                  <li>
                    Profit Margin: Har product par profit margin lagbhag 5% se
                    10% tak hota hai.
                  </li>
                  <li>
                    Outlet Development: ITC aapke outlet ko develop karega aur
                    zaroori amenities jaise CCTV cameras, interior aur exterior
                    furnishings, aur trained staff pradan karega.
                  </li>
                </ul>
              )}
            </div>

            {/* Section 4: Investment and Documents */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <button
                onClick={() => toggleSection(4)}
                className="flex w-full justify-between text-xl font-semibold"
              >
                4. Investment and Documents
                <span>{openSection === 4 ? "-" : "+"}</span>
              </button>
              {openSection === 4 && (
                <div className="mt-4 text-gray-700">
                  <p>
                    <strong>Franchise Fee:</strong> ₹42,500
                  </p>
                  <p>
                    <strong>Agreement Fee:</strong> ₹1,67,423
                  </p>
                  <p>
                    <strong>Security Deposit:</strong> ₹5,00,000 (ye aapke pehle
                    purchase order ki billing ke sath adjust ho jayega)
                  </p>
                  <p>
                    <strong>90 Days Credit Limit:</strong> ITC 90 dinon ki
                    credit limit pradan karta hai bina kisi byaj ke.
                  </p>
                  <p>
                    <strong>Required Documents:</strong>
                  </p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Aadhaar Card (front and back)</li>
                    <li>PAN Card</li>
                    <li>Bank Statement (aakhri 6 mahine)</li>
                    <li>Recent Self-Photograph</li>
                    <li>Property-related Documents</li>
                  </ul>
                  <p>
                    <strong>Optional Documents:</strong>
                  </p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Last 2 years' ITR</li>
                    <li>FSSAI License</li>
                    <li>GST Certificate</li>
                  </ul>
                  <p>
                    <strong>Space required:</strong>
                  </p>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Office: 150 Square Feet se 200 Square Feet</li>
                    <li>Godown: 1500 Square Feet se 2000 Square Feet</li>
                    <li>Other Space: 200 Square Feet se 400 Square Feet</li>
                  </ul>
                </div>
              )}
            </div>
            {/* Section 6: Sales Data and Profit Margin */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <button
                onClick={() => toggleSection(6)}
                className="flex w-full justify-between text-xl font-semibold"
              >
                6. Sales Data and Profit Margin
                <span>{openSection === 6 ? "-" : "+"}</span>
              </button>
              {openSection === 6 && (
                <div className="mt-4 text-gray-700">
                  <input
                    type="text"
                    onChange={handlePincodeChange}
                    className="my-2 rounded border bg-yellow-500 p-2 text-black"
                    placeholder="Enter Pincode"
                  />
                  <input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    className="my-2 rounded border bg-yellow-500 p-2 text-black"
                    placeholder="Enter email"
                  />
                  {selectedPostOffices?.length > 0 && (
                    <Button
                      Icon={TfiEmail}
                      onClick={shareEmailHandler}
                      title="Share Email"
                    />
                  )}
                  {postOffices.length > 0 && (
                    <div className="flex flex-wrap gap-4 bg-green-500/40 p-1">
                      {postOffices.map((office) => (
                        <span
                          onClick={() => {
                            if (selectedPostOffices.includes(office)) {
                              setSelectedPostOffices(
                                selectedPostOffices.filter(
                                  (val) => val !== office,
                                ),
                              );
                            } else {
                              setSelectedPostOffices([
                                ...selectedPostOffices,
                                office,
                              ]);
                            }
                          }}
                          className={`rounded ${selectedPostOffices.includes(office) ? "bg-green-700 text-white" : "bg-white"} text-blackg-white p-2`}
                          key={office.Name}
                          value={office.Name}
                        >
                          {office.Name}
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    className={`rounded border ${selectLocation === "rural" ? "bg-green-500" : "bg-yellow-500"} p-2 text-black`}
                    onClick={() => setSelectLocation("rural")}
                  >
                    Rural Content
                  </button>
                  <button
                    className={`rounded border ${selectLocation === "urban" ? "bg-green-500" : "bg-yellow-500"} p-2 text-black`}
                    onClick={() => setSelectLocation("urban")}
                  >
                    Urban Content
                  </button>

                  {selectLocation === "rural" && (
                    <div>
                      <p>
                        <strong>
                          For Rural Locations: [ {userDetails?.pincode} ]{" "}
                        </strong>
                      </p>
                      <p>
                        "Aapke pin code ka last month ka sales online mode mai
                        ₹20 lakh aur offline sale ₹43 lakh tha. Online sale ka
                        matlab hai Amazon, Flipkart, Jio Mart, ITC store, aur
                        other e-commerce portals ke madhyam se order prapt kiya
                        gaya. Offline sale ka matlab hai store sales aapke pin
                        code ya location par."
                      </p>
                    </div>
                  )}

                  {selectLocation === "urban" && (
                    <div>
                      <p>
                        <strong>
                          For Urban Locations: [ {userDetails?.pincode} ]
                        </strong>
                      </p>

                      <p>
                        "Aapke pin code ka last month ka sales online mode mai
                        ₹45 lakh aur offline sale ₹92 lakh tha. Online sale ka
                        matlab hai Amazon, Flipkart, Jio Mart, ITC store, aur
                        other e-commerce portals ke madhyam se order prapt kiya
                        gaya. Offline sale ka matlab hai store sales aapke pin
                        code ya location par." "Yadi mai profit ki baat karu to
                        profit margin ITC ke sath variable hota hai, jo lagbhag
                        5-10% ke aas-paas hai. Agar aapka total sale value ₹50
                        lakh hai, to average profit lagbhag ₹3.5 lakh per month
                        hota hai."
                      </p>
                    </div>
                  )}
                  <p>
                    Yadi mai profit ki baat karu to profit margin ITC ke sath
                    variable hota hai, jo lagbhag 5-10% ke aas-paas hai. Agar
                    aapka total sale value ₹50 lakh hai, to average profit
                    lagbhag ₹3.5 lakh per month hota hai.
                  </p>
                </div>
              )}
            </div>
            {/* Section 5: Application Process */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <button
                onClick={() => toggleSection(5)}
                className="flex w-full justify-between text-xl font-semibold"
              >
                5. Application Process
                <span>{openSection === 5 ? "-" : "+"}</span>
              </button>
              {openSection === 5 && (
                <p className="mt-4 text-gray-700">
                  Kripya apna email ID confirm karein, taki main aapko ITC
                  franchisee application form, product price list, aur product
                  brochure bhej sakun. <br />
                  Application form ko print karein aur ise black ya blue pen se
                  bharein. Completed application form aur sabhi zaroori
                  documents mujhe email ke madhyam se bhej dein. Hamari ITC
                  franchisee team aapke application ko review karegi aur 24 se
                  48 ghanton mai contact karegi.
                </p>
              )}
            </div>

            {/* Section 7: Common Lead Questions */}
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <button
                onClick={() => toggleSection(7)}
                className="flex w-full justify-between text-xl font-semibold"
              >
                7. Common Lead Questions
                <span>{openSection === 7 ? "-" : "+"}</span>
              </button>
              {openSection === 7 && (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-700">
                  <li>
                    <strong>Q1:</strong> Where is your office located? <br />{" "}
                    <strong>A1:</strong> Our office is located at Virginia
                    House, 37, J.L. Nehru Road, Kolkata - 700071, India.
                  </li>
                  <li>
                    <strong>Q2:</strong> Mai kaise vishwas karu ki aap ITC
                    Limited se baat kar rahe hain? <br /> <strong>A2:</strong>{" "}
                    Sir, I will send you an email through the ITC portal from
                    our official email ID: contactus@itcportals.com.
                  </li>
                  <li>
                    <strong>Q3:</strong> What is your position? <br />{" "}
                    <strong>A3:</strong> I am Saurav Goel from the ITC
                    Franchisee Development Team, working as the Marketing Head.
                  </li>
                  <li>
                    <strong>Q4:</strong> Kya mai office visit kar sakta hu?{" "}
                    <br /> <strong>A4:</strong> Sure sir, I can arrange an
                    appointment with our Sales Head.
                  </li>
                  <li>
                    <strong>Q5:</strong> Kya aap mujhe najdiki dealer ya
                    distributor ka aapka details share kar sakte hain? <br />{" "}
                    <strong>A5:</strong> Sorry sir, for data protection and
                    security reasons, I can't share these details.
                  </li>
                  <li>
                    <strong>Q6:</strong> What is your customer care number?{" "}
                    <br /> <strong>A6:</strong> Our customer care number is 033
                    2288 9371.
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </Modal>
    )
  );
};

export default ScriptForm;
