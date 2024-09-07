import React from "react";

import { FaUserEdit } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import Button from "./Button";

function UserHeader({ isAccountBTNshown = true }) {
  const userHandler = () => {
    window.location.href = "/customer-dashboard/users/add-user";
  };

  const logoutHandler = () => {
    localStorage.removeItem("adminLogged");
    window.location.href = "/";
  };

  return (
    <div>
      <h1 className="relative mb-8 flex items-center justify-between px-2 py-4 text-[17px] font-bold text-gray-800">
        <h1 className="font-semibold text-gray-800">
          <a href="/">
            <img
              className="mr-2 h-8 w-8 rounded-full object-cover"
              src="https://www.itcdistributorships.in/images/logo.png"
              alt="Logo"
            />
          </a>
        </h1>
        {isAccountBTNshown && (
          <Button
            className="!px-2 !py-1 text-[13px]"
            onClick={userHandler}
            title="Add Excutive"
            Icon={FaUserEdit}
          />
        )}
        <Button
          onClick={logoutHandler}
          title="Logout"
          className="!px-2 !py-1 text-[13px]"
          Icon={BiLogOut}
        />{" "}
      </h1>
    </div>
  );
}

export default UserHeader;
