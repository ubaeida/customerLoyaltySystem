import React, { useContext, useState } from "react";
import { Activities } from "./Activities";
import StanderdPoints from "./StanderdPoints";
import TierPoints from "./TierPoints";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SharePoints from "./SharePoints";
import UseFetch from "../../../custom/UseFetch";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { AuthContext } from "../../../context/AuthContext";
import { AlertContex } from "../../../context/AlertContext";
import AddRelation from "./AddRelation";

const MembershipCard = ({ membership, memberships, setMemberships }) => {
  const [openActivities, setOpenActivities] = useState(false);
  const [openAddRelation, setOpenAddRelation] = useState(false);
  const [openSharePoints, setOpenSharePoints] = useState(false);
  const [membershipDelete, setMembershipDelete] = useState(false);

  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);

  const deleteMembership = async (id) => {
    const response = await UseFetch(
      `${process.env.REACT_APP_API_MEMBERSHIP_DELETE}/${id}`,
      "DELETE",
      null,
      { Authorization: `Bearer ${token}` }
    );
    if (response.success) {
      toggleOn(response.messages, response.success);
      const newMembership = memberships.filter((i) => i.id !== id);
      setMemberships(newMembership);
      setMembershipDelete(false);
    }
    if (memberships.length === 0)
      toggleOn("YOU HAVE NO MEMBERSHIPS YET", false);
  };

  const handleDelelteMembership = () => {
    setMembershipDelete(false);
  };

  return (
    <div
      key={membership.id}
      className="relative flex flex-col items-center shadow-soft-xl rounded-2xl bg-clip-border w-full bg-white "
    >
      <div className="relative w-full flex flex-row mb-1 mt-3 items-center  ">
        <img
          alt="company logo"
          src={membership.company.logo}
          className="w-8 h-8 ml-5 object-cover border mr-3 rounded-full "
        />
        <h6 className="text-center font-semibold text-black capitalize ">
          {membership.company.name}
        </h6>
      </div>
      <StanderdPoints membership={membership} />
      <hr className="h-px w-full mt-4 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent " />
      <TierPoints membership={membership} />
      <hr className="h-px w-full bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent " />
      <div className="flex flex-row w-full justify-around mb-3">
        <button
          onClick={() => setMembershipDelete(true)}
          className="  w-1/6 focus:outline-none "
        >
          <RemoveCircleIcon
            sx={{
              width: "25px",
              height: "25px",
              "&:hover": { color: "#dc2626" },
            }}
          />
        </button>
        <button
          className="  w-1/6 focus:outline-none"
          onClick={() => setOpenActivities(true)}
        >
          <ReceiptLongIcon
            sx={{
              width: "25px",
              height: "25px",
              "&:hover": { color: "#4b5563" },
            }}
          />
        </button>
        <button
          onClick={() => setOpenSharePoints(true)}
          className="  w-1/6 focus:outline-none"
        >
          <ControlPointDuplicateIcon
            sx={{
              width: "25px",
              height: "25px",
              "&:hover": { color: "#4b5563" },
            }}
          />
        </button>
        <button
          onClick={() => setOpenAddRelation(true)}
          className="w-1/6 focus:outline-none"
        >
          <GroupAddIcon
            sx={{
              width: "25px",
              height: "25px",
              "&:hover": { color: "#4b5563" },
            }}
          />
        </button>
      </div>

      <Dialog
        open={membershipDelete}
        onClose={handleDelelteMembership}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this membership?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you delete this membership, you will not be a member in this
            company and you will lose all your points and benefits from being a
            member in this company. However, you can start a membership again in
            the same company when ever you want.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#334155" }} onClick={handleDelelteMembership}>
            Disagree
          </Button>
          <Button
            sx={{ color: "#334155" }}
            onClick={() => deleteMembership(membership.id)}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {openActivities && (
        <Activities
          company={membership.company}
          openActivities={openActivities}
          setOpenActivities={setOpenActivities}
        />
      )}
      {openSharePoints && (
        <SharePoints
          companyName={membership.company.name}
          openSharePoints={openSharePoints}
          setOpenSharePoints={setOpenSharePoints}
          membership={membership}
        />
      )}
      {openAddRelation && (
        <AddRelation
          companyName={membership.company.name}
          openAddRelation={openAddRelation}
          setOpenAddRelation={setOpenAddRelation}
        />
      )}
    </div>
  );
};

export default MembershipCard;
