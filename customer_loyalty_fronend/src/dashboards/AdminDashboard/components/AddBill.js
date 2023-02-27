import React from "react";
import { useContext, useEffect, useRef } from "react";
import { TitleContext } from "../../../context/TitleContext";
import { AuthContext } from "../../../context/AuthContext";
import UseFetch from "../../../custom/UseFetch";
import { AlertContex } from "../../../context/AlertContext";
function AddBill() {
  const { setTitle } = useContext(TitleContext);
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);

  const billNumberRef = useRef();
  const billReferenceRef = useRef();
  const companyNameRef = useRef();
  const phoneRef = useRef();

  const addBill = async (e) => {
    const response = await UseFetch(
      process.env.REACT_APP_API_ADD_BILL,
      "POST",
      {
        billNumber: billNumberRef.current.value,
        billReference: billReferenceRef.current.value,
        companyName: companyNameRef.current.value,
        phone: phoneRef.current.value,
      },
      { "Content-Type": "Application/json", authorization: `Bearer ${token}` }
    );
    if (response.success) {
      toggleOn(response.messages, response.success);
      billNumberRef.current.value = "";
      billReferenceRef.current.value = "";
      companyNameRef.current.value = "";
      phoneRef.current.value = "";
    } else {
      if (response.messages === "") {
        toggleOn("Something went wrong, Please try again!", response.success);
      } else {
        toggleOn(response.messages, response.success);
      }
    }
  };

  useEffect(() => {
    setTitle("Add New Bill ");
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className="w-full flex-wrap -mx-3">
        <div className=" w-full grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2  gap-4 md:gap-6 xl:gap-6">
          <div className="relative flex flex-col w-full items-center shadow-soft-xl rounded-2xl bg-clip-border bg-white">
            <div className="font-bold text-slate-700 mt-2 text-lg capitalize">
              Add Bill
            </div>
            <div className="mt-7 w-1/2 flex flex-col items-center">
              <label
                htmlFor="bill"
                className="mb-3 text-sm text-center font-medium text-gray-700"
              >
                Bill Number
              </label>
              <input
                id="bill"
                type="text"
                name="bill"
                required=""
                ref={billNumberRef}
                placeholder="Bill Number"
                className="block w-full appearance-none rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="mt-7 w-1/2 flex flex-col items-center">
              <label
                htmlFor="Reference"
                className="mb-3 text-sm text-center font-medium text-gray-700"
              >
                Bill Reference
              </label>
              <input
                id="Reference"
                type="text"
                name="Reference"
                required=""
                ref={billReferenceRef}
                placeholder="Bill Reference"
                className="block w-full appearance-none rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <div className="mt-7 w-1/2 flex flex-col items-center">
              <label
                htmlFor="name"
                className="mb-3 text-sm text-center font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required=""
                ref={companyNameRef}
                placeholder="Company Name"
                className="block w-full appearance-none rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="mt-7 w-1/2 flex flex-col items-center">
              <label
                htmlFor="phone"
                className="mb-3 text-sm text-center font-medium text-gray-700"
              >
                Phone number
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                required=""
                ref={phoneRef}
                placeholder="Phone"
                className="block w-full appearance-none rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <button
              className={` my-5 mt-10 w-1/3 bg-gradient-to-tl from-blue-500 to-blue-400 leading-tight text-x 
              bold border-2 rounded-full  shadow-transparent text-white p-2 px-3 hover:bg-gradient-to-tl 
              hover:from-blue-600 hover:to-blue-400`}
              onClick={addBill}
            >
              Add New Bill
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddBill;
