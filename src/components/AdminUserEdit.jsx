import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";
import { backendUrl } from "../helpers";
import { toast } from "react-toastify";

function AdminUserEdit() {
  const location = useLocation();
  const userId = location.state;

  const [details, setDetails] = React.useState([]);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/users/${userId}`);
      if (response.status === 200) {
        setDetails(response.data);
      }
    } catch (error) {}
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/users/save/${userId}`, {
        ...details,
      });
      if (res.status === 200) {
        window.location.href = "/customer-dashboard/users";
      }
    } catch (error) {
      toast.error(error?.message, {
        position: "top-left",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
  };

  return (
    details && (
      <div className="container mx-auto p-4">
        <h2 className="mb-4 text-2xl font-bold">Edit Excutive Details</h2>
        <p>
          <span className="w-[100px] text-center text-gray-400">Name-:</span>
          <br />
          <input
            className="mb-4 w-[250px] rounded-lg border bg-blue-700/20 p-2 text-center"
            type="text"
            onChange={(e) =>
              setDetails((val) => ({
                ...val,
                name: e.target.value,
              }))
            }
            name="name"
            value={details.name}
          />{" "}
        </p>
        <p>
          <span className="w-[100px] text-center text-gray-400">
            UserId:
          </span>
          <br />
          <input
            className="mb-4 w-[250px] rounded-lg border bg-blue-700/20 p-2 text-center"
            type="text"
            onChange={(e) =>
              setDetails((val) => ({
                ...val,
                userId: e.target.value,
              }))
            }
            name="userId"
            value={details.userId}
          />{" "}
        </p>
        <p>
          <span className="w-[100px] text-center text-gray-400">
            Password:
          </span>
          <br />
          <input
            className="mb-4 w-[250px] rounded-lg border bg-blue-700/20 p-2 text-center"
            type="text"
            onChange={(e) =>
              setDetails((val) => ({
                ...val,
                password: e.target.value,
              }))
            }
            name="name"
            value={details.password}
          />{" "}
        </p>
        <p>
          <span className="w-[100px] text-center text-gray-400">
            No Of Lead Can Access:
          </span>
          <br />
          <input
            className="mb-4 w-[250px] rounded-lg border bg-blue-700/20 p-2 text-center"
            type="number"
            onChange={(e) =>
              setDetails((val) => ({
                ...val,
                leadAccessCount: e.target.value,
              }))
            }
            name="name"
            value={details.leadAccessCount}
          />{" "}
        </p>
        <p>
          <span className="w-[100px] text-center text-gray-400">
            Can Edit :
          </span>{" "}
          <br />
          <select
            name=""
            value={details?.permissions?.Edit ? "true" : "false"}
            onChange={(e) =>
              setDetails((val) => ({
                ...val,
                permissions: {
                  ...val.permissions,
                  Edit: e.target.value === "true" ? true : false,
                },
              }))
            }
            className="mb-4 w-[250px] rounded-lg border bg-blue-700/20 p-2 text-center"
            id=""
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </p>
        <p>
          <span className="w-[100px] text-center text-gray-400">
            Can Send Welcome E-Mail :
          </span>{" "}
          <br />
          <select
            name=""
            value={details?.permissions?.Welcome ? "true" : "false"}
            onChange={(e) =>
              setDetails((val) => ({
                ...val,
                permissions: {
                  ...val.permissions,
                  Welcome: e.target.value === "true" ? true : false,
                },
              }))
            }
            className="mb-4 w-[250px] rounded-lg border bg-blue-700/20 p-2 text-center"
            id=""
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </p>
        <p>
          <span className="w-[100px] text-center text-gray-400">
            Can Share Aprooval Letter :
          </span>{" "}
          <br />
          <select
            name=""
            value={details?.permissions?.Approval ? "true" : "false"}
            onChange={(e) =>
              setDetails((val) => ({
                ...val,
                permissions: {
                  ...val.permissions,
                  Approval: e.target.value === "true" ? true : false,
                },
              }))
            }
            className="mb-4 w-[250px] rounded-lg border bg-blue-700/20 p-2 text-center"
            id=""
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </p>
        <p>
          <span className="w-[100px] text-center text-gray-400">
            Can Share Agreement Letter to Lead :
          </span>{" "}
          <br />
          <select
            name=""
            value={details?.permissions?.Agreement ? "true" : "false"}
            onChange={(e) =>
              setDetails((val) => ({
                ...val,
                permissions: {
                  ...val.permissions,
                  Agreement: e.target.value === "true" ? true : false,
                },
              }))
            }
            className="mb-4 w-[250px] rounded-lg border bg-blue-700/20 p-2 text-center"
            id=""
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </p>
        <p>
          <span className="w-[100px] text-center text-gray-400">
            Can Share Purchase Order Letter to Lead :
          </span>{" "}
          <br />
          <select
            name=""
            value={details?.permissions?.PurchaseOrder ? "true" : "false"}
            onChange={(e) =>
              setDetails((val) => ({
                ...val,
                permissions: {
                  ...val.permissions,
                  PurchaseOrder: e.target.value === "true" ? true : false,
                },
              }))
            }
            className="mb-4 w-[250px] rounded-lg border bg-blue-700/20 p-2 text-center"
            id=""
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </p>
        <p>
          <span className="w-[100px] text-center text-gray-400">
            Can Share Bank Details to Lead :
          </span>{" "}
          <br />
          <select
            name=""
            value={details?.permissions?.ShareBankDetails ? "true" : "false"}
            onChange={(e) =>
              setDetails((val) => ({
                ...val,
                permissions: {
                  ...val.permissions,
                  ShareBankDetails: e.target.value === "true" ? true : false,
                },
              }))
            }
            className="mb-4 w-[250px] rounded-lg border bg-blue-700/20 p-2 text-center"
            id=""
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </p>
        <p>
          <span className="w-[100px] text-center text-gray-400">
            Can Delete Lead :
          </span>{" "}
          <br />
          <select
            name=""
            value={details?.permissions?.Delete ? "true" : "false"}
            onChange={(e) =>
              setDetails((val) => ({
                ...val,
                permissions: {
                  ...val.permissions,
                  Delete: e.target.value === "true" ? true : false,
                },
              }))
            }
            className="mb-4 w-[250px] rounded-lg border bg-blue-700/20 p-2 text-center"
            id=""
          >
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </p>
        <p>
          <span className="w-[100px] text-center text-gray-400">
            Excutive Blocked:
          </span>{" "}
          <br />
          <select
            name=""
            value={details?.permissions?.blocked ? "true" : "false"}
            onChange={(e) =>
              setDetails((val) => ({
                ...val,
                permissions: {
                  ...val.permissions,
                  blocked: e.target.value === "true" ? true : false,
                },
              }))
            }
            className="mb-4 w-[250px] rounded-lg border bg-blue-700/20 p-2 text-center"
            id=""
          >
            <option value="true">Yes, Its Blocked</option>
            <option value="false">No, Not Blocked</option>
          </select>
        </p>
        <p>
          <span className="w-[100px] text-center text-gray-400">
            Can Leads Upload:
          </span>{" "}
          <br />
          <select
            name=""
            value={details?.canLeadUpload ? "true" : "false"}
            onChange={(e) =>
              setDetails((val) => ({
                ...val,
                canLeadUpload: e.target.value === "true" ? true : false,
              }))
            }
            className="mb-4 w-[250px] rounded-lg border bg-blue-700/20 p-2 text-center"
            id=""
          >
            <option value="true">Yes </option>
            <option value="false">No </option>
          </select>
        </p>
        <button
          onClick={handleSave}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white"
        >
          {" "}
          Save{" "}
        </button>
      </div>
    )
  );
}

export default AdminUserEdit;
