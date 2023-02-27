import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Sidenav from "../Sidenav/Sidenav";
import Head from "../Head/Head";
import { Outlet } from "react-router-dom";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ReorderIcon from "@mui/icons-material/Reorder";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import BusinessIcon from '@mui/icons-material/Business';

const AdminDashboard = () => {
  const { token, user, logout } = useContext(AuthContext);
  const [sidenavOpen, setSidenavOpen] = useState(false);

  useEffect(() => {
    if (sidenavOpen) setSidenavOpen(false);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!token || user.type !== "admin") {
      logout();
      window.location.href = "/login";
    } else return;
    // eslint-disable-next-line
  }, []);
  var links = [];
  if (user.email === "superadmin@gmail.com") {
    links = [
      {
        target: "/admin/",
        text: " Add Bill",
        icon: (
          <ReceiptLongIcon
            sx={{ color: "white", width: "18px", height: "18px" }}
          />
        ),
      },
      {
        target: "/admin/list",
        text: "Admins list",
        icon: (
          <FormatListBulletedIcon
            sx={{ color: "white", width: "18px", height: "18px" }}
          />
        ),
      },
      {
        target: "/admin/companies",
        text: "All Companies",
        icon: (
          <BusinessIcon sx={{ color: "white", width: "18px", height: "18px" }} />
        ),
      },
      {
        target: "/admin/users",
        text: "All Users",
        icon: (
          <GroupsIcon sx={{ color: "white", width: "18px", height: "18px" }} />
        ),
      },

      {
        target: "/admin/members",
        text: "All Members",
        icon: (
          <LoyaltyIcon sx={{ color: "white", width: "18px", height: "18px" }} />
        ),
      },
      {
        target: "/admin/relations",
        text: " Members Relations",
        icon: (
          <PeopleAltIcon
            sx={{ color: "white", width: "18px", height: "18px" }}
          />
        ),
      },
      {
        target: "/admin/activities",
        text: " Activities",
        icon: (
          <ReorderIcon sx={{ color: "white", width: "18px", height: "18px" }} />
        ),
      },
    ];
  } else {
    links = [
      {
        target: "/admin/",
        text: " Add Bill",
        icon: (
          <ReceiptLongIcon
            sx={{ color: "white", width: "18px", height: "18px" }}
          />
        ),
      },
      {
        target: "/admin/companies",
        text: "All Companies",
        icon: (
          <BusinessIcon sx={{ color: "white", width: "18px", height: "18px" }} />
        ),
      },
      {
        target: "/admin/users",
        text: "All Users",
        icon: (
          <GroupsIcon sx={{ color: "white", width: "18px", height: "18px" }} />
        ),
      },
      {
        target: "/admin/members",
        text: "All Members",
        icon: (
          <LoyaltyIcon sx={{ color: "white", width: "18px", height: "18px" }} />
        ),
      },
      {
        target: "/admin/relations",
        text: " Members Relations",
        icon: (
          <PeopleAltIcon
            sx={{ color: "white", width: "18px", height: "18px" }}
          />
        ),
      },
      {
        target: "/admin/activities",
        text: " Activities",
        icon: (
          <ReorderIcon sx={{ color: "white", width: "18px", height: "18px" }} />
        ),
      },
    ];
  }

  return (
    <>
      <div
        className="m-0 h-auto min-h-screen font-sans antialiased font-normal text-base leading-default bg-gray-50 text-slate-500"
        onClick={() => {
          if (sidenavOpen) setSidenavOpen(false);
        }}
      >
        <Sidenav
          links={links}
          sidenavOpen={sidenavOpen}
          setSidenavOpen={setSidenavOpen}
        />
        <main className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200">
          <Head sidenavOpen={sidenavOpen} setSidenavOpen={setSidenavOpen} />
          <div className="w-full px-6 py-6 mx-auto  ">
            {" "}
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
