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

const UserProfile = ({ userProfile, setUserProfile }) => {
  const [userDelete, setUserDelete] = useState(false);
  const { token, user, setUser, login, logout } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);
  const navigate = useNavigate();
  const updateUserProfile = async (e) => {
    e.preventDefault();
    const connect = await fetch(
      `${process.env.REACT_APP_API_USER_UPDATE}/${user.id}`,
      {
        method: "PUT",
        body: new FormData(e.target),
        headers: { authorization: `Bearer ${token}` },
      }
    );
    const response = await connect.json();
    if (await response.success) {
      setUser({ ...response.data });
      login({ ...user, type: "user" }, token);
      toggleOn(response.messages, response.success);
      handleClose();
    } else {
      toggleOn(response.messages, response.success);
    }
  };

  const handleClose = () => {
    setUserProfile(false);
  };
  const deleteProfile = async () => {
    const response = await UseFetch(
      `${process.env.REACT_APP_API_USER_DELETE}/${user.id}`,
      "DELETE",
      null,
      { authorization: `Bearer ${token}` }
    );
    if (response.success) {
      toggleOn(response.messages, response.success);
      setUserDelete(false);
      handleClose();
      logout();
      navigate("/");
    } else {
      toggleOn(response.messages, response.success);
    }
  };

  return (
    <>
      <Dialog open={userProfile} onClose={handleClose}>
        <DialogTitle sx={{ fontSize: "21px", textAlign: "center" }}>
          <ManageAccountsIcon sx={{ fontSize: "28px" }} /> Update Profile
        </DialogTitle>
        <DialogContent sx={{ width: "450px" }}>
          <form
            action="#"
            onSubmit={(e) => updateUserProfile(e)}
            method="POST"
            className="mt-5 grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2"
            id="updateForm"
          >
            <div className="col-span-full">
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                User name
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
                htmlFor="name"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Surname
              </label>
              <input
                id="surname"
                type="surname"
                name="surname"
                value={user.surname}
                onChange={(e) => {
                  setUser({ ...user, surname: e.target.value });
                }}
                autoComplete="surname"
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
                htmlFor="phone"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                value={user.phone}
                onChange={(e) => {
                  setUser({ ...user, phone: e.target.value });
                }}
                autoComplete="phone"
                required=""
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                New password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="new-password"
                required=""
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="address"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Birthdate
              </label>
              <input
                id="birthdate"
                type="text"
                name="birthdate"
                value={user.birthdate}
                onChange={(e) => {
                  setUser({ ...user, birthdate: e.target.value });
                }}
                autoComplete="birthdate"
                required=""
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="gender"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                onChange={(e) => {
                  setUser({ ...user, gender: e.target.value });
                }}
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="title"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <select
                id="title"
                name="title"
                type="text"
                value={user.title}
                onChange={(e) => {
                  setUser({ ...user, title: e.target.value });
                }}
                autoComplete="title"
                required=""
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                <option>Ms</option>
                <option>Mr</option>
                <option>Miss</option>
              </select>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="logo"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Logo
              </label>
              <input
                id="avatar"
                type="file"
                name="avatar"
                autoComplete="logo"
                required=""
                className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-gray-50 file:text-gray-700
            hover:file:bg-gray-100"
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
            onClick={() => setUserDelete(true)}
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
        open={userDelete}
        onClose={() => setUserDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete your account?"}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => setUserDelete(false)}
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

export default UserProfile;
