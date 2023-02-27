import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Sidenav from "../Sidenav/Sidenav";
import Head from "../Head/Head";
import { Outlet } from "react-router-dom";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import ReorderIcon from '@mui/icons-material/Reorder';
import TuneIcon from '@mui/icons-material/Tune';
import SettingsInputCompositeIcon from '@mui/icons-material/SettingsInputComposite';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const CompanyDashboard = (props) => {
  const { token, user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!token || user.type !== "company") {
      window.location.href = "/login";
      logout();
    } else return;
    // eslint-disable-next-line
  }, []);
  const [sidenavOpen, setSidenavOpen] = useState(false);

  useEffect(() => {
    if (sidenavOpen) setSidenavOpen(false);
    // eslint-disable-next-line
  }, []);
  const links = [
    {
      target: "/company/",
      text: "Members",
      icon: (
        <LoyaltyIcon sx={{ color: "white", width: "18px", height: "18px" }} />
      ),
    },
    {
      target: "/company/rules",
      text: "Rules",
      icon: (
        <TuneIcon sx={{ color: "white", width: "18px", height: "18px" }} />
      ),
    },
    {
      target: "/company/configurations",
      text: "Configurations",
      icon: (
        <SettingsInputCompositeIcon sx={{ color: "white", width: "18px", height: "18px" }} />
      ),
    },
    {
      target: "/company/gifts",
      text: "Members Gifts",
      icon: (
        <CardGiftcardIcon sx={{ color: "white", width: "18px", height: "18px" }} />
      ),
    },
    {
      target: "/company/relations",
      text: "Members Relations",
      icon: (
        <PeopleAltIcon sx={{ color: "white", width: "18px", height: "18px" }} />
      ),
    },
    {
      target: "/company/membersactivities",
      text: "Activities",
      icon: (
        <ReorderIcon sx={{ color: "white", width: "18px", height: "18px" }} />
      ),
    },
  ];
  return (
    <>
      <div 
        className="m-0 h-auto min-h-screen  antialiased font-normal text-base leading-default bg-gray-50 text-slate-500"
        onClick={() => {
          if (sidenavOpen) setSidenavOpen(false);
        }}
      >
        <Sidenav links={links} sidenavOpen={sidenavOpen} />
        <main className="ease-soft-in-out xl:ml-68.5 relative h-full rounded-xl transition-all duration-200">
          <Head
            title={props.title}
            sidenavOpen={sidenavOpen}
            setSidenavOpen={setSidenavOpen}
          />
          <div className="w-full px-6 py-6 mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default CompanyDashboard;
