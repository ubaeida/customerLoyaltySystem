import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useRef } from "react";
import { AlertContex } from "../../../context/AlertContext";
import { AuthContext } from "../../../context/AuthContext";
import UseFetch from "../../../custom/UseFetch";

const AddMember = ({ addMember, setAddMember, setMembers }) => {
  const phoneRef = useRef();
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);

  const addNewMember = async () => {
    const response = await UseFetch(
      process.env.REACT_APP_API_COMPANY_ADD_MEMBERSHIP,
      "POST",
      { phone: phoneRef.current.value },
      { "Content-Type": "Application/json", authorization: `Bearer ${token}` }
    );
    if (response.success) {
      setMembers((pre) => [response.data, ...pre]);
      toggleOn(response.messages, response.success);
      setAddMember(false)
    }else {
      toggleOn(response.messages, response.success);
    }
  };
  return (
    <>
      <Dialog open={addMember} onClose={() => setAddMember(false)}>
        <DialogTitle sx={{ fontSize: "21px", textAlign: "center" }}>
          Add New Member
        </DialogTitle>
        <DialogContent sx={{ width: "450px" }}>
          <div className="col-span-full">
            <label
              htmlFor="phone"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="phone"
              name="phone"
              ref={phoneRef}
              autoComplete="phone"
              required={true}
              className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#334155" }} onClick={() => setAddMember(false)}>
            Cancel
          </Button>
          <Button onClick={addNewMember} sx={{ color: "#334155" }}>
            Add Member
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddMember;
