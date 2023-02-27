import { useContext,  useRef } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UseFetch from "../../../custom/UseFetch";
import { AlertContex } from "../../../context/AlertContext";

const Add = ({ addAdmin, setAddAdmin, setAdmins }) => {
  const { token } = useContext(AuthContext);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { toggleOn } = useContext(AlertContex);

  const addNewAdmin = async (e) => {
    const response = await UseFetch(
      process.env.REACT_APP_API_ADMIN_REGISTER,
      "POST",
      {
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      },
      {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      }
    );
    if (response.success) {
      toggleOn(response.messages, response.success);
      setAddAdmin(false)
      setAdmins((pre)=> [response.data, ...pre ])
    } else {
      toggleOn(response.messages, response.success);
    }
  };

  return (
    <>
      <Dialog open={addAdmin} onClose={() => setAddAdmin(false)}>
        <DialogTitle sx={{ fontSize: "21px", textAlign: "center" }}>
          Add New Admin
        </DialogTitle>
        <DialogContent sx={{ width: "450px" }}>
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
              ref={nameRef}
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
              ref={emailRef}
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
              ref={passwordRef}
              autoComplete="new-password"
              required=""
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#334155" }} onClick={() => setAddAdmin(false)}>
            Cancel
          </Button>
          <Button onClick={addNewAdmin} sx={{ color: "#334155" }}>
            Add Admin
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Add;
