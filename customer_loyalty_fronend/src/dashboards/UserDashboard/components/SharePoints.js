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

const SharePoints = ({
  companyName,
  openSharePoints,
  setOpenSharePoints,
  membership,
}) => {
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);

  const phoneRef = useRef();
  const pointsRef = useRef();
  const potinsTypeRef = useRef();
  const sharePoints = async () => {
    const response = await UseFetch(
      `${process.env.REACT_APP_API_SHARE_POINTS}`,
      "POST",
      {
        phone: phoneRef.current.value,
        points: pointsRef.current.value,
        tier: potinsTypeRef.current.value,
        companyName: companyName,
      },
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    );
    toggleOn(response.messages, response.success);
    if (response.success) {
      toggleOn(response.messages, response.success);
      setOpenSharePoints(false);
      membership.standardPoints = response.data.sender.standardPoints
      membership.tiersPoints = response.data.sender.tiersPoints
    }
  };

  return (
    <Dialog
      open={openSharePoints}
      onClose={() => {
        setOpenSharePoints(false);
      }}
      aria-labelledby="edit-apartment"
    >
      <DialogTitle id="edit-apartment">Share points</DialogTitle>
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
            htmlFor="phone"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Points
          </label>
          <input
            id="points"
            type="number"
            name="points"
            ref={pointsRef}
            required=""
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div className="col-span-full">
          <label
            htmlFor="type"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Points type
          </label>
          <select
            id="type"
            name="tier"
            ref={potinsTypeRef}
            className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
          >
            <option value={"Tiers points"}>Tiers points</option>
            <option value={"Standard points"}>Standard points</option>
          </select>
        </div>
      </DialogContent>
      <DialogActions>
        <Box>
          <Button
            sx={{ color: "#334155" }}
            onClick={() => {
              setOpenSharePoints(false);
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{ color: "#334155" }}
            onClick={() => {
              sharePoints();
            }}
          >
            Share
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default SharePoints;
