import { useEffect } from "react";
import { useContext, useState } from "react";
import { AlertContex } from "../../../context/AlertContext";
import { AuthContext } from "../../../context/AuthContext";
import { TitleContext } from "../../../context/TitleContext";
import UseFetch from "../../../custom/UseFetch";
import PaginationBar from "../../PaginationBar/PaginationBar";

const MembersRelation = () => {
  const [membersRelations, setMembersRelation] = useState([]);
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);
  const { setTitle } = useContext(TitleContext);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const getMembersRelations = async (page) => {
    const response = await UseFetch(
      `${process.env.REACT_APP_API_GET_MEMBERSHIPRELATION}?page=${page}`,
      "GET",
      null,
      { "Content-Type": "Application/json", authorization: `Bearer ${token}` }
    );
    if ((await response.data.count) > 0) {
      setMembersRelation([...response.data.relations]);
      toggleOn(response.messages, response.success);
      setPageCount(response.data.pageCount);
    } else {
      toggleOn(
        "No members relations found ",
        response.success
      );
    }
  };

  useEffect(() => {
    setTitle("Members Relations List");
    getMembersRelations(page);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getMembersRelations(page);
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      {membersRelations.length === 0 ? (
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-8 text-center mt-10">
              No members relations found.
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6>Members Relations Table</h6>
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="align-bottom">
                      <tr>
                        <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          First member
                        </th>
                        <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Second member
                        </th>
                        <th className="px-4 py-1 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Relation Type
                        </th>
                        <th className="px-4 py-1 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Company Name
                        </th>
                        <th className="px-4 py-1 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Relation start DATE
                        </th>
                        <th className="px-4 py-1 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                           Relation status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {membersRelations.map((relation, i) => (
                        <tr
                          key={i}
                          className="hover:bg-slate-50 cursor-pointer"
                        >
                          <td className="p-1 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <div className="flex px-2 py-1">
                              <div>
                                <img
                                  src={relation.firstMember.User?.avatar}
                                  className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl"
                                  alt="user1"
                                />
                              </div>
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-1 capitalize leading-normal text-sm">
                                  {relation.firstMember.User?.name}{" "}
                                  {relation.firstMember.User?.surname}
                                </h6>
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  {relation.firstMember.User?.email}
                                </p>
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  {relation.firstMember.membershipNumber}
                                </p>{" "}
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  Current Tier: {relation.firstMember.membershipTier}
                                </p>
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  Standard Points:{" "}
                                  {relation.firstMember.standardPoints}
                                </p>
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  Teirs Points:{" "}
                                  {relation.firstMember.tiersPoints}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-1 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <div className="flex px-2 py-1">
                              <div>
                                <img
                                  src={relation.secondMember.User?.avatar}
                                  className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl"
                                  alt="user1"
                                />
                              </div>
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-1 capitalize leading-normal text-sm">
                                  {relation.secondMember.User?.name}{" "}
                                  {relation.secondMember.User?.surname}
                                </h6>
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  {relation.secondMember.User?.email}
                                </p>
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  {relation.secondMember.membershipNumber}
                                </p>{" "}
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  Current Tier: {relation.secondMember.membershipTier}
                                </p>
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  Standard Points:{" "}
                                  {relation.secondMember.standardPoints}
                                </p>
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  Teirs Points:{" "}
                                  {relation.secondMember.tiersPoints}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-1 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {relation.type}
                            </span>
                          </td>
                          <td className="p-1 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight capitalize text-xs text-slate-400">
                              {relation.Company.name}
                            </span>
                          </td>
                          <td className="p-1 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {relation.createdAt.substring(0, 10)}
                            </span>
                          </td>
                          <td className="p-1 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {relation.deletedAt == null ? (
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  Active Relation
                                </p>
                              ) : (
                                <div className="flex flex-col justify-center">
                                  <p className="mb-1 leading-tight text-xs text-slate-400">
                                    Inactive Relation
                                  </p>
                                  <p className="mb-1 leading-tight text-xs text-slate-400">
                                    deactivate date:{" "}
                                    {relation.deletedAt.substring(0, 10)}
                                  </p>
                                </div>
                              )}
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
    </>
  );
};

export default MembersRelation;
