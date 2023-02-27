import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { TitleContext } from "../../../context/TitleContext";
import UseFetch from "../../../custom/UseFetch";
import { AlertContex } from "../../../context/AlertContext";
import PaginationBar from "../../PaginationBar/PaginationBar";
import AddMember from "./AddMember";

const Members = () => {
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);
  const { setTitle } = useContext(TitleContext);
  const [members, setMembers] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [addMember, setAddMember] = useState(false);
  const getMembers = async (page) => {
    const response = await UseFetch(
      `${process.env.REACT_APP_API_GET_COMPANY_MEMBERS}?page=${page}`,
      "GET",
      null,
      { "Content-Type": "Application/json", authorization: `Bearer ${token}` }
    );
    if ((await response.data.count) > 0) {
      setMembers([...response.data.members]);
      setPageCount(response.data.pageCount);
      toggleOn(response.messages, response.success);
    } else {
      toggleOn("You do not have any members yet", false);
    }
  };
  useEffect(() => {
    setTitle("Company Members");
    getMembers(page);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMembers(page);
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      <button
        onClick={() => setAddMember(true)}
        className="absolute right-20 flex-none bg-gradient-to-tl from-blue-500 to-blue-400 leading-tight text-x bold border-2 rounded-full  shadow-transparent text-white p-2 px-3 hover:bg-gradient-to-tl hover:from-blue-600 hover:to-blue-400 "
      >
        Add New Member
      </button>

      {members.length === 0 ? (
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-8 text-center mt-10">
              Your company doesn't have any members yet.
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mt-12 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6>Members Table</h6>
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="align-bottom">
                      <tr>
                        <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          MEMBER
                        </th>
                        <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          TIER
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          STANDARD POINTS
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          TIERS POINTS
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          MEMBERSHIP NUMBER
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          MEMBERSHIP DATE
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map((member, i) => (
                        <tr
                          key={i}
                          className="hover:bg-slate-50 cursor-pointer"
                        >
                          <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <div className="flex px-2 py-1">
                              <div>
                                <img
                                  src={member.User.avatar}
                                  className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl"
                                  alt="user1"
                                />
                              </div>
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-1 capitalize leading-normal text-sm">
                                  {member.User.name} {member.User.surname}
                                </h6>
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  {member.User.email}
                                </p>
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  {member.User.phone}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 align-middle text-center bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <p className="mb-0 font-semibold leading-tight text-xs">
                              {member.membershipTier}
                            </p>
                          </td>
                          <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {member.tiersPoints}
                            </span>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {member.standardPoints}
                            </span>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {member.membershipNumber}
                            </span>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {member.createdAt.substring(0, 10)}
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
      )}
      {addMember && (
        <AddMember
          addMember={addMember}
          setAddMember={setAddMember}
          setMembers={setMembers}
        />
      )}
    </>
  );
};

export default Members;
