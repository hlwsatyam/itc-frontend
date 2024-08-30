import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ListItems from "./components/ListItems";
import About from "./components/About";
import Services from "./components/Services";
import ServiceCards from "./components/ServiceCards";
import BookAnAppointment from "./components/BookAnAppointment";
import VideoSection from "./components/VideoSection";
import Footer from "./components/Footer";
import PopupForm from "./components/PopupForm.jsx";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { CheckStatus } from "./components/CheckStatus.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import CustomerDashboard from "./components/CustomerDashboard.jsx";
import AddAccount from "./components/AddAccount.jsx";
function App() {
  const [isFormOpen, setIsFormOpen] = useState(true);

  const location = useLocation();

  const hideHeaderAndFooter =
    location.pathname === "/check-status" ||
    location.pathname === "/admin-dashboard" ||
    location.pathname === "/customer-dashboard";
  return (
    <>
      {!hideHeaderAndFooter && (
        <Navbar isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              isFormOpen={isFormOpen}
              setIsFormOpen={setIsFormOpen}
            />
          }
        />
        <Route path="/check-status" element={<CheckStatus />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/addaccount" element={<AddAccount />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      </Routes>
      {!hideHeaderAndFooter && <Footer />}
    </>
  );
}

const LandingPage = ({ isFormOpen, setIsFormOpen }) => {
  return (
    <>
      <div className="bg-[#F2F7FF]">
        <Hero isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
        <ListItems />
      </div>
      <About isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      <PopupForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      <div className="bg-[#F2F7FF]">
        <Services isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
        <ServiceCards isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
      </div>
      <BookAnAppointment
        isFormOpen={isFormOpen}
        setIsFormOpen={setIsFormOpen}
      />
      <VideoSection />
    </>
  );
};

export default App;
