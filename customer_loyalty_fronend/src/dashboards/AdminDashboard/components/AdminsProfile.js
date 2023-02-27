import { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AuthContext } from "../../../context/AuthContext";
import { AlertContex } from "../../../context/AlertContext";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import UseFetch from "../../../custom/UseFetch";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const AdminsProfile = ({ setAdminProfile, adminProfile }) => {
  const [adminDelete, setAdminDelete] = useState(false);
  const { token, user, setUser, login, logout } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);
  const navigate = useNavigate();
  const passwprdRef = useRef()
  const handleClose = () => {
    setAdminProfile(false);
  };

  const updateAdminProfile = async (e) => {
    e.preventDefault();
    const connect = await fetch(
      `${process.env.REACT_APP_API_ADMIN_UPDATE}/${user.id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: passwprdRef.current.value ,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await connect.json();
    if (await response.success) {
      setUser({ ...response.data });
      login({ ...user, type: "admin" }, token);
      toggleOn(response.messages, response.success);
      handleClose();
    } else {
      toggleOn(response.messages, response.success);
    }
  };

  const deleteProfile = async () => {
    const response = await UseFetch(
      `${process.env.REACT_APP_API_GET_DELETE_ADMIN}/${user.id}`,
      "DELETE",
      null,
      { authorization: `Bearer ${token}` }
    );
    if (response.success) {
      toggleOn(response.messages, response.success);
      setAdminDelete(false);
      handleClose();
      logout();
      navigate("/");
    } else {
      toggleOn(response.messages, response.success);
    }
  };

  return (
    <>
      <Dialog open={adminProfile} onClose={handleClose}>
        <DialogTitle sx={{ fontSize: "21px", textAlign: "center" }}>
          <ManageAccountsIcon sx={{ fontSize: "28px" }} /> Update Profile
        </DialogTitle>
        <DialogContent sx={{ width: "450px" }}>
          <form
            action="#"
            onSubmit={(e) => updateAdminProfile(e)}
            method="PUT"
            className="mt-5 grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2"
            id="updateForm"
          >
            <div className="col-span-full">
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Admin Name
              </label>
              <input
                id="name"
                type="name"
                name="name"
                value={user.name}
                onChange={(e) => {
                  setUser({ ...user, name: e.target.value });
                }}
                autoComplete="name"
                required=""
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                autoComplete="email"
                required=""
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="col-span-full">
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="new-password"
                ref={passwprdRef}
                required=""
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </form>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <button
            className="bg-[#dc2626] text-white border-0 rounded-md text-[10px] w-1/3 h-8 hover:bg-[#ef4444]"
            onClick={() => setAdminDelete(true)}
          >
            DELETE YOUR ACCOUNT
          </button>
          <div>
            <Button sx={{ color: "#334155" }} onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" form="updateForm" sx={{ color: "#334155" }}>
              Update
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog
        open={adminDelete}
        onClose={() => setAdminDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you to delete your account?"}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => setAdminDelete(false)}
            sx={{ color: "#334155" }}
            autoFocus
          >
            Disagree
          </Button>
          <Button sx={{ color: "#334155" }} onClick={() => deleteProfile()}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminsProfile;
