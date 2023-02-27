import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { TitleContext } from "../../../context/TitleContext";
import UseFetch from "../../../custom/UseFetch";
import PaginationBar from "../../PaginationBar/PaginationBar";
import { AlertContex } from "../../../context/AlertContext";

const Activitiy = () => {
  const { toggleOn } = useContext(AlertContex);
  const { setTitle } = useContext(TitleContext);
  const [activities, setActivities] = useState([]);
  const { token } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const getActivities = async (pangeNum) => {
    const response = await UseFetch(
      `${process.env.REACT_APP_API_GET_USER_ACTIVITIES}?page=${pangeNum}`,
      "GET",
      null,
      { "content-Type": "application/json", authorization: `Bearer ${token}` }
    );

    if (await response.success) {
      setActivities([...response.data.rows]);
      setPageCount(response.data.pageCount);
      toggleOn(response.messages, response.success);
    }
  };
  useEffect(() => {
    setTitle("Activities List");
    getActivities(page);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getActivities(page);
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
    {activities.length > 0 ?<div className="flex flex-wrap -mx-3">
      <div className="flex-none w-full max-w-full px-3">
        <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
          <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <h6>Admins table</h6>
          </div>
          <div className="flex-auto px-0 pt-0 pb-2">
            <div className="p-0 overflow-x-auto">
              <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                <thead className="align-bottom">
                  <tr>
                    <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      Type
                    </th>
                    <th className="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      MEMNERSHIP NUMBER
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      STANDARD POINTS
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      TIERS POINTS
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      company name
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      BILL NUMBER
                    </th>
                    <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                      ACTIVITY DATE
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {activities?.map((activity, i) => (
                    <tr key={i} className="hover:bg-slate-50 cursor-pointer">
                      <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        <p className="mb-0 font-semibold leading-tight text-xs">
                          {activity?.type}
                        </p>
                      </td>
                      <td className="p-2 text-center bg-transparent border-b whitespace-nowrap shadow-transparent">
                        <p className="mb-0 font-semibold leading-tight text-xs">
                          {activity?.Membership?.membershipNumber}
                        </p>
                      </td>
                      <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                        <span className="font-semibold leading-tight text-xs text-slate-400">
                          {activity?.standardPoints}
                        </span>
                      </td>
                      <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        <span className="font-semibold leading-tight text-xs text-slate-400">
                          {activity?.tiersPoints}
                        </span>
                      </td>
                      <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        <span className="font-semibold leading-tight capitalize text-xs text-slate-400">
                          {activity?.Membership?.Company?.name}
                        </span>
                      </td>
                      <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        <span className="font-semibold leading-tight text-xs text-slate-400">
                          {activity?.Bill?.billNumber == null
                            ? "-"
                            : activity?.Bill?.billNumber}
                        </span>
                      </td>
                      <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                        <span className="font-semibold leading-tight text-xs text-slate-400">
                          {activity.createdAt.substring(0, 10)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex w-full flex-row justify-center mt-5 mb-2">
                <PaginationBar pageCount={pageCount} setPage={setPage} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>:<div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-8 text-center mt-10">
            there is no activities yet
            </div>
          </div>
        </div>}
    </>

  );
};

export default Activitiy;
