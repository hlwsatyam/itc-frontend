// import React, { useEffect, useState } from "react";
// import InputYesNoApi from "./InputYesNoApi";
// import { updateData } from "../../helpers";

// function UserPanel({ user }) {
//   if (!user) return null;

//   const [userData, setUser] = useState({
//     ...user,
//   });

//   const handleChangeForYesNo = (e) => {
//     const { name, value } = e.target;

//     // Update nested objects correctly
//     const keys = name.split(".");
//     if (keys.length > 1) {
//       setUser((prevUserData) => ({
//         ...prevUserData,
//         [keys[0]]: {
//           ...prevUserData[keys[0]],
//           [keys[1]]: value === "no" ? false : true,
//         },
//       }));
//     } else {
//       setUser({
//         ...userData,
//         [name]: value === "no" ? false : true,
//       });
//     }
//   };

//   useEffect(() => {
//     updateData(userData);
//   }, [userData]);

//   return (
//     <div className="w-full rounded-lg bg-blue-500/40 p-4 shadow-lg sm:w-[30%]">
//       <p className="text-sm"> Name: {userData.name} </p>
//       <p className="text-sm"> Id: {userData.userId} </p>
//       <p className="text-sm"> Password: {userData.password} </p>
//       <p className="text-sm">
//         {" "}
//         Lead Assigned:{" "}
//         <input
//           type="number"
//           name=""
//           className="rounded-full p-2"
//           value={userData.leadAccessCount}
//           id=""
//         />
//       </p>
//       <p className="mt-2 border-t-2 font-semibold text-red-600">Action:</p>
//       <p className="flex items-center gap-x-3">
//         <span>Edit :</span>
//         <InputYesNoApi
//           handleChange={handleChangeForYesNo}
//           name={"permissions.Edit"}
//           value={userData?.permissions?.Edit ? "yes" : "no"}
//         />
//       </p>
//       <p className="flex items-center gap-x-3">
//         <span>Approval :</span>
//         <InputYesNoApi
//           handleChange={handleChangeForYesNo}
//           name={"permissions.Approval"}
//           value={userData?.permissions?.Approval ? "yes" : "no"}
//         />
//       </p>

//       <p className="flex items-center gap-x-3">
//         <span>Block :</span>
//         <InputYesNoApi
//           handleChange={handleChangeForYesNo}
//           name={"blocked"}
//           value={userData?.blocked ? "yes" : "no"}
//         />
//       </p>
//     </div>
//   );
// }

// export default UserPanel;
import React, { useEffect, useState } from "react";
import InputYesNoApi from "./InputYesNoApi";
import { backendUrl, updateData } from "../../helpers";
import { toast } from "react-toastify";
import axios from "axios";

function UserPanel({ user }) {
  if (!user) return null;

  const [userData, setUser] = useState(null);
 

  const handleChangeForYesNo = (e) => {
    const { name, value } = e.target;

    // Update nested objects correctly
    const keys = name.split(".");
    if (keys.length > 1) {
      setUser((prevUserData) => ({
        ...prevUserData,
        [keys[0]]: {
          ...prevUserData[keys[0]],
          [keys[1]]: value === "no" ? false : true,
        },
      }));
    } else {
      setUser({
        ...userData,
        [name]: value === "no" ? false : true,
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/${user._id}`);

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

  useEffect(() => {
    const handler = setTimeout(() => {
      if (updateData) updateData(userData);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [userData]);

  return (
    userData && (
      <div className="w-full rounded-lg bg-blue-500/40 p-4 shadow-lg sm:w-[30%]">
        <p className="text-sm"> Name: {userData.name} </p>
        <p className="text-sm"> Id: {userData.userId} </p>
        <p className="text-sm"> Password: {userData.password} </p>
        <p className="text-sm">
          Lead Assigned:
          <input
            type="number"
            name="leadAccessCount"
            className="rounded-full p-2"
            value={userData.leadAccessCount}
            onChange={(e) =>
              setUser({ ...userData, leadAccessCount: e.target.value })
            }
          />
        </p>
        <p className="mt-2 border-t-2 font-semibold text-red-600">Action:</p>

        <p className="flex items-center gap-x-3">
          <span>Edit :</span>
          <InputYesNoApi
            handleChange={handleChangeForYesNo}
            name={"permissions.Edit"}
            value={userData?.permissions?.Edit ? "yes" : "no"}
          />
        </p>
        <p className="flex items-center gap-x-3">
          <span>Approval :</span>
          <InputYesNoApi
            handleChange={handleChangeForYesNo}
            name={"permissions.Approval"}
            value={userData?.permissions?.Approval ? "yes" : "no"}
          />
        </p>
        <p className="flex items-center gap-x-3">
          <span>Agreement :</span>
          <InputYesNoApi
            handleChange={handleChangeForYesNo}
            name={"permissions.Agreement"}
            value={userData?.permissions?.Agreement ? "yes" : "no"}
          />
        </p>
        <p className="flex items-center gap-x-3">
          <span>Purchase Order :</span>
          <InputYesNoApi
            handleChange={handleChangeForYesNo}
            name={"permissions.PurchaseOrder"}
            value={userData?.permissions?.PurchaseOrder ? "yes" : "no"}
          />
        </p>
        <p className="flex items-center gap-x-3">
          <span>Cancellation :</span>
          <InputYesNoApi
            handleChange={handleChangeForYesNo}
            name={"permissions.Cancellation"}
            value={userData?.permissions?.Cancellation ? "yes" : "no"}
          />
        </p>
        <p className="flex items-center gap-x-3">
          <span>Share Bank Details :</span>
          <InputYesNoApi
            handleChange={handleChangeForYesNo}
            name={"permissions.ShareBankDetails"}
            value={userData?.permissions?.ShareBankDetails ? "yes" : "no"}
          />
        </p>
        <p className="flex items-center gap-x-3">
          <span>Block :</span>
          <InputYesNoApi
            handleChange={handleChangeForYesNo}
            name={"blocked"}
            value={userData?.blocked ? "yes" : "no"}
          />
        </p>
      </div>
    )
  );
}

export default UserPanel;
