import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import UseFetch from "../../../custom/UseFetch";
import { AlertContex } from "../../../context/AlertContext";
import { AuthContext } from "../../../context/AuthContext";

export const Activities = ({ company, openActivities, setOpenActivities }) => {
  const [activites, setActivities] = useState([]);
  const { token } = useContext(AuthContext);
  const { toggleOn } = useContext(AlertContex);
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  const getActivities = async (pageNum) => {
    const response = await UseFetch(
      `${process.env.REACT_APP_API_GET_ACTIVITIES}?companyId=${company.id}`,
      "GET",
      null,
      { "Content-Type": "Application/json", authorization: `Bearer ${token}` }
    );
    if (await response.success) {
      setActivities([...response.data.rows]);
  } else toggleOn(response.messages, response.success);
  };

  useEffect(() => {
    getActivities();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {activites.length > 0 ? (
        <BootstrapDialog
          sx={{
            padding: "20px",
          }}
          onClose={() => setOpenActivities(false)}
          aria-labelledby="customized-dialog-title"
          open={openActivities}
        >
          <DialogContent
            sx={{
              padding: "20px",
              overflowX: "hidden",
            }}
            dividers
          >
            <div className="flex flex-wrap -mx-3 overflow-x-hidden ">
              <div className="flex-none w-full max-w-full px-3">
                <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
                  <h6>Latest activities</h6>
                </div>
                <div className="flex-auto px-0 pt-0 pb-2">
                  <div className="p-0 overflow-x-hidden lg:overflow-x-hidden">
                    <table className="items-center overflow-x-hidden w-full mb-0 align-top border-gray-200 text-slate-500">
                      <thead className="align-bottom">
                        <tr>
                          <th className="px-4 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                            type
                          </th>
                          <th className="px-4 py-3 pl-2 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                            standard Points
                          </th>
                          <th className="px-4 py-3  font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">
                            tiers Points
                          </th>
                          <th className="px-4 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {activites?.map((activity, i) => (
                          <tr key={i}>
                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                              <div className="flex px-2 py-1">
                                <div className="flex flex-col justify-center">
                                  <h6 className="mb-0 text-center leading-normal text-sm">
                                    {activity?.type}
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                              <p className="mb-0 font-semibold text-center leading-tight text-xs">
                                {activity?.standardPoints}
                              </p>
                            </td>
                            <td className="p-2 leading-normal text-center align-middle bg-transparent border-b text-sm whitespace-nowrap shadow-transparent">
                              {activity?.tiersPoints}
                            </td>
                            <td className="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent"></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
          <DialogActions
            sx={{
              margin: "0px",
            }}
          >
            <Button
                sx={{ color: "#334155" }}
                onClick={() => setOpenActivities(false)}
              >
                close
              </Button>
          </DialogActions>
        </BootstrapDialog>
      ) : (
        ""
      )}
    </>
  );
};
