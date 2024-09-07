import React, { useState } from "react";
import {
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import UserHeader from "./ui/UserHeader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../helpers";

function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    name: "",
    leadAccessCount: "",
    permissions: {
      Welcome: false,
      Approval: false,
      Agreement: false,
      PurchaseOrder: false,
      Cancellation: false,
      ShareBankDetails: false,
      Edit: false,
      Delete: false,
    },
    canLeadUpload: false,
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.permissions) {
      setFormData((prevState) => ({
        ...prevState,
        permissions: {
          ...prevState.permissions,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.userId || !formData.password || !formData.leadAccessCount) {
      setSubmitStatus({
        success: false,
        message: "Please fill in all required fields.",
      });
      return;
    }

    try {
    
      const response = await axios.post(
        `${backendUrl}/api/users/add`,
        formData,
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
        navigate("/customer-dashboard/users");
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
      setSubmitStatus({
        success: false,
        message: error.response
          ? error.response.data.message
          : "An error occurred.",
      });
    }
  };

  return (
    <div>
      <UserHeader isAccountBTNshown={false} />
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" align="center" gutterBottom>
            Add User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="outlined"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="User ID"
                  variant="outlined"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Number of Lead Accesses"
                  variant="outlined"
                  type="number"
                  name="leadAccessCount"
                  value={formData.leadAccessCount}
                  onChange={handleChange}
                  required
                  inputProps={{ min: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Permissions:{" "}
                  <span className="text-[8px] text-red-600">
                    You can Not Change!
                  </span>
                </Typography>
                {Object.keys(formData.permissions).map((permission) => (
                  <FormControlLabel
                    key={permission}
                    control={
                      <Checkbox
                        name={permission}
                        checked={formData.permissions[permission]}
                        onChange={handleChange}
                      />
                    }
                    label={permission}
                  />
                ))}
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name={"canLeadUpload"}
                      checked={formData.canLeadUpload}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          canLeadUpload: e.target.checked,
                        })
                      }
                    />
                  }
                  label={"Lead Uploading Access"}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{
                    backgroundColor: "#007bff",
                    "&:hover": {
                      backgroundColor: "#0056b3",
                    },
                  }}
                >
                  Add User
                </Button>
              </Grid>

              {submitStatus && (
                <Grid item xs={12}>
                  <Typography
                    align="center"
                    sx={{
                      color: submitStatus.success ? "green" : "red",
                      mt: 2,
                    }}
                  >
                    {submitStatus.message}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default AddUser;
