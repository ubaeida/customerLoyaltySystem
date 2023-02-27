import React, { useContext, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import UseFetch from "../../../custom/UseFetch";
import { AuthContext } from "../../../context/AuthContext";
import { AlertContex } from "../../../context/AlertContext";

const AddRelation = ({ companyName, openAddRelation, setOpenAddRelation }) => {
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);

  const phoneRef = useRef();
  const typeRef = useRef();
  const createRelation = async () => {
    const response = await UseFetch(
      `${process.env.REACT_APP_API_ADD_RELATION}`,
      "POST",
      { companyName: companyName, phone: phoneRef.current.value, type: typeRef.current.value },
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    );
    if (response.success) {
      toggleOn(response.messages, response.success);
      setOpenAddRelation(false);
    } else {
      toggleOn(response.messages, false);
    }
  };

  return (
    <Dialog
      open={openAddRelation}
      onClose={() => {
        setOpenAddRelation(false);
      }}
    >
      <DialogTitle>Add Relation</DialogTitle>
      <DialogContent sx={{ width: "450px" }}>
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
            ref={phoneRef}
            autoComplete="phone"
            required=""
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>

        <div className="col-span-full">
          <label
            htmlFor="type"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Type
          </label>
          <select
            id="type"
            name="type"
            ref={typeRef}
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option>Friend</option>
            <option>Family</option>
            <option>Fother</option>
            <option>Mother</option>
            <option>Sister</option>
            <option>Brother</option>
            <option>Wife</option>
            <option>Husband</option>
            <option>Twin</option>
            <option>uncle</option>
          </select>
        </div>
      </DialogContent>
      <DialogActions>
        <Box sx={{ "& button": { m: 1 } }}>
          <Button
            sx={{ color: "#334155" }}
            onClick={() => {
              setOpenAddRelation(false);
            }}
          >
            Cancel
          </Button>
          <Button sx={{ color: "#334155" }} onClick={createRelation}>
            Add
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddRelation;
