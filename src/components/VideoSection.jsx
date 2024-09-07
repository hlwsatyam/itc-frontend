import { BiPhotoAlbum } from "react-icons/bi";
import { FaRegClock } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { IoPlayOutline } from "react-icons/io5";
import { PiAvocadoLight, PiPlusCircleBold } from "react-icons/pi";
import React from "react";
import ReactPlayer from "react-player";
import ImgCarousel from "./ImgCarousel";
import vid from "../Img/e.webm";
export default function VideoSection() {
  return (
    <div
      id="contact"
      className="mx-auto max-w-screen-xl p-3 pb-28 md:pb-[164px]"
    >
      <ImgCarousel />
      <p className="mb-3 text-center font-poppins text-[22px] font-medium text-secondary">
        ITC Limited Product Distributorship investment
      </p>

      {/* <div className="relative mt-4 flex w-full items-center justify-center">
        <img className="w-full" src="https://knnindia.co.in/uploads/newsfiles/ITC-4-9-2023.jpg" alt="Video" />
        <button className="absolute flex size-[60px] items-center justify-center rounded-full bg-primary-start md:size-[100px]">
          <IoPlayOutline className="ml-2 size-10 text-white md:size-16" />
        </button>
      </div> */}

      <div>
        <h4 className="mb-3 mt-4 text-center font-poppins text-[32px] font-semibold text-[#031432]">
          To apply for ITC Limited Distributorship
        </h4>
        <p className="mx-auto max-w-[843px] text-center text-para">
          The space must be strategically located, with separate areas for
          office operations and storage. Proper planning of space allocation is
          crucial for efficient business operations. Required Documents for ITC
          Limited Distributorship: To apply for ITC Limited Distributorship, you
          will need to submit the following documents:
        </p>
      </div>

      <div className="mt-[60px] flex flex-col items-center justify-center gap-6 md:flex-row">
        <Item title="ID Proof: Aadhaar Card, " />
        <Item title="Address Proof: Ration Card, " Icon={PiAvocadoLight} />
        <Item title="Bank Account with Passbook" Icon={PiPlusCircleBold} />
        <Item title="Photograph, Email ID, Phone Number" Icon={BiPhotoAlbum} />
      </div>
      <div className=" my-8"  >
        <VideoTab  />
      </div>
    </div>
  );
}

const VideoTab = () => {
  return <ReactPlayer  width={"100%"} height={"400px"}  url={vid} light={"https://etimg.etb2bimg.com/photo/103337597.cms"} playing controls />;
};

function Item({ Icon = FaRegClock, title = "" }) {
  return (
    <div className="flex w-full items-center gap-3 rounded-[12px] bg-gradient-to-t from-[#65A8FB] to-[#1678F2] px-7 py-4 text-white transition hover:-rotate-3 md:max-w-[320px]">
      <div>
        <Icon className="size-[38px]" />
      </div>

      <h3 className="font-poppins text-lg font-medium">{title}</h3>
    </div>
  );
}
