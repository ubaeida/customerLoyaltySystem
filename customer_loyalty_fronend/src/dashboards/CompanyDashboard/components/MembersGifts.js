import { useContext, useEffect, useRef } from "react";
import { AlertContex } from "../../../context/AlertContext";
import { AuthContext } from "../../../context/AuthContext";
import { TitleContext } from "../../../context/TitleContext";
import UseFetch from "../../../custom/UseFetch";

const MembersGifts = () => {
  const { setTitle } = useContext(TitleContext);
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);

  const redemptionPhonesRef = useRef();
  const giftPhonesRef = useRef();
  const giftPointsRef = useRef();
  const giftPointsTypeRef = useRef();

  useEffect(() => {
    setTitle("Gifts & Redemption");
    // eslint-disable-next-line
  }, []);

  const exchangePoints = async () => {
    const response = await UseFetch(
      process.env.REACT_APP_API_COMPANY_EXCHANGE,
      "POST",
      { phone: redemptionPhonesRef.current.value },
      { "content-Type": "application/json", authorization: `Bearer ${token}` }
    );
    if (response.success) {
      toggleOn(response.messages, response.success);
      redemptionPhonesRef.current.value = "";
    } else {
      toggleOn(response.messages, response.success);
    }
  };

  const companyGift = async () => {
    const response = await UseFetch(
      process.env.REACT_APP_API_COMPANY_GIFT,
      "POST",
      {
        phone: giftPhonesRef.current.value,
        points: giftPointsRef.current.value,
        tier: giftPointsTypeRef.current.value,
      },
      { "content-Type": "application/json", authorization: `Bearer ${token}` }
    );
    if (response.success) {
      toggleOn(response.messages, response.success);
      giftPhonesRef.current.value = "";
      giftPointsRef.current.value = "";
    } else {
      toggleOn(response.messages, response.success);
    }
  };
  return (
    <>
      <div className="w-full flex-wrap -mx-3">
        <div className=" w-full grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6 xl:gap-6">
          <div className="relative flex flex-col w-full items-center shadow-soft-xl rounded-2xl bg-clip-border bg-white">
            <div className="font-bold text-slate-700 mt-2 text-lg capitalize">
              Redemption <span className="text-sm">( exchange points )</span>
            </div>
            <div className="mt-10 w-1/2 flex flex-col items-center">
              <label
                htmlFor="phone"
                className="mb-3 text-sm text-center font-medium text-gray-700"
              >
                Member Phone number
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                required=""
                ref={redemptionPhonesRef}
                placeholder="Phone"
                className="block w-full appearance-none rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>
            <button
              className={` my-5 w-1/2 bg-gradient-to-tl from-blue-500 to-blue-400 leading-tight text-x 
              bold border-2 rounded-full  shadow-transparent text-white p-2 px-3 hover:bg-gradient-to-tl 
              hover:from-blue-600 hover:to-blue-400`}
              onClick={exchangePoints}
            >
              Exchange Points
            </button>
          </div>

          <div className="relative flex flex-col w-full items-center shadow-soft-xl rounded-2xl bg-clip-border  bg-white ">
            <div className="font-bold text-slate-700 text-lg mt-2 capitalize">
              Gifts{" "}
              <span className="text-sm">( send gift for your members )</span>
            </div>
            <div className="mt-10 w-1/2 flex flex-col items-center">
              <label
                htmlFor="phoneGift"
                className="mb-3 text-sm text-center font-medium text-gray-700"
              >
                Member Phone number
              </label>
              <input
                id="phoneGift"
                type="text"
                name="phone"
                required=""
                ref={giftPhonesRef}
                placeholder="Phone"
                className="block w-full appearance-none rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
              <label
                htmlFor="points"
                className="mb-3 text-sm text-center mt-5 font-medium text-gray-700"
              >
                Points
              </label>
              <input
                id="points"
                type="number"
                name="points"
                placeholder="points"
                ref={giftPointsRef}
                className="block w-full appearance-none rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
              <label
                htmlFor="pointsType"
                className=" text-sm text-center mt-5 font-medium text-gray-700"
              >
                Points Type
              </label>
              <select
                id="pointsType"
                ref={giftPointsTypeRef}
                className={`w-full mt-5 inline-block appearance-none rounded-md border ml-2
              border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 
              focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm`}
              >
                <option>Standard points</option>
                <option>Tiers points</option>
              </select>
              <button
                className={` my-5 w-full bg-gradient-to-tl from-blue-500 to-blue-400 leading-tight text-x 
              bold border-2 rounded-full  shadow-transparent text-white p-2 px-3 hover:bg-gradient-to-tl 
              hover:from-blue-600 hover:to-blue-400`}
                onClick={companyGift}
              >
                Send Gift
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MembersGifts;
