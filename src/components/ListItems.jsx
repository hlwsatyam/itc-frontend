import React from "react";
import { FaRegClock } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { PiPlusCircleBold } from "react-icons/pi";

export default function ListItems() {
  return (
    <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-center gap-4 px-3 md:gap-7">
      <Item title="257 Awards Win"  description="The company operates across various segments, including Foods, Personal Care Products, Stationery, and Safety Matches."   />
      <Item title="2500+ Happy Clients" description="ITC Ltd is listed on both BSE and NSE and is renowned for its diverse product portfolio." Icon={FiCheckCircle} />
      <Item title="287 Our Worker" description="ITC Limited continues to thrive in multiple business domains" Icon={PiPlusCircleBold} />
    </div>
  );
}

function Item({
  Icon = FaRegClock,
  title = "",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
}) {
  return (
    <div className="flex w-max translate-y-[50%] items-center gap-3 rounded-[12px] bg-gradient-to-t from-[#65A8FB] to-[#1678F2] px-[18px] py-2 text-white md:max-w-[295px]">
      <div>
        <Icon className="size-[38px]" />
      </div>
      <div>
        <h3 className="font-poppins text-lg font-medium">{title}</h3>
        <p className="font-sora text-xs">{description}</p>
      </div>
    </div>
  );
}
