import Wrraper from "../../components/Wrraper";
import { useRef, useContext } from "react";
import "./Login.css";
import UseFetch from "../../custom/UseFetch";
import { AlertContex } from "../../context/AlertContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const nvaigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);
  const passwordref = useRef();
  const emailref = useRef();
  const login = async () => {
    let body = {
      email: emailref.current.value,
      password: passwordref.current.value,
    };
    const user = await UseFetch(process.env.REACT_APP_API_LOGIN, "POST", body, {
      "Content-Type": "Application/json",
    });
    toggleOn(user.messages, user.success);
    if (user.success) {
      const types = Object.keys(user.data);
      if (types.includes("admin")) {
        authCtx.login({ ...user.data.admin, type: "admin" }, user.data.token);
        nvaigate("/admin/");
      }
      if (types.includes("user")) {
        authCtx.login({ ...user.data.user, type: "user" }, user.data.token);
        nvaigate("/user/");
 
      }
      if (types.includes("company")) {
        authCtx.login(
          { ...user.data.company, type: "company" },
          user.data.token
        );
        nvaigate("/company/");
      }
    }
  };

  return (
    <Wrraper>
      <div className="relative flex min-h-full justify-center md:px-12 lg:px-0 mainBox">
        <div className="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28">
          <div className="mx-auto w-full  max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            <div className="flex flex-col">
              <a aria-label="Home" href="/">
                <img
                  src="logo512.png"
                  height="40px"
                  className="h-10 w-auto inline "
                  alt="logo"
                />
              </a>
              <div className="mt-20">
                <h2 className="text-lg font-semibold text-gray-900">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  Don’t have an account?{" "}
                  <a
                    className="font-medium text-blue-600 hover:underline"
                    href="/userregister"
                  >
                    Sign up
                  </a>{" "}
                  for a free trial.
                </p>
              </div>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-y-8">
              <div className="">
                <label
                  htmlFor="email"
                  className="mb-3 block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  ref={emailref}
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required=""
                  className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div className="">
                <label
                  htmlFor="password"
                  className="mb-3 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  ref={passwordref}
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required=""
                  className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <button
                  className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full"
                  onClick={login}
                >
                  <span>
                    Sign in <span aria-hidden="true">→</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
          <img
            alt="background-auth"
            src="https://salient.tailwindui.com/_next/static/media/background-auth.4bcf3f4b.jpg"
            width="1664"
            height="1866"
            decoding="async"
            data-nimg="1"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ color: "transparent" }}
          />
        </div>
      </div>
    </Wrraper>
  );
};

export default Login;
