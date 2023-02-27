import Wrraper from "../../components/Wrraper";
import { useNavigate } from "react-router-dom";
import { AlertContex } from "../../context/AlertContext";
import { useContext } from "react";

const UserRegistration = () => {
  const nvaigate = useNavigate();
  const { toggleOn } = useContext(AlertContex);

  const addUser = async (e) => {
    console.log(e.target)
    e.preventDefault();
    const data = new FormData(e.target);
    const connect = await fetch(`${process.env.REACT_APP_API_USER_REGISTER}`, {
      method: "POST",
      body: data,
    });
    const company = await connect.json();
    toggleOn(company.messages, company.success);
    if (company.success) {
      nvaigate("/login");
    }
  };

  return (
    <Wrraper>
      <div className="relative flex min-h-full md-h-full lg-h-full justify-center md:px-12 lg:px-0">
        <div className="relative z-10 flex flex-1 flex-col bg-white py-10 px-4 shadow-2xl sm:justify-center md:flex-none md:px-28">
          <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
            <div className="flex flex-col">
              <a aria-label="Home" href="/">
                <img
                  src="logo512.png"
                  height="40px"
                  className="h-10 w-auto"
                  alt="logo"
                />
              </a>
              <div className="mt-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  If you want to start as company
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  Are you a company?{" "}
                  <a
                    className="font-medium text-blue-600 hover:underline"
                    href="/companyregister"
                  >
                    Company registration
                  </a>{" "}
                  to start a company account.
                </p>
                <div className="mt-5">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Get started
                  </h2>
                  <p className="mt-2 text-sm text-gray-700">
                    Already registered?{" "}
                    <a
                      className="font-medium text-blue-600 hover:underline"
                      href="/login"
                    >
                      Sign in
                    </a>{" "}
                    to your account.
                  </p>
                </div>
              </div>
            </div>
            <form
              action="#"
              method="POST"
              onSubmit={(e) => addUser(e)}
              className="mt-5 grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2"
            >
              <div className="">
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  autoComplete="given-name"
                  required=""
                  className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div className="">
                <label
                  htmlFor="surname"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  id="surname"
                  type="text"
                  name="surname"
                  autoComplete="family-name"
                  required=""
                  className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required=""
                  className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
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
                  autoComplete="phone"
                  required=""
                  className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="birthdate"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Birthdate
                </label>
                <input
                  id="birthdate"
                  type="date"
                  name="birthdate"
                  autoComplete="birthdate"
                  required=""
                  className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  required=""
                  className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="">
                <label
                  htmlFor="gender"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div className="">
                <label
                  htmlFor="title"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <select
                  id="title"
                  name="title"
                  className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
                >
                  <option>Ms</option>
                  <option>Mr</option>
                  <option>Miss</option>
                </select>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="avatar"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Photo
                </label>
                <input
                  id="avatar"
                  type="file"
                  name="avatar"
                  autoComplete="avatar"
                  required=""
                  className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-gray-50 file:text-gray-700
                  hover:file:bg-gray-100
            "
                />
              </div>
              <div className="col-span-full">
                <button
                  className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full"
                  type="submit"
                >
                  <span>
                    Sign up <span aria-hidden="true">→</span>
                  </span>
                </button>
              </div>
            </form>
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
            loading="lazy"
            style={{ color: "transparent" }}
          />
        </div>
      </div>
    </Wrraper>
  );
};

export default UserRegistration;
