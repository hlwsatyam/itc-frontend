import React from "react";
import { Button } from "./ui";
import { FaWhatsapp } from "react-icons/fa";

export default function About({isFormOpen, setIsFormOpen}) {
  return (
    <div id="about" className="mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-5 px-3 pt-28 md:flex-row md:pb-[145px] lg:gap-20 lg:px-0 lg:pt-[220px]">
      <div className="max-h-[495px] max-w-[586px]">
        <img
          className="custom-animate size-[85%] object-contain md:size-full"
          src="https://www.goodreturns.in/img/2024/07/itc12002-1721870894.jpg"
          alt="About"
        />
      </div>

      <div className="flex flex-col items-start gap-4">
        <h5 className="font-poppins text-[22px] font-medium tracking-[0.44px] text-secondary">
          About me
        </h5>
        <h1 className="max-w-[485px] font-poppins text-[32px] font-semibold leading-normal text-[#031432]">
        Get ITC Limited Product Distributorship:
        </h1>
        <p className="mb-4 max-w-[485px] text-para">
        ITC Limited, an Indian multinational company headquartered in Kolkata, West Bengal, was established in 1910 as the "Imperial Tobacco Company of India Limited." In 1970, the company was rebranded as "India Tobacco Company Limited," and later in 1974, it became known as "ITC Ltd." Listed on both BSE and NSE, ITC Limited is renowned for its diverse product portfolio, operating in various segments such as Foods, Personal Care Products, Stationery, Safety Matches, Agarbattis, Hotels, Paperboard, Packaging, and Printing. With a vast network of distributors across India, ITC Limited continues to expand, offering lucrative distributorship opportunities in multiple segments, making it an ideal business venture for aspiring entrepreneurs.
        </p>
        <Button  onClick={() => setIsFormOpen(!isFormOpen)}   title="become our Franchisee" />
      </div>
    </div>
  );
}
