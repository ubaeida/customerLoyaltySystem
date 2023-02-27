import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { TitleContext } from "../../../context/TitleContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import UseFetch from "../../../custom/UseFetch";
import { AlertContex } from "../../../context/AlertContext";
import DeleteIcon from "@mui/icons-material/Delete";
import PaginationBar from "../../PaginationBar/PaginationBar";
import Add from "./Add";
const List = () => {
  const { setTitle } = useContext(TitleContext);
  const [admins, setAdmins] = useState([]);
  const { token } = useContext(AuthContext);
  const [adiminId, setadiminId] = useState();
  const [deleteadmin, setDeleteadmin] = useState(false);
  const [index, setIndex] = useState();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const { toggleOn } = useContext(AlertContex);
  const [addAdmin, setAddAdmin] = useState(false);

  const getAdmins = async (page) => {
    const response = await UseFetch(
      `${process.env.REACT_APP_API_GET_ADMINS}?page=${page}`,
      "GET",
      null,
      { Authorization: `Bearer ${token}` }
    );
    if ((await response.data.admins.length) > 0) {
      setAdmins([...response.data.admins]);
      setPageCount(response.data.pageCount);
      toggleOn(response.messages, response.success);
    } else {
      toggleOn(response.messages, response.success);
    }
  };
  const handleDelelteAdminClose = () => {
    setDeleteadmin(false);
  };

  const removeAdmin = async (id) => {
    const response = await UseFetch(
      `${process.env.REACT_APP_API_GET_DELETE_ADMIN}/${adiminId} `,
      "DELETE",
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (response.success) {
      admins.splice(index, 1);
      setAdmins([...admins]);
      setDeleteadmin(false);
      toggleOn(response.messages, response.success);
    } else {
      toggleOn(response.messages, response.success);
    }
  };

  useEffect(() => {
    setTitle("Admis Lists");
    getAdmins(page);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    getAdmins(page);
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      {admins.length === 0 ? (
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <button
              onClick={() => setAddAdmin(true)}
              className="absolute right-20 flex-none bg-gradient-to-tl from-blue-500 to-blue-400 leading-tight text-x bold border-2 rounded-full  shadow-transparent text-white p-2 px-3 hover:bg-gradient-to-tl hover:from-blue-600 hover:to-blue-400 "
            >
              Add Admin
            </button>
            <div className="relative flex flex-col min-w-0 mb-8 text-center mt-10">
              Your company doesn't have any rule yet. Please press on the create
              rule to add new rules
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap -mx-3">
          <div className="flex-none w-full max-w-full px-3">
            <button
              onClick={() => setAddAdmin(true)}
              className="absolute right-20 flex-none bg-gradient-to-tl from-blue-500 to-blue-400 leading-tight text-x bold border-2 rounded-full  shadow-transparent text-white p-2 px-3 hover:bg-gradient-to-tl hover:from-blue-600 hover:to-blue-400 "
            >
              Add Admin
            </button>
            <div className="relative flex flex-col min-w-0 mt-12 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
              <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                <h6>ADMINS Table </h6>
              </div>
              <div className="flex-auto px-0 pt-0 pb-2">
                <div className="p-0 overflow-x-auto">
                  <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                    <thead className="align-bottom">
                      <tr>
                        <th className="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          ADMIN NAME
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          ADMIN EMAIL
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          CREATED ACCOUNT
                        </th>
                        <th className="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          DELETE ADMIN
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {admins?.map(
                        // eslint-disable-next-line
                        (admin, i) => {
                          if (admin.name !== "Super Admin") {
                            return (
                              <tr
                                key={i}
                                className="hover:bg-slate-50 cursor-pointer"
                              >
                                <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                  <h6 className="mb-1 leading-normal text-sm">
                                    <div>{admin?.name}</div>
                                  </h6>
                                </td>
                                <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                  <span className="font-semibold leading-tight text-xs text-slate-400">
                                    <div>{admin?.email}</div>
                                  </span>
                                </td>
                                <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                  <span className="font-semibold leading-tight text-xs text-slate-400">
                                    <div>
                                      {admin?.createdAt.substring(0, 10)}
                                    </div>
                                  </span>
                                </td>
                                <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                  <button
                                    className="w-1/2 focus:outline-none"
                                    onClick={() => {
                                      setadiminId(admin.id);
                                      setDeleteadmin(true);
                                      setIndex(i);
                                    }}
                                  >
                                    <DeleteIcon
                                      sx={{
                                        color: "#f87171",
                                        "&:hover": { color: "#dc2626" },
                                      }}
                                    />
                                  </button>
                                </td>
                              </tr>
                            );
                          }
                        }
                      )}
                    </tbody>
                  </table>
                  <div className="flex w-full flex-row justify-center mt-5 mb-2">
                    <PaginationBar pageCount={pageCount} setPage={setPage} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Dialog
            open={deleteadmin}
            onClose={handleDelelteAdminClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete this Admin?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                If you delete this admin, this admin will not be able to use his
                account any more.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{ color: "#334155" }}
                onClick={handleDelelteAdminClose}
              >
                Disagree
              </Button>
              <Button sx={{ color: "#334155" }} onClick={removeAdmin}>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          <Add
            addAdmin={addAdmin}
            setAddAdmin={setAddAdmin}
            setAdmins={setAdmins}
          />
        </div>
      )}
    </>
  );
};

export default List;
