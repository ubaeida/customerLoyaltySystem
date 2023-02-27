import React from "react";

const Footer = () => {
  return (
    <div className="mt-10">
      <footer className="pt-4 self-end m-0 mt-auto sticky">
        <div className="w-full px-6 mx-auto">
          <div className="flex flex-wrap  justify-center -mx-3 ">
            <div className="w-full max-w-full px-3 mt-0  shrink-0 lg:mb-0 lg:w-1/2 ">
              <div className="leading-normal text-center text-sm text-slate-500">
                © {new Date().getFullYear() + ", "}
                made by
                <a
                  href="http://localhost:3004"
                  className="font-semibold text-slate-700"
                >
                  {" Bountiful"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
