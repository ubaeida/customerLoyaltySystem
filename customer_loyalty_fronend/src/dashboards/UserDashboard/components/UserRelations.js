import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { TitleContext } from "../../../context/TitleContext";
import UseFetch from "../../../custom/UseFetch";
import { AlertContex } from "../../../context/AlertContext";
import PaginationBar from "../../PaginationBar/PaginationBar";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const UserActivities = () => {
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);
  const { setTitle } = useContext(TitleContext);
  const [page, setPage] = useState(1);
  const [membersRelations, setMembersRelations] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [index, setIndex] = useState();
  const [deleteRelation, setDeleteRelation] = useState(false);
  const [relationId, setRelationId] = useState();
  const getRelations = async (pangeNum) => {
    const relations = await UseFetch(
      `${process.env.REACT_APP_API_USER_MEMBERSHIPREALTION}?page=${pangeNum}`,
      "GET",
      null,
      { "Content-Type": "application/json", authorization: `Bearer ${token}` }
    );
    if (await relations.success) {
      setMembersRelations([...relations.data.rows]);
      setPageCount(relations.data.pageCount);
      toggleOn(relations.messages, relations.success);
    }
  };

  const handleDeleteRelation = async (id) => {
    const relation = await UseFetch(
      `${process.env.REACT_APP_API_USER_MEMBERSHIPREALTION_DELETE}/${relationId}`,
      "DELETE",
      null,
      { "Content-Type": "application/json", authorization: `Bearer ${token}` }
    );
    if (relation.success) {
      membersRelations.splice(index, 1);
      setMembersRelations([...membersRelations]);
      toggleOn(relation.messages, relation.success);
      setDeleteRelation(false)
    } else {
      toggleOn(relation.messages, relation.success);
    }
  };

  const handleDelelteClose = () => {
    setDeleteRelation(false);
  };

  useEffect(() => {
    setTitle("Relations");
    getRelations(page);
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    getRelations(page);
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
                          start DATE
                        </th>
                        <th className="px-4 py-1 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                          Delete Relation
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
                                <h6 className="mb-1 leading-normal text-sm capitalize">
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
                                  Current Tier:{" "}
                                  {relation.firstMember.membershipTier}
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
                                <h6 className="mb-1 leading-normal text-sm capitalize">
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
                                  Current Tier:{" "}
                                  {relation.secondMember.membershipTier}
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
                            <button
                              className="w-1/2 focus:outline-none"
                              onClick={() => {
                                setDeleteRelation(true);
                                setRelationId(relation.id);
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
          <Dialog
            open={deleteRelation}
            onClose={handleDelelteClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Are you sure you want to delete this relation?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                If you delete this relation, you will share your points with the
                other member. However, Now you can have a new relation with
                other members or add the same member again later
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button sx={{ color: "#334155" }} onClick={handleDelelteClose}>
                Disagree
              </Button>
              <Button sx={{ color: "#334155" }} onClick={handleDeleteRelation}>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default UserActivities;
