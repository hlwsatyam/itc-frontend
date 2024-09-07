import React, { useEffect, useState } from "react";
import UserHeader from "./components/ui/UserHeader";
import { backendUrl, fetchUser } from "./helpers";
import UserPanel from "./components/ui/UserPanel";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminUser() {
  const [users, setUsers] = useState([]);

  const fetchUser = async (setUser) => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/all-user`);

      if (response.status === 200) {
        setUser(response.data);
      } else {
        toast.error(response.data.message, {
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
  const navigate = useNavigate();
  const deleteHandler = async (id) => {
    try {
      const response = await axios.post(`${backendUrl}/api/users/delete/${id}`);
      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-left",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchUser(setUsers);
  }, [deleteHandler]);

  return (
    <div>
      <UserHeader />
      <div className="flex flex-wrap justify-around gap-4 border-t-2 p-4">
        {users?.map((user, idx) => (
          <div className="min-w-[33%] rounded bg-green-500/20 p-4">
            <p> Name: {user.name} </p>
            <p> UserID: {user.userId} </p>
            <p> Password: {user.password} </p>
            <p> No Of Lead : {user.leadAccessCount} </p>
            <p>Current Assigned Lead: {user?.leads?.length} </p>
            <div className="my-2 rounded-xl bg-red-500/60 p-2 text-white">
              <p>Can Upload Lead: {user?.canLeadUpload ? "Yes" : "No"} </p>
              <p>Can Edit Lead: {user?.permissions.Edit ? "Yes" : "No"} </p>
              <p>
                Can Send Welcome E-Mail:{" "}
                {user?.permissions.Welcome ? "Yes" : "No"}{" "}
              </p>
              <p>
                Can Share Aprooval Letter:{" "}
                {user?.permissions?.Approval ? "Yes" : "No"}{" "}
              </p>
              <p>
                Can Share Agreement Letter to Lead:{" "}
                {user?.permissions?.Agreement ? "Yes" : "No"}{" "}
              </p>
              <p>
                Can Share Purchase Order Letter to Lead:{" "}
                {user?.permissions?.PurchaseOrder ? "Yes" : "No"}{" "}
              </p>
            </div>

            <button
              onClick={() =>
                navigate("/customer-dashboard/users/edit", { state: user._id })
              }
              className="rounded border-none bg-red-500/80 p-1 text-white"
            >
              Action
            </button>
            <button
              onClick={() => deleteHandler(user._id)}
              className="mx-2 rounded border-none bg-red-700 p-1 text-white"
            >
              Delete User
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUser;
