import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "tailwindcss/tailwind.css";
import { backendUrl, formatDate } from "../helpers";
import { toast } from "react-toastify";
import axios from "axios";

Modal.setAppElement("#root"); // Important for accessibility

const ScheduleMeetingForm = ({
  fetchLead=()=>{},
  isAdmin,
  isExcutiveMode = false,
  isOpen = false,
  setIsOpen,
  id,
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [shadualedMesage, setShadualedMesage] = useState("");

  useEffect(() => {
    if (id) getMessage();
  }, [id]);

  const getMessage = async () => {
    await axios
      .get(`${backendUrl}/api/lead/get-shadualeTime/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setShadualedMesage(res.data.message);
        }
      });
  };
  // Function to generate time options from 10:00 AM to 6:00 PM with 10-minute intervals
  const generateTimeOptions = () => {
    const options = [];
    const startTime = new Date();
    startTime.setHours(10, 0, 0, 0); // 10:00 AM

    const endTime = new Date();
    endTime.setHours(18, 0, 0, 0); // 6:00 PM

    while (startTime <= endTime) {
      options.push(
        new Date(startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
      startTime.setMinutes(startTime.getMinutes() + 10);
    }

    return options;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${backendUrl}/api/lead/update-shadualeTime`,
        {
          excutiveId: localStorage.getItem("excutiveLogged"),
          id,
          selectedDate: formatDate(selectedDate).date,
          shaduleDateCount: formatDate(selectedDate).count,
          shadualedMesage,
        },
      );

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-left",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        if (isExcutiveMode) fetchLead(localStorage.getItem("excutiveLogged"));
        if (isAdmin) fetchLead( );
        closeModal();
        
      } else {
        toast.error(response.data.message, {
          position: "top-left",
          autoClose: 2500,
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
      toast.error(error.message, {
        position: "top-left",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    isOpen && (
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="relative mx-auto mt-20 w-full max-w-lg rounded-lg bg-white p-8 shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="mb-6 text-2xl font-bold text-gray-800">
          Schedule a Lead
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block font-medium text-gray-600">
              Select Date:
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              dateFormat="dd MMMM yyyy"
              placeholderText="Select a date"
              className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-2 block font-medium text-gray-600">
              Message :
            </label>
            <textarea
              type="text"
              className="w-full rounded border p-3"
              name=""
              id=""
              value={shadualedMesage}
              onChange={(e) => setShadualedMesage(e.target.value)}
            />
            {/* <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a time
              </option>
              {generateTimeOptions().map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
            </select> */}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            >
              Schedule
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="ml-4 rounded-lg bg-gray-600 px-6 py-3 font-semibold text-white shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75"
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    )
  );
};

export default ScheduleMeetingForm;
