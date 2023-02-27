import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { TitleContext } from "../../../context/TitleContext";
import UseFetch from "../../../custom/UseFetch";
import { AlertContex } from "../../../context/AlertContext";
import PaginationBar from "../../PaginationBar/PaginationBar";

const UserActivities = () => {
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);
  const { setTitle } = useContext(TitleContext);
  const [page, setPage] = useState(1);
  const [activities, setActivities] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const getActivity = async (pangeNum) => {
    const activities = await UseFetch(
      `${process.env.REACT_APP_API_GET_USER_ACTIVITIES}?page=${pangeNum}`,
      "GET",
      null,
      { "Content-Type": "application/json", authorization: `Bearer ${token}` }
    );
    if (await activities.success) {
      setActivities([...activities.data.rows]);
      setPageCount(activities.data.pageCount);
      toggleOn(activities.messages, activities.success);
    }
  };
  useEffect(() => {
    setTitle("Activities");
    getActivity(page);
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      {activities.length === 0 ? (
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-8 text-center mt-10">
              You do not have any activites yet.
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6>Activities table</h6>
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto lg:overflow-x-hidden">
                  <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="align-bottom">
                      <tr>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          COMPANY NAME
                        </th>
                        <th className="px-6 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          TYPE
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          MEMBERSHIP NUMBER
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          STANDARD POINTS
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          TIERS POINTS
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
                        <tr
                          key={i}
                          className="hover:bg-slate-50 cursor-pointer"
                        >
                          <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs capitalize text-slate-400">
                              {activity?.Membership?.Company?.name}
                            </span>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <p className="mb-0 font-semibold leading-tight text-xs">
                              {activity?.type}
                            </p>
                          </td>
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <p className="mb-0 font-semibold leading-tight text-xs">
                              {activity.Membership.membershipNumber}
                            </p>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {activity.standardPoints}
                            </span>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {activity.tiersPoints}
                            </span>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {activity?.Bill?.billNumber == null
                                ? "-"
                                : activity.Bill.billNumber}
                            </span>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {activity?.updatedAt?.substring(0, 10)}
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
        </div>
      )}{" "}
    </>
  );
};

export default UserActivities;
