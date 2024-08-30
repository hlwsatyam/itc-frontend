import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

export default function BookAnAppointment({isFormOpen, setIsFormOpen}) {
  return (
    <div className="mx-auto mb-[130px] max-w-screen-xl px-3 pt-[80px] md:mb-[213px] md:pt-[148px]">
      <p className="mb-3 text-center font-poppins text-[22px] font-medium text-secondary">
      become our Franchisee
      </p>
      <div className="flex h-auto flex-col items-center justify-center rounded-[32px] bg-gradient-to-tl from-primary-start to-primary-end p-8 text-white md:h-[315px] md:p-4">
        <h3 className="font-poppins text-2xl font-semibold md:text-[32px]">
        Why is sustainability important?
        </h3>
        <p className="mb-6 mt-[11px] max-w-[676px] md:text-center">
        For over a century, the world has witnessed remarkable material progress. However, this progress has come at a   creating some of the most serious challengesincluding that of poverty,  Compounding these challenges are the threats of global warming and environmental degradation. The model of industrial growth pursued since the Industrial Revolution has paid scant attention to the planet and its resources. threatens the present but also the socio-economic security of future generations as well.

        </p>

        <button  onClick={() => setIsFormOpen(!isFormOpen)}   className="flex items-center gap-2 rounded-full bg-white px-5 py-2 text-lg font-medium text-primary-start shadow-[0px_8px_23px_0px_rgba(65,132,247,0.24)] transition hover:-rotate-3 md:px-7 md:py-4">
          <FaCheck className="h-6 w-6" />
          become our Franchisee
        </button>
      </div>
    </div>
  );
}
