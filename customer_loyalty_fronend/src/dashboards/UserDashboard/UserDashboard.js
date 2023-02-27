import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Sidenav from "../Sidenav/Sidenav";
import Head from "../Head/Head";
import { Outlet } from "react-router-dom";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const UserDashboard = (props) => {
  const { token, user, logout } = useContext(AuthContext);

  useEffect(() => {
    if (!token || user.type !== "user") {
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
      target: "/user/",
      text: "Memberships",
      icon: (
        <CardMembershipIcon
          sx={{ color: "white", width: "18px", height: "18px" }}
        />
      ),
    },
    {
      target: "/user/activities",
      text: "Activities",
      icon: (
        <ReceiptLongIcon
          sx={{ color: "white", width: "18px", height: "18px" }}
        />
      ),
    },
    {
      target: "/user/relations",
      text: "Relations",
      icon: (
        <PeopleAltIcon
          sx={{ color: "white", width: "18px", height: "18px" }}
        />
      ),
    },
  ];
  return (
    <div
      className="m-0 font-normal bg-gray-50 text-slate-500 flex flex-col justify-between h-auto min-h-screen"
      onClick={() => {
        if (sidenavOpen) setSidenavOpen(false);
      }}
    >
      <Sidenav links={links} sidenavOpen={sidenavOpen} />
      <main className="ease-soft-in-out xl:ml-68.5 relative  rounded-xl transition-all duration-200">
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
  );
};

export default UserDashboard;
