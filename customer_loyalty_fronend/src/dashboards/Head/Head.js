import "../css/Dashboard.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { TitleContext } from "../../context/TitleContext";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CompanyProfile from "../CompanyDashboard/components/CompanyProfile";
import UserProfile from "../UserDashboard/components/UserProfile";
import AdminsProfile from "../AdminDashboard/components/AdminsProfile";

const Head = ({ setSidenavOpen, sidenavOpen }) => {
  const { logout } = useContext(AuthContext);
  const { title } = useContext(TitleContext);
  const { user } = useContext(AuthContext);

  const [companyProfile, setCompanyProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [adminProfile, setAdminProfile] = useState(false);

  const handleClickOpen = () => {
    if (user.type === "company") setCompanyProfile(true);
    if (user.type === "user") setUserProfile(true);
    if (user.type === "admin") setAdminProfile(true);
  };

  const logoutService = () => {
    logout();
    window.location.href = ("/");
  };
  return (
    <>
      <nav
        className="relative flex flex-wrap items-center justify-between px-0 py-2 mx-6 transition-all shadow-none duration-250 ease-soft-in rounded-2xl lg:flex-nowrap lg:justify-start"
        navbar-scroll="true"
      >
        <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
          <nav>
            <ol className="flex flex-wrap pt-1 mr-12 bg-transparent rounded-lg sm:mr-16">
              <li className="leading-normal text-sm">
                <div className="opacity-50 text-slate-700">Pages</div>
              </li>
              <li
                className="text-sm pl-2 capit leading-normal text-slate-700 before:float-left before:pr-2 before:text-gray-600 before:content-['/']"
                aria-current="page"
              >
                Dashboard
              </li>
            </ol>
            <h6 className="mb-0 font-bold capitalize">{title}</h6>
          </nav>

          <div className="flex justify-end items-center mt-2 grow sm:mt-0 sm:mr-6 md:mr-0 lg:flex lg:basis-auto">
            <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
              <li
                onClick={() => {
                  if (sidenavOpen) setSidenavOpen(false);
                  else setSidenavOpen(true);
                }}
                className="flex  items-center mr-3 pl-4 xl:hidden"
              >
                <div className="w-4.5 cursor-pointer overflow-hidden">
                  <i
                    className={
                      sidenavOpen
                        ? `ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 `
                        : `ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all translate-x-[5px]`
                    }
                  ></i>
                  <i className="ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all"></i>
                  <i
                    className={
                      sidenavOpen
                        ? `ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 transition-all`
                        : `ease-soft mb-0.75 relative block h-0.5 rounded-sm bg-slate-500 translate-x-[5px]`
                    }
                  ></i>
                </div>
              </li>

              <li className="flex items-center">
                <button
                  className="block px-0 py-2 font-semibold transition-all mr-4 ease-nav-brand text-sm text-slate-500"
                  onClick={handleClickOpen}
                >
                  <span className="hidden sm:inline mr-3">Profile</span>
                  <ManageAccountsIcon />
                </button>
                <button
                  className="block px-0 py-2 font-semibold transition-all ease-nav-brand text-sm text-slate-500"
                  onClick={logoutService}
                >
                  <span className="hidden sm:inline mr-3">Sign out</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="rgb(103 116 142 /500)"
                  >
                    <path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-16-7v20h14v-2h-12v-16h12v-2h-14z" />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <CompanyProfile
          companyProfile={companyProfile}
          setCompanyProfile={setCompanyProfile}
        />
        <UserProfile
          userProfile={userProfile}
          setUserProfile={setUserProfile}
        />
        <AdminsProfile
          adminProfile={adminProfile}
          setAdminProfile={setAdminProfile}
        />
      </nav>
    </>
  );
};

export default Head;
