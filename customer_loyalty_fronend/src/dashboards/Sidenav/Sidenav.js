import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import "../css/Dashboard.css";
const Sidenav = ({ links, sidenavOpen  }) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <aside
        className={
          sidenavOpen
            ? `max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-4 ml-4 block w-full
      flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased 
      shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent translate-x-0 shadow-soft-xl`
            : `max-w-62.5 ease-nav-brand z-990 fixed inset-y-0 my-4 ml-4 block w-full -translate-x-full 
      flex-wrap items-center justify-between overflow-y-auto rounded-2xl border-0 bg-white p-0 antialiased 
      shadow-none transition-transform duration-200 xl:left-0 xl:translate-x-0 xl:bg-transparent`
        }
      >
        <div className="h-19.5">
          <NavLink
            className="block px-8 py-6 m-0 text-sm whitespace-nowrap text-slate-700"
            to={`/${user.type}/`}
          >
            <img
              src="../logo512.png"
              className="inline h-full max-w-full transition-all duration-200 ease-nav-brand max-h-8"
              alt="main_logo"
            />
          </NavLink>
        </div>
        <hr className="h-0.5  mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent"/>
        <div className="items-center block w-auto  overflow-auto h-auto grow basis-full">
          <ul className="flex flex-col pl-0 mb-0">
            {links?.map((link, i) => {
            return (
              <li key={i} className="mt-0.5 w-full">
                <NavLink
                  to={link.target}
                  className={({ isActive }) =>
                    isActive
                      ? `shadow-soft-xl bg-white py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center 
             whitespace-nowrap rounded-lg  px-4 font-semibold text-slate-700 transition-colors`
                      : `py-2.7  text-sm ease-nav-brand my-0 mx-4 flex items-center 
             whitespace-nowrap rounded-lg  px-4 font-semibold text-slate-700 transition-colors`
                  }
                >
                  <div className="bg-gradient-to-tl from-blue-700 to-blue-400 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5">
                    {link.icon}
                  </div>
                  <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">
                    {link.text}
                  </span>
                </NavLink>
              </li>
            )})}
          </ul>
        </div>
      </aside>

    </>
  );
};

export default Sidenav;
