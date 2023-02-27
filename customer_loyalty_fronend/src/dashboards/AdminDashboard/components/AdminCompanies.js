import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { TitleContext } from "../../../context/TitleContext";
import UseFetch from "../../../custom/UseFetch";
import { AlertContex } from "../../../context/AlertContext";
import PaginationBar from "../../PaginationBar/PaginationBar";

const AdminCompanies = () => {
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);
  const { setTitle } = useContext(TitleContext);
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const getCompanies = async (page) => {
    const response = await UseFetch(
      `${process.env.REACT_APP_API_GET_ADMIN_COMPANIES}?page=${page}`,
      "GET",
      null,
      { "Content-Type": "Application/json", authorization: `Bearer ${token}` }
    );
    if (await response.success) {
      setCompanies([...response.data.rows]);
      setPageCount(response.data.pageCount);
      toggleOn(response.messages, response.success);
    } else {
      toggleOn(response.messages, false);
    }
  };
  useEffect(() => {
    setTitle("Companies List");
    getCompanies(page);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getCompanies(page);
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      {companies.length === 0 ? (
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-8 text-center mt-10">
              No users found
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6>Companies Table</h6>
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="align-bottom">
                      <tr>
                        <th className="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                        Company
                        </th>
                        <th className="px-6 py-3  font-bold  uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          phone
                        </th>
                        <th className="px-6 py-3 pl-2 font-bold  uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          address
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          website
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Account start DATE
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Account status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {companies?.map((company, i) => (
                        <tr
                          key={i}
                          className="hover:bg-slate-50 cursor-pointer"
                        >
                          <td className="p-2 align-middle bg-transparent capitalize border-b whitespace-nowrap shadow-transparent">
                            <div className="flex px-2 py-1">
                              <div>
                                <img
                                  src={company.logo}
                                  className="inline-flex items-center justify-center mr-4 text-white transition-all duration-200 ease-soft-in-out text-sm h-9 w-9 rounded-xl"
                                  alt="user1"
                                />
                              </div>
                              <div className="flex flex-col justify-center">
                                <h6 className="mb-1 leading-normal text-sm">
                                 {company.name}
                                </h6>
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  {company.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-2 align-middle text-center bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <p className="mb-0 font-semibold leading-tight text-xs">
                              {company.phone}
                            </p>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {company.address}
                            </span>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {company.website}
                            </span>
                          </td>

                          <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {company.createdAt.substring(0, 10)}
                            </span>
                          </td>
                          <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                            <span className="font-semibold leading-tight text-xs text-slate-400">
                              {company.deletedAt == null ? (
                                <p className="mb-1 leading-tight text-xs text-slate-400">
                                  Active company
                                </p>
                              ) : (
                                <div className="flex flex-col justify-center">
                                  <p className="mb-1 leading-tight text-xs text-slate-400">
                                    Inactive company
                                  </p>
                                  <p className="mb-1 leading-tight text-xs text-slate-400">
                                    deactivate date:{" "}
                                    {company.deletedAt.substring(0, 10)}
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

export default AdminCompanies;
