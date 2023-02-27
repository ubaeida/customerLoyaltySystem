import { useState } from "react";
import "./NavBar.css";
const Nav = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <a aria-label="Home" href="/#">
              <img
                src="logo512.png"
                height="40px"
                className="h-10 w-auto"
                alt="logo"
              />
            </a>
            <div className="hidden md:flex md:gap-x-6">
              <a
                className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/#features"
              >
                Features
              </a>
              <a
                className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/#faq"
              >
                Frequently asked questions
              </a>
              <a
                className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/userregister"
              >
                Start today
              </a>
            </div>
          </div>

          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <a
                className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/login"
              >
                Sign in
              </a>
            </div>
            <a
              className={`group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 
                    focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600`}
              href="/userregister"
            >
              <span>
                Get Started <span className="hidden lg:inline">Today</span>
              </span>
            </a>
            <div className="-mr-1 md:hidden">
              <div data-headlessui-state="">
                <button
                  className="relative z-10 flex h-8 w-8 items-center justify-center "
                  aria-label="Toggle Navigation"
                  type="button"
                  aria-expanded="false"
                  data-headlessui-state=""
                  id="headlessui-popover-button-:R3p6:"
                  onClick={() => {
                    if (!openMenu) setOpenMenu(true);
                  }}
                >
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    onClick={() => {
                      if (openMenu) {
                        setOpenMenu(false);
                      }
                    }}
                  >
                    {!openMenu && (
                      <path
                        d="M0 1H14M0 7H14M0 13H14"
                        className="origin-center transition"
                      ></path>
                    )}
                    <path
                      d="M2 2L12 12M12 2L2 12"
                      className="origin-center transition scale-90 opacity-0"
                    ></path>
                    {openMenu && (
                      <path
                        d="M2 2L12 12M12 2L2 12"
                        className="origin-center transition"
                      ></path>
                    )}
                  </svg>
                </button>
                {openMenu && (
                  <div>
                    <div
                      className="fixed inset-0 bg-slate-300/50 opacity-100"
                      id="headlessui-popover-overlay-:r30:"
                      aria-hidden="true"
                      data-headlessui-state="open"
                      onClick={() => {
                        if (openMenu) {
                          setOpenMenu(false);
                        }
                      }}
                    ></div>
                    <div
                      className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 opacity-100 scale-100"
                      id="headlessui-popover-panel-:r31:"
                      tabIndex="-1"
                      data-headlessui-state="open"
                      onClick={() => {
                        if (openMenu) {
                          setOpenMenu(false);
                        }
                      }}
                    >
                      <a
                        className="block w-full p-2"
                        data-headlessui-state="open"
                        href="/#features"
                      >
                        Features
                      </a>
                      <a
                        className="block w-full p-2"
                        data-headlessui-state="open"
                        href="/#faq"
                      >
                        Frequently asked questions
                      </a>
                      <a
                        className="block w-full p-2"
                        data-headlessui-state="open"
                        href="/userregister"
                      >
                        Get started
                      </a>
                      <hr className="m-2 border-slate-300/40" />
                      <a
                        className="block w-full p-2"
                        data-headlessui-state="open"
                        href="/login"
                      >
                        Sign in
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
